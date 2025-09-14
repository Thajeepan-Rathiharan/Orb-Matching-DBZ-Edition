// Available orb colors
const colors = ["red", "blue", "green", "yellow", "purple"];

// DOM elements
const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
const attackBtn = document.getElementById("attackBtn");

const enemyHealthFill = document.getElementById("enemy-health");
const enemyHpText = document.getElementById("enemy-hp");

const playerHealthFill = document.getElementById("player-health");
const playerHpText = document.getElementById("player-hp");

// Game state
let energy = 0;
let enemyHp = 100;
let playerHp = 100;

// Create an orb
function createOrb() {
  const orb = document.createElement("div");
  orb.classList.add("orb");
  const color = colors[Math.floor(Math.random() * colors.length)];
  orb.style.background = color;
  orb.dataset.color = color;
  orb.addEventListener("click", () => collectOrbs(orb));
  return orb;
}

// Fill the grid
function initGrid() {
  for (let i = 0; i < 30; i++) {
    grid.appendChild(createOrb());
  }
}

// Collect orbs of the same color
function collectOrbs(orb) {
  const color = orb.dataset.color;
  const sameColor = [...grid.children].filter(o => o.dataset.color === color);

  if (sameColor.length > 1) {
    sameColor.forEach(o => grid.removeChild(o));
    for (let i = 0; i < sameColor.length; i++) {
      grid.appendChild(createOrb());
    }
    energy += sameColor.length * 5;
    scoreDisplay.textContent = `Energy: ${energy}`;
  }
}

// Perform attack
function attack() {
  if (energy <= 0) {
    alert("Not enough energy!");
    return;
  }
  const damage = Math.min(energy, enemyHp);
  enemyHp -= damage;
  energy = 0;
  scoreDisplay.textContent = `Energy: ${energy}`;
  updateEnemyHealth();

  if (enemyHp <= 0) {
    alert("Enemy defeated!");
    enemyHp = 100;
    updateEnemyHealth();
  } else {
    setTimeout(enemyTurn, 1000); // enemy counterattacks
  }
}

// Enemy counterattack
function enemyTurn() {
  const damage = Math.floor(Math.random() * 15) + 5; // 5–20 damage
  playerHp = Math.max(0, playerHp - damage);
  updatePlayerHealth();

  if (playerHp <= 0) {
    alert("You were defeated!");
    // Reset game
    playerHp = 100;
    enemyHp = 100;
    energy = 0;
    scoreDisplay.textContent = `Energy: ${energy}`;
    updatePlayerHealth();
    updateEnemyHealth();
  }
}

// Update enemy health bar
function updateEnemyHealth() {
  enemyHpText.textContent = `HP: ${enemyHp}`;
  enemyHealthFill.style.width = enemyHp + "%";
  if (enemyHp < 30) {
    enemyHealthFill.style.background = "red";
  } else if (enemyHp < 60) {
    enemyHealthFill.style.background = "orange";
  } else {
    enemyHealthFill.style.background = "limegreen";
  }
}

// Update player health bar
function updatePlayerHealth() {
  playerHpText.textContent = `HP: ${playerHp}`;
  playerHealthFill.style.width = playerHp + "%";
  if (playerHp < 30) {
    playerHealthFill.style.background = "red";
  } else if (playerHp < 60) {
    playerHealthFill.style.background = "orange";
  } else {
    playerHealthFill.style.background = "limegreen";
  }
}

// Event listeners
attackBtn.addEventListener("click", attack);

// Initialize game
initGrid();
updateEnemyHealth();
updatePlayerHealth();
