// AESTHETIC FALLING CONFETTI / PARTY PAPERS GENERATOR
function createConfettiShower() {
  const container = document.getElementById("confetti-container");
  const colors = ["#f43f5e", "#fbbf24", "#8b5cf6", "#06b6d4", "#ec4899", "#34d399"];
  
  // Create multiple confetti pieces continuously
  setInterval(() => {
    if (document.hidden) return;
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = Math.random() * 8 + 6 + "px";
    piece.style.height = Math.random() * 14 + 10 + "px";
    
    const duration = Math.random() * 3 + 2;
    piece.style.animationDuration = duration + "s";
    
    container.appendChild(piece);
    
    setTimeout(() => {
      piece.remove();
    }, duration * 1000);
  }, 120);
}

// Initialize Confetti on load
window.addEventListener("DOMContentLoaded", () => {
  createConfettiShower();
});

// PASSCODE LOGIC
const CORRECT_PASSCODE = "667070"; 
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

// BALLOON PULL INTERACTION
const stringWrapper = document.getElementById("string-wrapper");
const interactiveElem = document.getElementById("interactive-element");
const pullString = document.getElementById("pull-string");

let isPulling = false;
let pullDistance = 0;

if (stringWrapper) {
  stringWrapper.addEventListener("mousedown", () => {
    isPulling = true;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isPulling) return;
    pullDistance += e.movementY;
    if (pullDistance > 0 && pullDistance < 100) {
      pullString.style.height = (130 + pullDistance) + "px";
    }
    if (pullDistance >= 80) {
      isPulling = false;
      interactiveElem.innerHTML = "✨🎉"; // Burst into confetti/sparkles
      setTimeout(() => {
        goToScene("scene-cake");
      }, 500);
    }
  });

  window.addEventListener("mouseup", () => {
    if (isPulling && pullDistance < 80) {
      isPulling = false;
      pullDistance = 0;
      pullString.style.height = "130px";
    }
  });

  // Touch Support for Mobile
  stringWrapper.addEventListener("touchstart", () => { isPulling = true; });
  window.addEventListener("touchmove", () => {
    if (!isPulling) return;
    pullDistance += 12;
    pullString.style.height = (130 + pullDistance) + "px";
    if (pullDistance >= 80) {
      isPulling = false;
      interactiveElem.innerHTML = "✨🎉";
      setTimeout(() => { goToScene("scene-cake"); }, 500);
    }
  });
}

// CAKE CUTTING INTERACTION (Horizontal Drag/Swipe)
const cakeBox = document.getElementById("cake-box");
const swipeLine = document.getElementById("swipe-line");
let isDraggingCake = false;
let startX = 0;
let boxWidth = 280;

if (cakeBox) {
  cakeBox.addEventListener("mousedown", (e) => {
    isDraggingCake = true;
    startX = e.clientX;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingCake) return;
    let diffX = e.clientX - startX;
    if (diffX > 0) {
      let progress = Math.min((diffX / boxWidth) * 100, 100);
      swipeLine.style.width = progress + "%";
      if (progress >= 90) {
        isDraggingCake = false;
        document.getElementById("next-to-letter").classList.remove("hidden");
      }
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDraggingCake) {
      isDraggingCake = false;
      swipeLine.style.width = "0%";
    }
  });

  cakeBox.addEventListener("touchstart", (e) => {
    isDraggingCake = true;
    startX = e.touches[0].clientX;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isDraggingCake) return;
    let diffX = e.touches[0].clientX - startX;
    if (diffX > 0) {
      let progress = Math.min((diffX / boxWidth) * 100, 100);
      swipeLine.style.width = progress + "%";
      if (progress >= 90) {
        isDraggingCake = false;
        document.getElementById("next-to-letter").classList.remove("hidden");
      }
    }
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
