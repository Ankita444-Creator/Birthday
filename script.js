// PASSCODE LOGIC
const CORRECT_PASSCODE = "667070"; // B F F ascii sequence
let currentInput = "";

function pressKey(num) {
  if (currentInput.length < 6) {
    currentInput += num;
    updateDots();
  }
  if (currentInput.length === 6) {
    checkPasscode();
  }
}

function clearKeypad() {
  currentInput = "";
  updateDots();
  document.getElementById("error-msg").innerText = "";
}

function deleteKey() {
  currentInput = currentInput.slice(0, -1);
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index < currentInput.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  });
}

function checkPasscode() {
  if (currentInput === CORRECT_PASSCODE) {
    // Play audio
    const music = document.getElementById("bg-music");
    music.play().catch(e => console.log("Audio play deferred"));
    
    goToScene("scene-floral");
  } else {
    document.getElementById("error-msg").innerText = "Wrong passcode! Try again.";
    clearKeypad();
  }
}

// SCENE NAVIGATION
function goToScene(sceneId) {
  document.querySelectorAll(".scene").forEach(scene => {
    scene.classList.remove("active");
  });
  document.getElementById(sceneId).classList.add("active");
}

// STRING PULL TRANSITION
const stringWrapper = document.getElementById("string-wrapper");
if (stringWrapper) {
  stringWrapper.addEventListener("click", () => {
    goToScene("scene-cake");
  });
}

// CAKE CUTTING INTERACTION
const cakeBox = document.getElementById("cake-box");
if (cakeBox) {
  let isSwiping = false;

  cakeBox.addEventListener("mousedown", () => isSwiping = true);
  cakeBox.addEventListener("mouseup", () => {
    if (isSwiping) {
      document.getElementById("next-to-letter").classList.remove("hidden");
    }
    isSwiping = false;
  });

  cakeBox.addEventListener("touchstart", () => isSwiping = true);
  cakeBox.addEventListener("touchend", () => {
    if (isSwiping) {
      document.getElementById("next-to-letter").classList.remove("hidden");
    }
    isSwiping = false;
  });
}

// LETTER MODAL
function openLetter() {
  document.getElementById("letter-modal").classList.remove("hidden");
}

// PHOTO MODAL
function showPhotoModal(src, caption) {
  document.getElementById("modal-img").src = src;
  document.getElementById("modal-caption").innerText = caption;
  document.getElementById("photo-modal").classList.remove("hidden");
}

function closePhotoModal() {
  document.getElementById("photo-modal").classList.add("hidden");
}
