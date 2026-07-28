#!/usr/bin/env python3
"""Regenerate the per-course preamble extracts the book needs.

Each course is a standalone document that defines its own macros, TikZ styles
and colours in its preamble. docmute strips preambles when the body is \\input,
so we lift those definitions out here and re-apply them scoped to the chapter.
Document setup (\\documentclass, \\usepackage, title block) is dropped, since
the book supplies its own.
"""
import re, glob, os

DROP = re.compile(r'\\(documentclass|usepackage|title|author|date|allowdisplaybreaks)\b')

def preamble_of(path):
    src = open(path).read()
    return src.split(r'\begin{document}')[0]

def strip_setup(text):
    """Remove \\documentclass/\\usepackage/title-block declarations, including
    multi-line optional-argument forms, and comments."""
    out, i, n = [], 0, len(text)
    while i < n:
        m = DROP.search(text, i)
        if not m:
            out.append(text[i:]); break
        out.append(text[i:m.start()])
        j = m.end()
        while j < n:                      # consume all [..] and {..} arguments
            while j < n and text[j] in ' \t\n': j += 1
            if j >= n or text[j] not in '[{': break
            close, depth = (']' if text[j] == '[' else '}'), 0
            opening = text[j]
            while j < n:
                if text[j] == opening: depth += 1
                elif text[j] == close:
                    depth -= 1
                    if depth == 0: j += 1; break
                j += 1
        i = j
    text = ''.join(out)
    return '\n'.join(l for l in text.split('\n') if not l.lstrip().startswith('%'))

def body_of(path):
    """The document body, with the per-course title block and TOC removed."""
    src = open(path).read()
    body = src.split(r'\begin{document}', 1)[1]
    body = body.rsplit(r'\end{document}', 1)[0]
    for cmd in (r'\maketitle', r'\tableofcontents'):
        body = body.replace(cmd, '')
    return body

theorems, tikzlibs = set(), set()
for d in ('preambles', 'bodies'):
    os.makedirs(d, exist_ok=True)
    for f in glob.glob(d + '/*.tex'): os.remove(f)

for t in sorted(glob.glob('../part-*/*/*.tex')):
    course = os.path.basename(os.path.dirname(t))
    part = os.path.basename(os.path.dirname(os.path.dirname(t)))
    body = strip_setup(preamble_of(t))

    # theorem environments declare counters -> must be global
    for m in re.findall(r'\\(?:declaretheorem|newtheorem)\b[^\n]*', body):
        theorems.add(m)
    body = re.sub(r'\\(?:declaretheorem|newtheorem)\b[^\n]*', '', body)
    # tikz libraries must be loaded in the preamble
    for m in re.findall(r'\\usetikzlibrary\{[^}]*\}', body):
        tikzlibs.add(m)
    body = re.sub(r'\\usetikzlibrary\{[^}]*\}', '', body)
    # \DeclareMathOperator is preamble-only; \operatorname works anywhere
    body = re.sub(r'\\DeclareMathOperator\*\s*\{\\([a-zA-Z@]+)\}\s*\{([^}]*)\}',
                  r'\\newcommand{\\\1}{\\operatorname*{\2}}', body)
    body = re.sub(r'\\DeclareMathOperator\s*\{\\([a-zA-Z@]+)\}\s*\{([^}]*)\}',
                  r'\\newcommand{\\\1}{\\operatorname{\2}}', body)

    # let a course redefine a name another course also defines (scoped per chapter)
    names = sorted(set(re.findall(r'\\(?:newcommand|providecommand|def)\s*\{?\\([a-zA-Z@]+)', body)))
    header = ''.join('\\expandafter\\let\\csname %s\\endcsname\\undefined\n' % n for n in names)
    open('preambles/%s-%s.tex' % (part, course), 'w').write(header + body.strip() + '\n')
    open('bodies/%s-%s.tex' % (part, course), 'w').write(body_of(t))

open('global-theorems.tex','w').write('\n'.join(sorted(theorems)) + '\n')
open('global-tikzlibs.tex','w').write('\n'.join(sorted(tikzlibs)) + '\n')
print("preambles: %d, bodies: %d, theorem decls: %d, tikz libs: %d"
      % (len(glob.glob('preambles/*.tex')), len(glob.glob('bodies/*.tex')),
         len(theorems), len(tikzlibs)))
