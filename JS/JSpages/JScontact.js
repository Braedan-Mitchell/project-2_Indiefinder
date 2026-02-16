/* JS code for the contact page of the indiefind project */

document.addEventListener('DOMContentLoaded', () => {
    // Show thank-you popup after a reload if submission completed
    if (sessionStorage.getItem('indiefind_form_submitted') === 'true') {
        alert('Thank you! Your information has been submitted.');
        sessionStorage.removeItem('indiefind_form_submitted');
    }

    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const titleInput = document.getElementById('title');
    const messageInput = document.getElementById('message');

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /@(?:icloud\.com|gmail\.com)$/i;

    // Immediate validation for name: show message as soon as an invalid character appears
    nameInput.addEventListener('input', () => {
        const raw = nameInput.value;
        const trimmed = raw.trim();

        // empty -> ask to enter name
        if (!trimmed) {
            nameInput.setCustomValidity('Please enter your name.');
            nameInput.reportValidity();
            return;
        }

        // invalid characters -> show letters-only message immediately
        if (!nameRegex.test(raw)) {
            nameInput.setCustomValidity('Name may contain only letters.');
            nameInput.reportValidity();
            return;
        }

        // valid
        nameInput.setCustomValidity('');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const title = titleInput.value.trim();
        const message = messageInput.value.trim();

        // Reset custom validity messages
        nameInput.setCustomValidity('');
        emailInput.setCustomValidity('');
        titleInput.setCustomValidity('');
        messageInput.setCustomValidity('');

        let valid = true;

        if (!name) {
            // empty -> prompt to enter name
            nameInput.setCustomValidity('Please enter your name.');
            valid = false;
        } else if (!nameRegex.test(name)) {
            // contains disallowed chars -> show character rule
            nameInput.setCustomValidity('Name may contain only letters.');
            valid = false;
        }

        if (!email) {
            emailInput.setCustomValidity('Please enter your email.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            emailInput.setCustomValidity('Email must end with @icloud.com or @gmail.com.');
            valid = false;
        }

        if (!title) {
            titleInput.setCustomValidity('Please enter a title.');
            valid = false;
        }

        if (!message) {
            messageInput.setCustomValidity('Please enter a message.');
            valid = false;
        }

        if (!valid) {
            form.reportValidity(); // shows messages, does NOT clear inputs
            return;
        }

        // Mark as submitted then reload so page clears and shows thank-you on load
        sessionStorage.setItem('indiefind_form_submitted', 'true');
        location.reload();
    });

    /* --- Recommend a game form handling --- */
    const recommendForm = document.getElementById('recommendForm');
    const gameTitle = document.getElementById('gameTitle');
    const gameDesc = document.getElementById('gameDesc');
    const foundOn = document.getElementById('foundOn');
    const recommendSubmit = document.getElementById('recommendSubmit');

    // Immediate validation for recommend form fields
    gameTitle.addEventListener('input', () => {
        if (!gameTitle.value.trim()) {
            gameTitle.setCustomValidity('Please enter the game title.');
        } else {
            gameTitle.setCustomValidity('');
        }
    });

    gameDesc.addEventListener('input', () => {
        const v = gameDesc.value.trim();
        if (!v) {
            gameDesc.setCustomValidity('Please enter a brief description.');
        } else if (v.length > 200) {
            gameDesc.setCustomValidity('Description must be 200 characters or fewer.');
        } else {
            gameDesc.setCustomValidity('');
        }
    });

    foundOn.addEventListener('change', () => {
        if (!foundOn.value) {
            foundOn.setCustomValidity('Please select where you found the game.');
        } else {
            foundOn.setCustomValidity('');
        }
    });

    // Ensure clicking the Recommend button shows the popup if anything is missing
    recommendSubmit.addEventListener('click', () => {
        if (!gameTitle.value.trim() || !gameDesc.value.trim() || gameDesc.value.trim().length > 200 || !foundOn.value) {
            recommendForm.reportValidity();
        }
    });

    recommendForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset validity
        gameTitle.setCustomValidity('');
        gameDesc.setCustomValidity('');
        foundOn.setCustomValidity('');

        let validRec = true;

        const titleVal = gameTitle.value.trim();
        const descVal = gameDesc.value.trim();
        const foundVal = foundOn.value;

        if (!titleVal) {
            gameTitle.setCustomValidity('Please enter the game title.');
            validRec = false;
        }

        if (!descVal) {
            gameDesc.setCustomValidity('Please enter a brief description.');
            validRec = false;
        } else if (descVal.length > 200) {
            gameDesc.setCustomValidity('Description must be 200 characters or fewer.');
            validRec = false;
        }

        if (!foundVal) {
            foundOn.setCustomValidity('Please select where you found the game.');
            validRec = false;
        }

        if (!validRec) {
            recommendForm.reportValidity();
            return;
        }

        // Mark as submitted then reload so page clears and shows thank-you on load
        sessionStorage.setItem('indiefind_form_submitted', 'true');
        location.reload();
    });
});