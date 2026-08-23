let enteredPasscode = "";
const CORRECT_PASSCODE = "667070";

function pressKey(digit) {
  if (enteredPasscode.length < 6) {
    enteredPasscode += digit;
    updatePasscodeDisplay();
    
    if (enteredPasscode.length === 6) {
      setTimeout(verifyPasscode, 200);
    }
  }
}

function deleteKey() {
  enteredPasscode = enteredPasscode.slice(0, -1);
  updatePasscodeDisplay();
}

function clearKeypad() {
  enteredPasscode = "";
  updatePasscodeDisplay();
}

function updatePasscodeDisplay() {
  const dots = document.querySelectorAll("#passcode-display .dot");
  dots.forEach((dot, index) => {
    if (index < enteredPasscode.length) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function verifyPasscode() {
  if (enteredPasscode === CORRECT_PASSCODE) {
    playMusic();
    goToScene('scene-floral');
  } else {
    const errorMsg = document.getElementById("error-msg");
    if(errorMsg) errorMsg.innerText = "Wrong Passcode! Try Again ❌";
    
    setTimeout(() => {
      enteredPasscode = "";
      updatePasscodeDisplay();
      if(errorMsg) errorMsg.innerText = "";
    }, 800);
  }
}

function playMusic() {
  const music = document.getElementById("bg-music");
  if (music) {
    music.volume = 0.5;
    music.play().catch(e => console.log("Audio play blocked:", e));
  }
}

function goToScene(sceneId) {
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.remove('active');
  });
  const target = document.getElementById(sceneId);
  if (target) {
    target.classList.add('active');
  }
  
  if (sceneId === 'scene-letter') {
    triggerConfettiShower();
  }
}

// Continuous Confetti Shower Function
function triggerConfettiShower() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  container.classList.add("active");
  
  const colors = ["#f43f5e", "#fbbf24", "#8b5cf6", "#06b6d4", "#ec4899", "#34d399"];
  
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
  }, 150);
}

function openLetter() {
  const modal = document.getElementById("letter-modal");
  if (modal) modal.classList.remove("hidden");
}

function showPhotoModal(imgSrc, caption) {
  const modal = document.getElementById("photo-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  
  if (modal && modalImg && modalCaption) {
    modalImg.src = imgSrc;
    modalCaption.innerText = caption;
    modal.classList.remove("hidden");
  }
}

function closePhotoModal() {
  const modal = document.getElementById("photo-modal");
  if (modal) modal.classList.add("hidden");
}
