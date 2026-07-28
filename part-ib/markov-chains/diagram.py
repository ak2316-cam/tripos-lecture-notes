"""
Python script to translate a LaTeX Markov matrix to its LaTeX graph using TikZ
"""

import os
import sys
import copy
import argparse
from subprocess import run
import numpy as np


TEST_STR = """0&1&0\\0&1/3&2/3\\1/2&1/2&0"""


def get_matrix(string):
    """Parse a LaTeX matrix source code and return an array of chars

    Lines are separated by '\\'
    Columns are separated by '&'
    Values are probabilities written as a fraction 'a/b' or 1 or 0
    """
    print("Parsing string: %s" % string)
    tmp = copy.copy(string).replace("\n", "", 10)
    lines = [s.strip() for s in tmp.strip().split('\\\\')]
    vals = [l.split('&') for l in lines]
    for i in range(len(vals)):
        for j in range(len(vals[i])):
            vals[i][j] = vals[i][j].strip()
    print("Parsed matrix:")
    print(np.array(vals))
    return vals


def header():
    """Return a standard string to put in the produced file
    Currently unused
    """
    return """%Graphe généré automatiquement par le script Python \
disponible sur (http://github.com/Jegeda)\n"""


def nodes(mat):
    """Return the node declarations
    There are as many nodes as the dimension of the matrix
    """
    # First node
    node = ['\\node[state] (1) {1};']
    # All other nodes are placed to the right of the last one
    node.extend(['\\node[state, right=of %d] (%d) {%d};' % (i, i+1, i+1)
                 for i in range(1, len(mat))])
    print("Created %d nodes" % len(mat))
    return "\n".join(node)


def edges(mat):
    """Return the edges declaration between the nodes whose value
    in the matrix is not 0
    """
    num = 0
    # Global declaration for arrows
    edge = ["\\draw[every loop, >=latex]"]
    for i in range(len(mat)):
        for j in range(len(mat[i])):
            if mat[i][j] != '0':
                num += 1
                if i == j:
                    # Loop on itself
                    edge.append("(%d) edge[loop above] node {%s} (%d)"
                                % (i+1, mat[i][i], i+1))
                else:
                    edge.append("(%d) edge[bend left, auto=left] node {%s} (%d)"
                                % (i+1, mat[i][j], j+1))
    print("Created %d edges" % num)
    return "\n".join(edge) + ";"


def complete(mat):
    """Given the Markov chain matrix,
    return the string to write to the final file
    """
    res = """%s\n
\\begin{center}
\\begin{tikzpicture}\n
%s\n
%s\n
\\end{tikzpicture}
\\end{center}\n""" % (header(), nodes(mat), edges(mat))
    print("Created LaTeX code")
    return res


def test(full_code):
    """Return the string to write to .tex file for testing"""
    res = """\\documentclass{article}\n
\\usepackage{tikz}
\\usetikzlibrary{automata, positioning}
\\begin{document}\n
%s\n
\\end{document}\n""" % full_code
    print("Created code for display")
    return res


def get_matrix_from_input():
    """If a file is given containing the matrix, parse it.
    Else, use the test matrix
    """
    parser = argparse.ArgumentParser("""
Create a LaTeX graph from a Markov chain matrix""")
    parser.add_argument('file', help="""
*.txt file containing the input matrix written in LaTeX format""", type=str)
    args = parser.parse_args()
    if args.file:
        if args.file in os.listdir():
            print("Reading matrix from %s" % args.file)
            text = open(args.file, 'r')
            mat = get_matrix(text.read())
            text.close()
        else:
            print("Couldn't find file '%s' in directory '%s'" %
                  (args.file, os.path.abspath('.')), file=sys.stderr)
            print("Exiting.")
            exit(0)
    else:
        mat = get_matrix(TEST_STR)
    return mat


def run_commands(test_code):
    """Function to run the command line commands
    """
    print("Writing output code to 'output.tex'")
    f = open("output.tex", 'w')
    f.write(test_code)
    f.close()
    print("Compiling the 'output.tex' file with pdflatex")
    run(['pdflatex', '-interaction=batchmode', 'output.tex'])
    print("Removing unnecessary files")
    run(['rm', 'output.aux', 'output.log'])
    print("Showing output pdf")
    run(['evince', 'output.pdf'])


MAT = get_matrix_from_input()
COMP = complete(MAT)
TEST = test(COMP)
run_commands(TEST)