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

Regenerate after editing any course.
