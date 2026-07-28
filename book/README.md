# The book build

Assembles every course in this repository into a single volume.

    python3 build.py          # regenerate preambles/ and bodies/ from the courses
    ./gen-chapters.sh > chapters.tex
    TEXINPUTS=/path/to/latex-templates:../styles: pdflatex main.tex

`build.py` splits each course document in two: `preambles/` holds the macros,
TikZ styles and colours it defines, and `bodies/` holds its text with the title
block and table of contents removed. Each chapter then re-applies its own
preamble inside a group, so course-local macros stay local and two courses may
define the same name differently.

`main.tex` loads the union of the packages the courses ask for, and one of them
-- `physics` -- takes over names the other courses use with their ordinary
meanings (`\abs`, `\norm`, `\dd`, `\tr`, `\var`, `\div`, the trig operators).
`physics-compat.tex` keeps both sets of meanings; `build.py` marks the preamble
of each course that asked for the package with `\physicsmacros`, so the choice
is made per chapter.

Labels must be unique across the whole book, so a label two courses both want
is prefixed with a short course tag (`nf-thm:minkowski`) in the course source.

Regenerate after editing any course.
