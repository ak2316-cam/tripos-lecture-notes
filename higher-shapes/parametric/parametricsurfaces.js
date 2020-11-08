
function parametric(functions, parameters, subdivisions) {
    const f = (...params) => functions.map(f => f(...params))
  
    const verts = []//getPoints()
    const edges = []
  
   
  
    for (let i = 0; i <= subdivisions; i++) {
      for (let j = 0; j <= subdivisions; j++) {
          const u = (i * (parameters[0][1] - parameters[0][0]) / subdivisions) + parameters[0][0]
          const v = (j * (parameters[1][1] - parameters[1][0]) / subdivisions) + parameters[1][0]
          verts.push(f(u, v))
      }
    }
    
    let a, b, c, d
  
    for (let i = 0; i < subdivisions; i++) {
      for (let j = 0; j < subdivisions; j++) {
          a = i * (subdivisions + 1) + j
          b = i * (subdivisions + 1) + j + 1
          c = (i + 1) * (subdivisions + 1) + j + 1
          d = (i + 1) * (subdivisions + 1) + j
          
          edges.push([a,b])
          edges.push([b,d])
          edges.push([b,c])
          edges.push([c,d])
      }
  }
  
    return [verts, edges]
  }
  
  function graph(func, range, subdivisions) {
    return parametric([
      math.eval('f(x, y) = x'),
      math.eval('f(x, y) = y'),
      func
    ], range, subdivisions
    )
  }