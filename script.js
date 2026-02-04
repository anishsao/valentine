// Custom Cursor
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
});

// Floating Hearts Background
const heartsContainer = document.getElementById('hearts');
const heartEmojis = ['🦜💕', '🦥💖', '🐿️💗', '🐹💝', '🦎💘', '🐴❤️', '🦦💓', '🦍💞'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 4 + 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 14000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 500);

// Create initial hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Button Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionPage = document.getElementById('question-page');
const successPage = document.getElementById('success-page');

// Yes Button Click Handler
yesBtn.addEventListener('click', () => {
    questionPage.classList.add('hidden');
    successPage.classList.remove('hidden');
    createConfetti();
    document.title = 'YAYYYY!!! 💕';
});

// No Button - Escape from mouse!
const buttonPadding = 20; // Minimum distance from screen edges

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function moveButton(e) {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = getDistance(mouseX, mouseY, btnCenterX, btnCenterY);
    const triggerDistance = 100; // How close the mouse needs to be to trigger movement

    if (distance < triggerDistance) {
        // Calculate direction away from mouse
        const angle = Math.atan2(btnCenterY - mouseY, btnCenterX - mouseX);

        // Move distance (the closer the mouse, the further it moves)
        const moveDistance = (triggerDistance - distance) * 2;

        // Calculate new position
        let newX = btnCenterX + Math.cos(angle) * moveDistance;
        let newY = btnCenterY + Math.sin(angle) * moveDistance;

        // Get viewport boundaries
        const maxX = window.innerWidth - btnRect.width / 2 - buttonPadding;
        const minX = btnRect.width / 2 + buttonPadding;
        const maxY = window.innerHeight - btnRect.height / 2 - buttonPadding;
        const minY = btnRect.height / 2 + buttonPadding;

        // Keep button within bounds
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));

        // If button is stuck at edge, try to move perpendicular
        if ((newX === minX || newX === maxX) && (newY === minY || newY === maxY)) {
            // Corner case - jump to a random safe position
            newX = Math.random() * (maxX - minX) + minX;
            newY = Math.random() * (maxY - minY) + minY;
        }

        // Apply position
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX - btnRect.width / 2 + 'px';
        noBtn.style.top = newY - btnRect.height / 2 + 'px';
        noBtn.style.transform = 'none';
    }
}

document.addEventListener('mousemove', moveButton);

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveButton({ clientX: touch.clientX, clientY: touch.clientY });
});

// Confetti Effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b95', '#ff8a80', '#ffab91', '#ffcc80', '#fff59d', '#a5d6a7', '#80deea', '#b39ddb'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Add some playful messages when hovering over No button
const noMessages = ['Nope!', 'Try again!', 'Can\'t catch me!', 'Nice try!', 'Hehe 😜', 'Not today!', '🏃💨'];
let messageIndex = 0;

noBtn.addEventListener('mouseenter', () => {
    noBtn.textContent = noMessages[messageIndex % noMessages.length];
    messageIndex++;
});

noBtn.addEventListener('mouseleave', () => {
    noBtn.textContent = 'No 🥺';
});
