let prefs = {
  dimensions: 3,
  shapeType: "hypercube",
  rotationSpeed: 0.1,
  perspective: true,
  useAxis: false,
  axis1: 2,
  axis2: 1
};

let animationMatrix = math.eye(prefs.dimensions + 1);
updateAnimationMatrix();

class Shape {
  constructor(scene, type) {
    this.scene = scene;

    let createdShape;
    if (prefs.shapeType === "hypercube") {
      createdShape = hypercube(prefs.dimensions);
    } else if (prefs.shapeType === "simplex") {
      createdShape = simplex(prefs.dimensions);
    } else if (prefs.shapeType === "orthoplex") {
      createdShape = orthoplex(prefs.dimensions);
    } else if (prefs.shapeType === "hecatonicosachoron") {
      prefs.dimensions = 4;
      createdShape = hecatonicosachoron.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
            .map(xs => math.multiply(scale([0.5, 0.5, 0.5, 0.5, 1]), xs));
        }
        return xs;
      });
    } else if (prefs.shapeType === "hexacosichoron") {
      prefs.dimensions = 4;
      createdShape = hexacosichoron.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
            .map(xs => math.multiply(scale([0.5, 0.5, 0.5, 0.5, 1]), xs));
        }
        return xs;
      });
    } else if (prefs.shapeType === "icositetrachoron") {
      prefs.dimensions = 4;
      createdShape = icositetrachoron.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
            .map(xs => math.multiply(scale([0.5, 0.5, 0.5, 0.5, 1]), xs));
        }
        return xs;
      });
    } else if (prefs.shapeType === "hexadecachoron") {
      prefs.dimensions = 4;
      createdShape = hexadecachoron.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
            .map(xs => math.multiply(scale([0.5, 0.5, 0.5, 0.5, 1]), xs));
        }
        return xs;
      });
    } else if (prefs.shapeType === "klein bottle") {
      prefs.dimensions = 4;
      createdShape = bottle.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
        }
        return xs;
      });
    } else if (prefs.shapeType === "sphere") {
      prefs.dimensions = 3;
      createdShape = sphere.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
        }
        return xs;
      });
    } else if (prefs.shapeType === "mobius strip") {
      prefs.dimensions = 3;
      createdShape = mobius.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
        }
        return xs;
      });
    } else if (prefs.shapeType === "cliffords torus") {
      prefs.dimensions = 4;
      createdShape = cliffordstorus.map((xs, i) => {
        if (i === 0) {
          return xs
            .map(homogeneous)
           
        }
        return xs;
      });
    }

    updateAnimationMatrix();

    this.coordinates = {
      verts: createdShape[0],
      edges: createdShape[1]
    };

    this.geometry = new THREE.Geometry();
    this.geometry.vertices = createdShape[0]
      .map(project)
      .map(xs => new THREE.Vector3(xs[0], xs[1], xs[2]));
    this.geometry.faces = createdShape[1].map(
      xs => new THREE.Face3(xs[0], xs[1], xs[1])
    );
    this.geometry.dynamic = true;

    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);
  }

  applyMatrix(M) {
    this.coordinates.verts = this.coordinates.verts.map(
      xs => math.multiply(M, xs)._data
    );

    let vs = this.coordinates.verts.map(project);

    for (let i = 0; i < this.coordinates.verts.length; i++) {
      this.mesh.geometry.vertices[i].x = vs[i][0];
      this.mesh.geometry.vertices[i].y = vs[i][1];
      this.mesh.geometry.vertices[i].z = vs[i][2];
    }

    this.mesh.geometry.verticesNeedUpdate = true;
  }

  removeShape() {
    this.scene.remove(this.mesh);
  }
}

// SETUP RENDERING
let scene, camera, renderer, stats;
setup();

// Mesh
let shape = new Shape(scene);

// GUI
let gui;
setupGui();

// Animation Loop
function render() {
  shape.applyMatrix(animationMatrix);

  setTimeout(function() {
    requestAnimationFrame(render);
  }, 1000 / 90);

  renderer.render(scene, camera);
  stats.update();
}
render();

// Helper Functions
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function project(p) {
  if (p.length > 2) {
    return project(prefs.perspective? perspectiveProject(p): parallelProject(p));
  }

  return p.concat(0);
}

function setup() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({
    preserveDrawingBuffer: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  stats = new Stats();

  window.addEventListener("resize", onWindowResize, false);

  document.body.appendChild(renderer.domElement);
  document.body.appendChild(stats.domElement);
}

function setupGui() {
  gui = new dat.GUI();

  const dimsGui = gui
    .add(prefs, "dimensions", 3, 15)
    .listen()
    .name("Dimensions")
    .step(1);
  const shapeGui = gui
    .add(prefs, "shapeType", [
      "hypercube",
      "simplex",
      "orthoplex",
      "hecatonicosachoron",
      "hexacosichoron",
      "icositetrachoron",
      "hexadecachoron",
      "klein bottle",
      "mobius strip",
      "sphere",
      "cliffords torus"
    ])
    .name("Type Of Shape");

    gui.add(camera.position, 'z', 0, 50).name('z-Position').step(2)
  const speedGui = gui
    .add(prefs, "rotationSpeed", 0, 1)
    .name("Rotation Speed")
    .step(0.05);

  var rotation = gui.addFolder('Rotation Preferences');
  const useGui = rotation.add(prefs, 'useAxis').name('Rotate About Axis')
  const axis1Gui = rotation.add(prefs, 'axis1').name('Axis 1');
  const axis2Gui = rotation.add(prefs, 'axis2').name('Axis 2');

  useGui.onFinishChange(() => {
    updateAnimationMatrix()
  })
  axis1Gui.onFinishChange(() => {
    updateAnimationMatrix()
  })
  axis2Gui.onFinishChange(() => {
    updateAnimationMatrix()
  })
  
  gui.add(prefs, 'perspective').name('Perspective Projection')

  const screenshotObj = {
    snap: () => {
      const a = document.createElement("a");
      a.href = renderer.domElement
        .toDataURL()
        .replace("image/png", "image/octet-stream");
      a.download = "screenshot.png";

      a.click();
    }
  };

  gui.add(screenshotObj, "snap").name("Screenshot");

  speedGui.onFinishChange(() => {
    updateAnimationMatrix();
  });

  dimsGui.onFinishChange(() => {
    animationMatrix = rotate(0.02, 1, 2, prefs.dimensions);

    shape.removeShape();
    shape = new Shape(scene);
  });

  shapeGui.onFinishChange(value => {
    shape.removeShape();
    shape = new Shape(scene);
  });
}

function updateAnimationMatrix() {
  animationMatrix = math.eye(prefs.dimensions + 1);

  if (prefs.useAxis) {
    animationMatrix = rotate(prefs.rotationSpeed / 10, prefs.axis1, prefs.axis2, prefs.dimensions)
  } else {
    combinations(_.range(1, prefs.dimensions + 1)).forEach(xs => {
      animationMatrix = math.multiply(
        animationMatrix,
        rotate(prefs.rotationSpeed / 10, xs[0], xs[1], prefs.dimensions)
      );
    });
  }
}
