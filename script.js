document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const heartsBg = document.getElementById('hearts-bg');
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const passwordScreen = document.getElementById('password-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const proposalScreen = document.getElementById('proposal-screen');
    const gameScreen = document.getElementById('game-screen');
    const yayScreen = document.getElementById('yay-screen');
    const memoriesScreen = document.getElementById('memories-screen');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const quizPandaContainer = document.getElementById('quiz-panda-container');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const scrollHintBtn = document.getElementById('scroll-hint-btn');
    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordError = document.getElementById('password-error');
    const screens = document.querySelectorAll('.screen');

    // Quiz Data
    const quizData = [
        {
            question: "1. Who is the lucky one in this relationship?",
            answers: [
                { text: "You ❤️", correct: false },
                { text: "Me", correct: false },
                { text: "Both of us! 😇", correct: true }
            ]
        },
        {
            question: "2. What is the perfect Propose Day gift?",
            answers: [
                { text: "Expensive Gifts 🎁", correct: false },
                { text: "Your Hand in Mine 🤝", correct: true },
                { text: "Just Food 🍕", correct: false }
            ]
        },
        {
            question: "3. Will you stay with me forever?",
            answers: [
                { text: "Maybe... 🤔", correct: false },
                { text: "Yes, Always! ✨", correct: true },
                { text: "Not at all!", correct: false }
            ]
        }
    ];

    let currentStep = 0;

    // 1. Background Animation (Floating Hearts)
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.2;
        heartsBg.appendChild(heart);

        setTimeout(() => heart.remove(), 6000);
    }
    setInterval(createHeart, 300);

    // Screen Transition Engine
    function showScreen(screenId) {
        screens.forEach(s => s.classList.add('hidden'));
        const target = document.getElementById(screenId);
        target.classList.remove('hidden');

        // Typing Animation Trigger
        const typingElements = target.querySelectorAll('[data-typing]');
        typingElements.forEach(el => typeElement(el));

        gsap.from(target, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            onComplete: () => gsap.set(target, { clearProps: "all" })
        });
    }

    // Typing Animation Logic
    function typeElement(element) {
        if (element.typingTimeout) {
            clearTimeout(element.typingTimeout);
        }

        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent);
        }

        const text = element.getAttribute('data-original-text');
        element.textContent = '';
        element.classList.add('typing-cursor');

        let i = 0;
        const speed = parseInt(element.getAttribute('data-typing-speed')) || 50;
        const delay = parseInt(element.getAttribute('data-typing-delay')) || 0;

        element.typingTimeout = setTimeout(() => {
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    element.typingTimeout = setTimeout(type, speed);
                } else {
                    element.classList.remove('typing-cursor');
                    element.typingTimeout = null;
                }
            }
            type();
        }, delay);
    }

    // 1.5 Countdown & Dynamic Text
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const dynamicText = document.getElementById('dynamic-text');

    // Target Date: Feb 14, 2026
    const targetDate = new Date("February 14, 2026 00:00:00").getTime();

    // Trigger Shockwave Animation
    // Trigger Shockwave Animation
    function triggerShockwave() {
        // Flash
        const flash = document.createElement('div');
        flash.classList.add('screen-flash');
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);

        // Multiple Ripples
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const shockwave = document.createElement('div');
                shockwave.classList.add('shockwave');
                document.body.appendChild(shockwave);
                setTimeout(() => shockwave.remove(), 2000);
            }, i * 300);
        }
    }

    let journeyUnlocked = false;

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (!journeyUnlocked) {
                journeyUnlocked = true;

                // Hide timer immediately
                document.getElementById('countdown-timer').style.display = 'none';

                // Delay the celebratory explosion slightly to ensure page load is stable
                setTimeout(() => {
                    // It's Time!
                    dynamicText.textContent = "Happy Valentine's Day My Love! 💖";
                    typeElement(dynamicText); // Type this message too!

                    // Trigger Animations
                    triggerShockwave();

                    // Show Start Button with Animation
                    const q = document.getElementById('start-question');
                    const btn = document.getElementById('start-btn');

                    q.classList.remove('hidden');
                    btn.classList.remove('hidden');

                    // Re-trigger typing for these revealed elements
                    typeElement(q);
                    typeElement(btn);

                    gsap.fromTo([q, btn],
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }
                    );
                }, 200); // 200ms delay - fast but safe
            }
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = d.toString().padStart(2, '0');
        hoursEl.textContent = h.toString().padStart(2, '0');
        minutesEl.textContent = m.toString().padStart(2, '0');
        secondsEl.textContent = s.toString().padStart(2, '0');
    }
    setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    // Dynamic Text Rotation
    const messages = [
        "Counting every second until Valentine's... ⏳",
        "Preparing the best day ever! 🌹",
        "Waiting for your smile... 💖",
        "You are my favorite person! ✨"
    ];
    let msgIdx = 0;

    setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        dynamicText.textContent = messages[msgIdx];
        // Remove old typing data to force re-type
        dynamicText.removeAttribute('data-original-text');
        typeElement(dynamicText);
    }, 4000);

    // 2. Journey Start
    startBtn.addEventListener('click', () => {
        showScreen('password-screen');
    });

    // Password Validation
    function validatePassword() {
        const val = passwordInput.value.trim().toLowerCase();
        if (val === '1 august') {
            passwordError.classList.add('hidden');
            showScreen('quiz-screen');
            loadQuestion();
        } else {
            passwordError.classList.remove('hidden');
            typeElement(passwordError); // Retype error
            gsap.to(passwordInput, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
        }
    }

    unlockBtn.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validatePassword();
    });

    // 3. Quiz Engine
    function loadQuestion() {
        if (!quizData[currentStep]) return;
        const currentData = quizData[currentStep];

        // Type question
        questionText.textContent = currentData.question;
        questionText.removeAttribute('data-original-text');
        typeElement(questionText);

        answerButtons.innerHTML = '';

        currentData.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.classList.add('quiz-btn');
            btn.textContent = ans.text;
            btn.addEventListener('click', () => handleAnswer(ans, btn));
            answerButtons.appendChild(btn);

            // Type answers
            typeElement(btn);
        });
    }

    // ... (other vars)

    // ...

    function handleAnswer(ans, btn) {
        if (ans.correct) {
            currentStep++;
            showSuccessBurst(btn);

            // Switch to Happy SVG
            quizPandaContainer.innerHTML = '';
            const happySvg = document.getElementById('happy-panda-svg').cloneNode(true);
            happySvg.removeAttribute('id'); // Avoid ID duplicates
            quizPandaContainer.appendChild(happySvg);

            if (currentStep < quizData.length) {
                gsap.to(quizScreen, {
                    opacity: 0, duration: 0.3, onComplete: () => {
                        loadQuestion();
                        gsap.to(quizScreen, { opacity: 1, duration: 0.3 });
                    }
                });
            } else {
                setTimeout(() => {
                    showScreen('rings-screen');
                    startRingsGame();
                }, 500);
            }
        } else {
            btn.textContent = "Try again 🧐";
            btn.classList.add('incorrect');

            // Switch to Sad SVG
            quizPandaContainer.innerHTML = '';
            const sadSvg = document.getElementById('sad-panda-svg').cloneNode(true);
            sadSvg.removeAttribute('id');
            quizPandaContainer.appendChild(sadSvg);

            gsap.to(btn, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
        }
    }

    function showSuccessBurst(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '✨';
            particle.style.position = 'fixed';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = 1000;
            document.body.appendChild(particle);

            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                scale: 2,
                duration: 1,
                onComplete: () => particle.remove()
            });
        }
    }

    // 2.2 Find the Rings Game
    function startRingsGame() {
        const grid = document.getElementById('rings-grid');
        const counter = document.getElementById('rings-found');
        let ringsFound = 0;
        const totalRings = 3;

        const items = ['💍', '💍', '💍', '🍫', '🍬', '🍭', '🍩', '🍪', '🍨'];
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        grid.innerHTML = '';
        items.forEach(item => {
            const box = document.createElement('div');
            box.classList.add('ring-box');
            box.addEventListener('click', () => {
                if (box.classList.contains('revealed')) return;
                box.classList.add('revealed');
                box.textContent = item;

                if (item === '💍') {
                    ringsFound++;
                    counter.textContent = ringsFound;
                    gsap.from(box, { scale: 1.5, duration: 0.3, ease: "back.out(2)" });
                    showSuccessBurst(box);

                    if (ringsFound === totalRings) {
                        setTimeout(() => {
                            showScreen('game-screen');
                            startCatchHeartGame();
                        }, 1000);
                    }
                } else {
                    gsap.to(box, { x: 5, duration: 0.1, repeat: 2, yoyo: true });
                }
            }, { once: true });
            grid.appendChild(box);
        });
    }

    // 2.5 Catch My Love Game
    function startCatchHeartGame() {
        const gameArea = document.getElementById('game-area');
        const progress = document.getElementById('game-progress');
        let caughtCount = 0;
        const target = 10;

        function spawnHeart() {
            if (caughtCount >= target) return;

            const heart = document.createElement('div');
            heart.classList.add('game-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
            heart.style.top = '-50px'; // Spawn from top
            gameArea.appendChild(heart);

            gsap.to(heart, {
                y: gameArea.offsetHeight + 50,
                x: '+=' + (Math.random() - 0.5) * 100,
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 1.5,
                ease: 'power1.in',
                onComplete: () => {
                    if (heart.parentElement) {
                        heart.remove();
                        spawnHeart(); // Respawn if missed
                    }
                }
            });

            heart.addEventListener('click', () => {
                caughtCount++;
                progress.style.width = (caughtCount / target * 100) + '%';
                showSuccessBurst(heart);
                heart.remove();

                if (caughtCount < target) {
                    spawnHeart();
                } else {
                    setTimeout(() => {
                        gsap.to(document.getElementById('game-screen'), {
                            opacity: 0, duration: 0.5, onComplete: () => {
                                document.getElementById('game-screen').classList.add('hidden');
                                document.getElementById('game-screen').style.opacity = 1;
                                showScreen('proposal-screen');
                            }
                        });
                    }, 500);
                }
            });
        }

        // Initial burst
        for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 500);
    }

    // 4. Final Proposal Escape Logic
    let noCount = 0;
    const noTexts = ["Really? 🥺", "Wait...", "No way!", "Seriously?", "Last chance!", "Parvati Please?🥹"];

    function moveNoButton() {
        noCount++;
        if (noCount < noTexts.length) noBtn.textContent = noTexts[noCount];

        const padding = 20;
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const x = padding + Math.random() * (vw - btnWidth - padding * 2);
        const y = padding + Math.random() * (vh - btnHeight - padding * 2);

        if (noBtn.style.position !== 'fixed') {
            document.body.appendChild(noBtn);
            noBtn.style.position = 'fixed';
            noBtn.style.zIndex = '9999';
        }

        gsap.to(noBtn, { left: x, top: y, duration: 0.2, ease: "power2.out" });

        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        if (currentSize < 150) {
            gsap.to(yesBtn, {
                fontSize: (currentSize + 10) + 'px',
                padding: (parseFloat(window.getComputedStyle(yesBtn).paddingTop) + 5) + 'px',
                duration: 0.2
            });
        }
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

    yesBtn.addEventListener('click', () => {
        noBtn.classList.add('hidden'); // Hide the fugitive button!
        showScreen('letter-screen');
    });

    // 4. Letter Reveal
    const envelope = document.getElementById('envelope');
    const toYayBtn = document.getElementById('to-yay-btn');
    let letterOpenedOnce = false;

    envelope.addEventListener('click', () => {
        envelope.classList.toggle('opened');
        if (envelope.classList.contains('opened')) {
            letterOpenedOnce = true;
            toYayBtn.classList.add('hidden');
        } else if (letterOpenedOnce) {
            toYayBtn.classList.remove('hidden');
        }
    });

    toYayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        gsap.to(document.getElementById('letter-screen'), {
            opacity: 0, duration: 0.5, onComplete: () => {
                document.getElementById('letter-screen').style.opacity = 1;
                showScreen('yay-screen');
                startEmojiRain();
            }
        });
    });

    // 5. Scroll Interaction
    scrollHintBtn.addEventListener('click', () => {
        memoriesScreen.classList.remove('hidden');
        memoriesScreen.scrollIntoView({ behavior: 'smooth' });
        document.body.style.overflowY = 'auto';
    });

    function startEmojiRain() {
        const emojis = ['❤️', '💖', '🌸', '✨'];
        setInterval(() => {
            const emoji = document.createElement('div');
            emoji.style.position = 'fixed';
            emoji.style.top = '-50px';
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.fontSize = '2rem';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.zIndex = 1000;
            emoji.style.pointerEvents = 'none';
            document.body.appendChild(emoji);
            gsap.to(emoji, {
                y: window.innerHeight + 100,
                x: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 2,
                ease: 'none',
                onComplete: () => emoji.remove()
            });
        }, 100);
    }

    // Trigger typing for the initial screen
    const initialTyping = welcomeScreen.querySelectorAll('[data-typing]');
    initialTyping.forEach(el => typeElement(el));
});
