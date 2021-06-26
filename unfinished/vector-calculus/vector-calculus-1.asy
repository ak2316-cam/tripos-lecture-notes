if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="vector-calculus-1";
if(settings.render < 0) settings.render=4;
settings.outformat="";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

unitsize(55);
import graph;
pair F(real t) {
return (t^3, t^2);
}

path g = graph(F, -1.1, 1.1);

draw(g, blue + linewidth(0.9pt));

draw((0, -0.25) -- (0, 1.2), arrow=Arrow(TeXHead));
draw((-1.3, 0) -- (1.3, 0), arrow=Arrow(TeXHead));
