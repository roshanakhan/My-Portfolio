const canvas = document.getElementById("canvas");

// Start canvas
canvas.width = window.innerWidth - 600;
canvas.height = 400;

const ctx = canvas.getContext("2d");
let starting_bg_color = "white";
ctx.fillStyle = starting_bg_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// For images
let img = new Image();
let fileName = "";

// For filters
let brightnessCount = 0;
let contrastCount = 0;
let saturationCount = 0;
let vibranceCount = 0;
let count = 5;

const brightness = document.querySelector(".brightness-counter");
const contrast = document.querySelector(".contrast-counter");
const saturation = document.querySelector(".saturation-counter");
const vibrance = document.querySelector(".vibrance-counter");

// Buttons
const downloadBtn = document.getElementById("download-btn");
const revertBtn = document.getElementById("revert-btn");
const uploadFileBtn = document.querySelector("#upload-file");
const customBtn = document.querySelector("#custom-btn");

// For pen drawing
let drawing_color = "black"; 
let drawing_width = "5";
let pen_range_value = "5";
const range_value = document.querySelector(".pen-width-counter");
let is_drawing = false;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

// For undo btn
let restore_array = [];
let index = -1;

// Effects and Filters
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function() {
        this.brightness(5).render();
        brightnessCount += count;
        brightness.innerHTML = brightnessCount;
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function() {
        this.brightness(-5).render();
        brightnessCount -= count;
        brightness.innerHTML = brightnessCount;
      });
    } else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function() {
        this.contrast(5).render();
        contrastCount += count;
        contrast.innerHTML = contrastCount;
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function() {
        this.contrast(-5).render();
        contrastCount -= count;
        contrast.innerHTML = contrastCount;
      });
    } else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function() {
        this.saturation(5).render();
        saturationCount += count;
        saturation.innerHTML = saturationCount;
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function() {
        this.saturation(-5).render();
        saturationCount -= count;
        saturation.innerHTML = saturationCount;
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      Caman("#canvas", img, function() {
        this.vibrance(5).render();
        vibranceCount += count;
        vibrance.innerHTML = vibranceCount;
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function() {
        this.vibrance(-5).render();
        vibranceCount -= count;
        vibrance.innerHTML = vibranceCount;
      });
    } else if (e.target.classList.contains("vintage-add")) {
      Caman("#canvas", img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains("lomo-add")) {
      Caman("#canvas", img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains("clarity-add")) {
      Caman("#canvas", img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains("sincity-add")) {
      Caman("#canvas", img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("crossprocess-add")) {
      Caman("#canvas", img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("pinhole-add")) {
      Caman("#canvas", img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("nostalgia-add")) {
      Caman("#canvas", img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("hermajesty-add")) {
      Caman("#canvas", img, function() {
        this.herMajesty().render();
      });
    }
  }
});

// Revert Filters and Effects
revertBtn.addEventListener("click", e => {
  Caman("#canvas", img, function() {
    this.revert();
  });

  brightnessCount = 0;
  contrastCount = 0;
  saturationCount = 0;
  vibranceCount = 0;

  brightness.innerHTML = brightnessCount;
  contrast.innerHTML = contrastCount;
  saturation.innerHTML = saturationCount;
  vibrance.innerHTML = vibranceCount;
  
});

// Upload File Btn
uploadFileBtn.addEventListener("change", () => {
  // Get File and Read
  const file = document.getElementById("upload-file").files[0];
  const reader = new FileReader();

  // Check for file and set name
  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }

  // Add image to canvas
  reader.addEventListener(
    "load",
    () => {
      // Create image
      img = new Image();
      // Set image src
      img.src = reader.result;
      // On image load add to canvas
      img.onload = function() {
        canvas.width = window.innerWidth - 600;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // reset effects count
      brightnessCount = 0;
      contrastCount = 0;
      saturationCount = 0;
      vibranceCount = 0;

      brightness.innerHTML = brightnessCount;
      contrast.innerHTML = contrastCount;
      saturation.innerHTML = saturationCount;
      vibrance.innerHTML = vibranceCount;
      };
    },
    false
   
  );
});

// Download btn
downloadBtn.addEventListener("click", () => {
  // Get extension and set new filename
  const fileExtension = fileName.slice(-4);
  let newFilename;

  if (fileExtension === ".jpg" || fileExtension === ".png") {
    newFilename = fileName.substring(0, fileName.length - 4) + "-IMG-Editor.jpg";
  }
  download(canvas, newFilename);
});

// Download
function download(canvas, filename) {
  // Init event
  let e;
  // Create link
  const link = document.createElement("a");

  // Set props
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  // New mouse event
  e = new MouseEvent("click");
  // Dispatch event
  link.dispatchEvent(e);
}

// For upload
function uploadFileActive() {
  uploadFileBtn.click();
}

// For changing color from tools
function change_color(element) {
  drawing_color = element.style.background;
}

// To start drawing
function start(event) {
is_drawing = true;
ctx.beginPath();
ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
event.preventDefault();
}

function draw(event) {
if (is_drawing) {
  ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  ctx.strokeStyle = drawing_color;
  ctx.lineWidth = drawing_width;
    // get pen width
    pen_range_value = drawing_width;
    range_value.innerHTML = pen_range_value;
    //

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
   
}
event.preventDefault();
}

// Stop drawing 
function stop(event) {
if (is_drawing) {
  ctx.stroke();
  ctx.closePath();
    is_drawing = false;
}
event.preventDefault();

if (event.type != 'mouseout') {
restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
index += 1;
}
}

// Reset canvas
function clear_canvas() {
  canvas.width = window.innerWidth - 600;
  canvas.height = 400;
ctx.fillStyle = starting_bg_color;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillRect(0, 0, canvas.width, canvas.height);
restore_array = [];
index = -1;

brightnessCount = 0;
      contrastCount = 0;
      saturationCount = 0;
      vibranceCount = 0;

      brightness.innerHTML = brightnessCount;
      contrast.innerHTML = contrastCount;
      saturation.innerHTML = saturationCount;
      vibrance.innerHTML = vibranceCount;
}

// For fill color btn
function fill_canvas() {
  canvas.width = window.innerWidth - 600;
  canvas.height = 400;
ctx.fillStyle = drawing_color;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Undo last drawing
function undo_last() {
if (index <= 0) {
    clear_canvas();
} else {
    index -= 1;
    restore_array.pop();
    ctx.putImageData(restore_array[index], 0, 0);
}
}


