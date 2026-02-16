/* JS code for the contact page of the indiefind project */

document.addEventListener('DOMContentLoaded', () => {
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

        // All fields valid — open user's mail client with prefilled content
        const recipient = 'braebrae04@icloud.com';
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

        // Trigger mail client
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Do not clear fields here so user data is preserved even after mail client opens
        submitBtn.disabled = true;
        setTimeout(() => submitBtn.disabled = false, 1000);
    });
});