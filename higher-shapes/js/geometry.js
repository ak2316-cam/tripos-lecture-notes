/**
 * Generates all possible combinations of the elements of an array,
 * Returns an array of arrays containing 2 elements.
 *
 * @param {Array} arr - Array to generate combinations of
 */
function combinations(arr) {
  let results = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      results.push([arr[i], arr[j]]);
    }
  }

  return results;
}

/**
 * Calculates the eucliden distance between 2 points,
 * a and b
 *
 * @param {Number} a - Point 1, in the form [a_1, a_2, ..., a_n]
 * @param {Number} b - Point 2, in the form [b_1, b_2, ..., b_n]
 */
function distance(a, b) {
  var sum = 0;
  var n;
  for (n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2);
  }
  return Math.sqrt(sum);
}

/**
 * @param {Int} n - Number of Sides
 */
function polygon(n) {
  let vertices = [];

  for (let i = 0; i < n; i++) {
    vertices.push([
      Math.sin(i / n * 2 * Math.PI),
      Math.cos(i / n * 2 * Math.PI)
    ]);
  }

  let edges = [];

  for (let j = 0; j < n; j++) {
    edges.push([j, (j + 1) % n]);
  }

  return [vertices.map(homogeneous), edges];
}

/**
 * @param {Int} n - Number of dimensions
 */
function simplex(n) {
  const s = -1 / (1 + Math.sqrt(1 + n));

  let vertices = [];

  for (let i = 0; i <= n; i++) {
    // Loop once for every vertex, i is the index of the vertex
    let vertex = [];

    if (i === n) {
      for (let j = 0; j < n; j++) {
        vertex.push(s);
      }
    } else {
      for (let j = 0; j < n; j++) {
        // Loop for each coordinate.

        // Check if the coordinate index is the same as the vertex index
        // if so, it's one, otherwise its 0
        vertex.push(j === i ? 1 : 0);
      }
    }
    vertices.push(vertex);
  }

  const edges = combinations(_.range(vertices.length));

  return [vertices.map(homogeneous), edges];
}

/**
 * @param {Int} n - Number of dimensions
 */
function hypercube(n) {
  let vertices = [];
  for (let i = 0; i < Math.pow(2, n); i++) {
    let binaryString = i.toString(2); // Get i in binary

    if (binaryString.length < n) {
      // Pad with 0's
      binaryString =
        new Array(n - binaryString.length + 1).join("0") + binaryString;
    }

    vertices.push(
      binaryString.split("").map(x => (x === "0" ? -1 / 2 : 1 / 2))
    );
  }

  const edges = combinations(_.range(vertices.length)).filter(
    x => distance(vertices[x[0]], vertices[x[1]]) === 1
  );

  return [vertices.map(homogeneous), edges];
}

/**
 * @param {Int} n - Number of dimensions
 */
function orthoplex(n) {
  let vertices = [];

  for (let i = 0; i < n; i++) {
    // Loop once for every vertex, i is the index of the vertex
    let vertex1 = [];
    let vertex2 = [];

    for (let j = 0; j < n; j++) {
      vertex1.push(j === i ? 1 : 0);
      vertex2.push(j === i ? -1 : 0);
    }
    vertices.push(vertex1);
    vertices.push(vertex2);
  }

  const edges = combinations(_.range(vertices.length)).filter(
    x => distance(vertices[x[0]], vertices[x[1]]) === Math.sqrt(2)
  );

  return [vertices.map(homogeneous), edges];
}

/**
 * Makes a point into a homogeneous point
 *
 * @param {Array} p - The point
 */
function homogeneous(p) {
  return p.concat(1);
}

/**
 * @param {Array|Vector} d - Vector to translate by
 * @param {Int} n - Number of dimensions
 */
function translate(d, n) {
  return math.eye(n + 1, n).subset(math.index(math.range(0, n + 1), n), d);
}

/**
 * @param {Array|Vector} s - Vector to scale by
 */
function scale(s) {
  return math.diag(s);
}

/**
 * @param {Number} theta - Rotation angle in radians
 * @param {Int} a - Index of the first axis specifying the rotation plane
 * @param {Int} b - Index of the second axis specifying the rotation plane
 * @param {Int} n - Number of dimensions
 */
function rotate(theta, a, b, n) {
  return math
    .eye(n + 1) // Uses Homogeneous Coordinates
    .subset(math.index(a - 1, a - 1), math.cos(theta))
    .subset(math.index(a - 1, b - 1), -math.sin(theta))
    .subset(math.index(b - 1, a - 1), math.sin(theta))
    .subset(math.index(b - 1, b - 1), math.cos(theta));
}

/**
 * @param {Number} theta - Rotation angle in radians
 * @param {Array} V - Array of vectors specifying the R^n-2 subspace
 * @param {Int} n - Number of dimensions
 */
function rotateAround(theta, V, n) {
  let matrix; // Accumulate The Matrices

  matrix = translate(math.multiply(V[0], -1), n);
  V = V.map(v => math.multiply(matrix, v));

  let currentMatrix;
  for (let i = 1; i < V.length - 1; i++) {
    for (let j = n - 1; j > i; j++) {
      // Make V_i,j 0
      currentMatrix = rotate(math.atan2(V[(i, j)]), j, j - 1, n);
      V = V.map(v => math.multiply(currentMatrix, v));
      matrix = math.multiply(matrix, currentMatrix);
    }
  }

  return math.multiply(
    math.multiply(matrix, rotate(theta, n - 1, n, n)),
    math.inv(matrix)
  );
}

function parallelProject(p) {
  // Parllel projection to n-1 dimensions, 
  // with the viewing point lying along the nth axis
  return p.slice(0, -1);
}

function perspectiveProject(p) {
  const pn = 5;
  return p.slice(0, -1).map(x => x * pn / (pn - p[p.length - 1]));
}
