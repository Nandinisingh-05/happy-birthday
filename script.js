// ==========================================
// KHUSHBOO'S BIRTHDAY WEBSITE 💗
// ==========================================

// Change this to your own secret password.
const correctPassword = "khushboo";

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");

const passwordScreen = document.getElementById("passwordScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const scrapbookScreen = document.getElementById("scrapbookScreen");

const continueButton = document.getElementById("continueButton");


// 1. PASSWORD UNLOCK
passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword.toLowerCase() === correctPassword.toLowerCase()) {
        passwordScreen.classList.add("hidden");
        birthdayScreen.classList.remove("hidden");
        birthdayScreen.classList.add("unlocked");

        errorMessage.textContent = "";
        updateCountdown();
    } else {
        errorMessage.textContent =
            "Oops! That's not it, bestie. Try again 💗";

        passwordInput.value = "";
        passwordInput.focus();
    }
});


// 2. OPEN THE SCRAPBOOK
continueButton.addEventListener("click", function () {
    birthdayScreen.classList.add("hidden");
    scrapbookScreen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 3. BIRTHDAY COUNTDOWN
// Birthday: October 12, 2026.
// JavaScript months start at 0, so October is 9.
const birthdayDate = new Date(2026, 9, 12, 0, 0, 0);

function updateCountdown() {
    const countdown = document.getElementById("countdown");
    const now = new Date();
    const difference = birthdayDate.getTime() - now.getTime();

    if (difference <= 0) {
        countdown.textContent = "It's your special day! Happy Birthday! 🎂";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor((difference / 1000) % 60);

    countdown.textContent =
        `${days} days · ${hours} hours · ${minutes} min · ${seconds} sec`;
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 4. SECRET MESSAGE CARDS
const secretCards = document.querySelectorAll(".secret-card");
const secretMessage = document.getElementById("secretMessage");

secretCards.forEach(function (card) {
    card.addEventListener("click", function () {
        secretMessage.textContent = card.dataset.message;

        secretMessage.classList.remove("unlocked");
        void secretMessage.offsetWidth;
        secretMessage.classList.add("unlocked");
    });
});


// 5. TYPING BIRTHDAY LETTER
const openLetterButton = document.getElementById("openLetterButton");
const letterPaper = document.getElementById("letterPaper");
const typedLetter = document.getElementById("typedLetter");

const birthdayLetter =
    "Today is all about celebrating you. I hope this new chapter of your life brings you beautiful memories, unexpected happiness, and dreams coming true. Thank you for being the wonderful person you are. Never forget how special you are, how much you matter, and how many smiles you bring into this world. No matter what this year holds, I hope you always find reasons to laugh, courage to chase your dreams, and people who love you exactly as you are. You deserve the sweetest things in life. Happy Birthday, bestie! 💗🌷";

let typingTimer = null;

openLetterButton.addEventListener("click", function () {
    // Cancel any animation already running.
    if (typingTimer !== null) {
        clearInterval(typingTimer);
        typingTimer = null;
    }

    letterPaper.classList.remove("hidden");
    typedLetter.textContent = "";

    openLetterButton.disabled = true;
    openLetterButton.textContent = "Writing your letter... 💌";

    let characterIndex = 0;

    typingTimer = setInterval(function () {
        typedLetter.textContent += birthdayLetter[characterIndex];
        characterIndex++;

        if (characterIndex >= birthdayLetter.length) {
            clearInterval(typingTimer);
            typingTimer = null;

            openLetterButton.disabled = false;
            openLetterButton.textContent = "Read my letter again ♡";
        }
    }, 28);

    letterPaper.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});


// 6. FINAL GIFT REVEAL
const giftButton = document.getElementById("giftButton");
const giftEmoji = document.getElementById("giftEmoji");
const giftReveal = document.getElementById("giftReveal");

giftButton.addEventListener("click", function () {
    const isAlreadyOpen = !giftReveal.classList.contains("hidden");

    if (isAlreadyOpen) {
        giftReveal.classList.add("hidden");
        giftEmoji.textContent = "🎁";
        giftButton.querySelector(".gift-caption").textContent = "Click me! ♡";
        return;
    }

    giftEmoji.textContent = "💝";
    giftButton.querySelector(".gift-caption").textContent = "A little gift for you ♡";
    giftReveal.classList.remove("hidden");

    giftReveal.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

    // A little burst of floating hearts!
    createHearts();
});

function createHearts() {
    const symbols = ["💗", "💕", "💖", "✨", "🌸"];

    for (let i = 0; i < 18; i++) {
        const heart = document.createElement("span");

        heart.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-35px";
        heart.style.fontSize = (18 + Math.random() * 18) + "px";
        heart.style.zIndex = "9999";
        heart.style.pointerEvents = "none";
        heart.style.transition =
            "transform 2.5s ease-out, opacity 2.5s ease-out";

        document.body.appendChild(heart);

        requestAnimationFrame(function () {
            heart.style.transform =
                `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = "0";
        });

        setTimeout(function () {
            heart.remove();
        }, 2700);
    }
}


// 7. GENTLE SYNTHESIZED BACKGROUND MUSIC
const musicButton = document.getElementById("musicButton");
const birthdayMusic = document.getElementById("birthdayMusic");

if (musicButton && birthdayMusic) {
    musicButton.addEventListener("click", async function () {
        try {
            if (birthdayMusic.paused) {
                await birthdayMusic.play();
                musicButton.textContent = "♫ Pause Aashiyan";
            } else {
                birthdayMusic.pause();
                musicButton.textContent = "♫ Play Aashiyan";
            }
        } catch (error) {
            console.error("Music playback failed:", error);
        }
    });
}
