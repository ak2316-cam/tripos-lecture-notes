# Mathematical Tripos Lecture Notes

> My collection of lecture notes and handouts from the Cambridge Mathematical Tripos.

Notes are organised by part, one directory per course:

```
part-ia/  part-ib/  part-ii/  part-iii/   lecture notes, one folder per course
handouts/                                 standalone handouts and talks
styles/                                   shared LaTeX style files
unfinished/                               drafts not yet ready (not published)
```

## Compiling

You will need my LaTeX style files from [here](https://github.com/ak2316-cam/latex-templates),
either installed or placed alongside the `.tex` file you want to compile. A couple of courses
also use `quiver.sty`, which lives in `styles/`. The simplest approach is to point `TEXINPUTS`
at both:

```sh
cd part-ii/algebraic-topology
TEXINPUTS=/path/to/latex-templates:/path/to/this-repo/styles: pdflatex algebraic-topology.tex
```

## Part IA

| Course | Pages |
| --- | --- |
| [Analysis I](part-ia/analysis-i/analysis-i.pdf) | 62 |
| [Differential Equations](part-ia/differential-equations/differential-equations.pdf) | 59 |
| [Dynamics and Relativity](part-ia/dynamics-and-relativity/dynamics-and-relativity.pdf) | 62 |
| [Groups](part-ia/groups/groups.pdf) | 60 |
| [Numbers and Sets](part-ia/numbers-and-sets/numbers-and-sets.pdf) | 46 |
| [Probability](part-ia/probability/probability.pdf) | 58 |
| [Vector Calculus](part-ia/vector-calculus/vector-calculus.pdf) | 65 |
| [Vectors and Matrices](part-ia/vectors-and-matrices/vectors-and-matrices.pdf) | 75 |

## Part IB

| Course | Pages |
| --- | --- |
| [Analysis and Topology](part-ib/analysis-and-topology/analysis-and-topology.pdf) | 69 |
| [Complex Analysis](part-ib/complex-analysis/complex-analysis.pdf) | 56 |
| [Complex Methods](part-ib/complex-methods/complex-methods.pdf) | 56 |
| [Electromagnetism](part-ib/electromagnetism/electromagnetism.pdf) | 54 |
| [Fluid Dynamics](part-ib/fluid-dynamics/fluid-dynamics.pdf) | 55 |
| [Geometry](part-ib/geometry/geometry.pdf) | 63 |
| [Groups, Rings and Modules](part-ib/groups-rings-and-modules/groups-rings-and-modules.pdf) | 63 |
| [Linear Algebra](part-ib/linear-algebra/linear-algebra.pdf) | 64 |
| [Markov Chains](part-ib/markov-chains/markov-chains.pdf) | 54 |
| [Methods](part-ib/methods/methods.pdf) | 57 |
| [Numerical Analysis](part-ib/numerical-analysis/numerical-analysis.pdf) | 55 |
| [Optimisation](part-ib/optimisation/optimisation.pdf) | 54 |
| [Quantum Mechanics](part-ib/quantum-mechanics/quantum-mechanics.pdf) | 54 |
| [Statistics](part-ib/statistics/statistics.pdf) | 57 |
| [Variational Principles](part-ib/variational-principles/variational-principles.pdf) | 55 |

## Part II

| Course | Pages |
| --- | --- |
| [Algebraic Geometry](part-ii/algebraic-geometry/algebraic-geometry.pdf) | 75 |
| [Algebraic Topology](part-ii/algebraic-topology/algebraic-topology.pdf) | 68 |
| [Analysis of Functions](part-ii/analysis-of-functions/analysis-of-functions.pdf) | 74 |
| [Automata and Formal Languages](part-ii/automata-and-formal-languages/automata-and-formal-languages.pdf) | 70 |
| [Coding and Cryptography](part-ii/coding-and-cryptography/coding-and-cryptography.pdf) | 73 |
| [Differential Geometry](part-ii/differential-geometry/differential-geometry.pdf) | 76 |
| [Galois Theory](part-ii/galois-theory/galois-theory.pdf) | 67 |
| [Graph Theory](part-ii/graph-theory/graph-theory.pdf) | 56 |
| [Integrable Systems](part-ii/integrable-systems/integrable-systems.pdf) | 76 |
| [Linear Analysis](part-ii/linear-analysis/linear-analysis.pdf) | 64 |
| [Logic and Set Theory](part-ii/logic-and-set-theory/logic-and-set-theory.pdf) | 60 |
| [Number Fields](part-ii/number-fields/number-fields.pdf) | 67 |
| [Number Theory](part-ii/number-theory/number-theory.pdf) | 57 |
| [Principles of Quantum Mechanics](part-ii/principles-of-quantum-mechanics/principles-of-quantum-mechanics.pdf) | 59 |
| [Probability and Measure](part-ii/probability-and-measure/probability-and-measure.pdf) | 65 |
| [Quantum Information and Computation](part-ii/quantum-information-and-computation/quantum-information-and-computation.pdf) | 71 |
| [Representation Theory](part-ii/representation-theory/representation-theory.pdf) | 69 |
| [Riemann Surfaces](part-ii/riemann-surfaces/riemann-surfaces.pdf) | 67 |
| [Statistical Physics](part-ii/statistical-physics/statistical-physics.pdf) | 59 |
| [Stochastic Financial Models](part-ii/stochastic-financial-models/stochastic-financial-models.pdf) | 67 |
| [Topics in Analysis](part-ii/topics-in-analysis/topics-in-analysis.pdf) | 67 |

## Part III

Only fragments so far.

| Course | Pages |
| --- | --- |
| [Combinatorics](part-iii/combinatorics/combinatorics.pdf) | 5 |
| [Topics in Combinatorics](part-iii/topics-in-combinatorics/topics-in-combinatorics.pdf) | 1 |
