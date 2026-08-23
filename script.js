// FUNCTION TO LAUNCH CONFETTI ONLY WHEN SUCCESSFUL
function triggerConfettiShower() {
  const container = document.getElementById("confetti-container");
  container.classList.add("active");
  container.innerHTML = "";
  
  const colors = ["#f43f5e", "#fbbf24", "#8b5cf6", "#06b6d4", "#ec4899", "#34d399"];
  
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = Math.random() * 8 + 6 + "px";
    piece.style.height = Math.random() * 14 + 10 + "px";
    
    const duration = Math.random() * 2 + 2;
    piece.style.animationDuration = duration + "s";
    piece.style.animationDelay = Math.random() * 0.5 + "s";
    
    container.appendChild(piece);
  }
}

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

  // If entering cake scene, trigger sequential candle lighting
  if (sceneId === 'scene-cake') {
    lightCandlesSequentially();
  }
}

// SEQUENTIAL CANDLE LIGHTING ANIMATION
function lightCandlesSequentially() {
  setTimeout(() => {
    document.querySelector("#candle-1 .flame").classList.add("lit");
  }, 400);
  setTimeout(() => {
    document.querySelector("#candle-2 .flame").classList.add("lit");
  }, 900);
  setTimeout(() => {
    document.querySelector("#candle-3 .flame").classList.add("lit");
  }, 1400);
}

// BIG BALLOON STRING PULL & POP INTERACTION
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
    if (pullDistance > 0 && pullDistance < 120) {
      pullString.style.height = (140 + pullDistance) + "px";
    }
    if (pullDistance >= 100) {
      isPulling = false;
      popBalloonAndProceed();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isPulling && pullDistance < 100) {
      isPulling = false;
      pullDistance = 0;
      pullString.style.height = "140px";
    }
  });

  // Touch Support for Mobile
  stringWrapper.addEventListener("touchstart", () => { isPulling = true; });
  window.addEventListener("touchmove", (e) => {
    if (!isPulling) return;
    pullDistance += 12;
    pullString.style.height = (140 + pullDistance) + "px";
    if (pullDistance >= 100) {
      isPulling = false;
      popBalloonAndProceed();
    }
  });
}

function popBalloonAndProceed() {
  // Balloon pop burst effect
  interactiveElem.style.transform = "scale(1.4)";
  interactiveElem.style.opacity = "0";
  interactiveElem.style.transition = "all 0.2s ease-out";
  
  // Trigger Confetti ONLY here on success!
  triggerConfettiShower();

  setTimeout(() => {
    goToScene("scene-cake");
  }, 700);
}

// CAKE CUTTING INTERACTION (Horizontal Drag/Swipe)
const cakeBox = document.getElementById("cake-box");
const swipeLine = document.getElementById("swipe-line");
let isDraggingCake = false;
let startX = 0;
let boxWidth = 300;

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
