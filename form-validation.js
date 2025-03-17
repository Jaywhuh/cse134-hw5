document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const errorOutput = document.getElementById("error-message");
    const infoOutput = document.getElementById("info-message");
    let formErrors = []; // Stores errors before submission

    const touchedFields = {
        name: false,
        email: false,
        message: false
    };

    // Validate Name Field
    function validateName() {
        const namePattern = /^[a-zA-Z ,.'-]+$/;
        if (nameInput.validity.valueMissing) {
            logError("Name", "Name is required.");
            nameInput.setCustomValidity("Name is required.");
        } else if (!namePattern.test(nameInput.value)) {
            logError("Name", "Invalid character! Use only letters, spaces, commas, periods, apostrophes, and hyphens.");
            nameInput.setCustomValidity("Invalid character! Use only letters, spaces, commas, periods, apostrophes, and hyphens.");
        } else {
            nameInput.setCustomValidity(""); // Clear error
        }
    }

    // Validate Email Field
    function validateEmail() {
        if (emailInput.validity.valueMissing) {
            logError("Email", "Email is required.");
            emailInput.setCustomValidity("Email is required.");
        } else if (!emailInput.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            logError("Email", "Invalid email format. Example: user@example.com.");
            emailInput.setCustomValidity("Invalid email format. Example: user@example.com.");
        } else {
            emailInput.setCustomValidity(""); // Clear error when valid
        }
    }

    // Validate Message Field
    function validateMessage() {
        if (messageInput.validity.valueMissing) {
            logError("Message", "Message is required.");
            messageInput.setCustomValidity("Message is required.");
        } else if (messageInput.value.length > 500) {
            logError("Message", "Message exceeds 500 characters.");
            messageInput.setCustomValidity("Message exceeds 500 characters.");
        } else {
            messageInput.setCustomValidity("");
        }
    }

    // Track all errors during the session
    function logError(field, message) {
        // Add error only if it hasn't been recorded yet
        const errorExists = formErrors.some(err => err.field === field && err.message === message);
        if (!errorExists) {
            formErrors.push({ field, message });
        }
    }

    // Show Dynamic Error Messages
    function displayErrors() {
        let errorMessages = [];

        if (touchedFields.name) {
            validateName();
            if (!nameInput.checkValidity()) errorMessages.push(`• ${nameInput.validationMessage}`);
        }

        if (touchedFields.email) {
            validateEmail();
            if (!emailInput.checkValidity()) errorMessages.push(`• ${emailInput.validationMessage}`);
        }

        if (touchedFields.message) {
            validateMessage();
            if (!messageInput.checkValidity()) errorMessages.push(`• ${messageInput.validationMessage}`);
        }

        if (errorMessages.length > 0) {
            errorOutput.innerHTML = errorMessages.join("<br>");
            errorOutput.style.opacity = "1";

            // Ensure every message fades out after 2 seconds
            setTimeout(() => {
                errorOutput.style.opacity = "0"; 
            }, 2000);
        } else {
            errorOutput.textContent = "";
        }
    }

    // Prevent Invalid Characters (Input Masking)
    nameInput.addEventListener("keypress", function (event) {
        const allowedPattern = /^[a-zA-Z ,.'-]+$/;
        const char = String.fromCharCode(event.keyCode);
        if (!allowedPattern.test(char)) {
            event.preventDefault(); // Block invalid character
            logError("Name", "Invalid character entered.");
            showTemporaryError("Invalid character entered.");
            flashInput(nameInput);
        }
    });

    // Character Countdown for Message Field
    messageInput.addEventListener("input", function () {
        let remaining = 500 - messageInput.value.length;
        infoOutput.textContent = `Characters remaining: ${remaining}`;

        if (remaining <= 50) {
            infoOutput.style.color = "orange";
        } else {
            infoOutput.style.color = "lightblue";
        }
    });

    // Show Error Message Temporarily
    function showTemporaryError(message) {
        errorOutput.textContent = message;
        errorOutput.style.opacity = "1";

        const currentMessage = message;

        setTimeout(() => {
            if (errorOutput.textContent === currentMessage) { // Only fade if no new errors were added
                errorOutput.style.opacity = "0";
            }
        }, 3000);
    }

    // Flash Input Field on Invalid Entry
    function flashInput(input) {
        input.style.borderColor = "red";
        setTimeout(() => {
            input.style.borderColor = "";
        }, 500);
    }

    // Track user interaction with fields
    nameInput.addEventListener("input", function () {
        touchedFields.name = true;
        displayErrors();
    });

    emailInput.addEventListener("input", function () {
        touchedFields.email = true;
        displayErrors();
    });

    messageInput.addEventListener("input", function () {
        touchedFields.message = true;
        displayErrors();
    });

    // Capture All Past Errors and Store in `form-errors`
    form.addEventListener("submit", function (event) {
        displayErrors(); // Ensure errors are updated before submission

        // Create or find the hidden input field for form-errors
        let errorField = document.querySelector("input[name='form-errors']");
        if (!errorField) {
            errorField = document.createElement("input");
            errorField.type = "hidden";
            errorField.name = "form-errors";
            form.appendChild(errorField);
        }

        // Store all past errors in the hidden input field
        errorField.value = JSON.stringify(formErrors);

        // Prevent submission if current errors exist
        if (!form.checkValidity()) {
            event.preventDefault();
        }
    });

});
