#!/bin/bash
# Emits the \chapter block for every course, in tripos order.
# Each chapter is wrapped in a group so course-local macros stay local, and
# \graphicspath is pointed at the course directory so its images still resolve.
cd "$(dirname "$0")"
for part in ia ib ii; do
  case $part in ia) name="Part IA";; ib) name="Part IB";; ii) name="Part II";; esac
  echo "\\part{$name}"
  echo "\\input{parts/$part-intro.tex}"
  for d in ../part-$part/*/; do
    c=$(basename "$d"); t=$(ls $d*.tex | head -1)
    ttl=$(grep -m1 '^\\title{' "$t" | sed 's/\\title{//;s/}.*//')
    echo "\\chapter{${ttl:-$c}}"
    echo "\\begingroup"
    echo "\\graphicspath{{$d}}"
    echo "\\input{preambles/part-$part-$c.tex}"
    echo "\\input{bodies/part-$part-$c.tex}"
    echo "\\endgroup"
  done
  echo
done
