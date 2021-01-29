if(!settings.multipleView) settings.batchView=false;
settings.tex="pdflatex";
defaultfilename="dynamics-and-relativity-1";
if(settings.render < 0) settings.render=4;
settings.outformat="";
settings.inlineimage=true;
settings.embed=true;
settings.toolbar=false;
viewportmargin=(2,2);

unitsize(55);
import graph;
pair F(real x) {
return (0.5*x, 0.5*0.3*(x^3 - 3*x));
}

path g = graph(F, -2.1, 2.1);

draw(g, blue + linewidth(0.9pt));

draw((0, -0.55) -- (0, 0.55), arrow=Arrow(TeXHead));
draw((-1.3, 0) -- (1.3, 0), arrow=Arrow(TeXHead));

label("$V(x)$", (1.6, 0.44415), blue);
