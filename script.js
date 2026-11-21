
/* =====================================================
   NIBISHAKA DENYS - PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Open and close mobile menu
menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    document.body.classList.toggle("menu-open", isOpen);
});

// Close mobile menu after clicking a navigation link
navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

    });

});

// Close menu when clicking outside it
document.addEventListener("click", (event) => {

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
    }

});

// Close menu with Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

        menuToggle.focus();
    }

});


/* ================= DARK / LIGHT THEME ================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("portfolio-theme");

// Load saved theme
if (savedTheme === "light") {

    document.body.classList.add("light-theme");

}

// Update the theme button icon and accessibility label
function updateThemeButton() {

    const isLight = document.body.classList.contains("light-theme");

    themeIcon.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    themeToggle.title = isLight ? "Dark mode" : "Light mode";
}

updateThemeButton();

// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", currentTheme);

    updateThemeButton();

});


/* ================= COPY EMAIL ================= */

const copyEmailButton = document.getElementById("copyEmail");

const myEmail = "nibishakadenys935@gmail.com";

copyEmailButton.addEventListener("click", async () => {

    try {

        // Copy email to clipboard
        await navigator.clipboard.writeText(myEmail);

        copyEmailButton.textContent = "Copied! ✓";

        // Restore original text after 2 seconds
        setTimeout(() => {

            copyEmailButton.textContent = "Copy Email";

        }, 2000);

    } catch (error) {

        // Fallback for browsers without Clipboard API support
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = myEmail;

        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);

        temporaryInput.select();

        try {

            const successful = document.execCommand("copy");

            if (!successful) {
                throw new Error("Copy command failed");
            }

            copyEmailButton.textContent = "Copied! ✓";

            setTimeout(() => {
                copyEmailButton.textContent = "Copy Email";
            }, 2000);

        } catch (fallbackError) {

            copyEmailButton.textContent = "Copy failed";

            setTimeout(() => {
                copyEmailButton.textContent = "Copy Email";
            }, 2000);

        } finally {

            temporaryInput.remove();

        }

    }

});


/* ================= CONTACT FORM VALIDATION ================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formStatus = document.getElementById("formStatus");


// Display field error
function showError(input, errorElement, message) {

    input.classList.add("invalid");

    input.setAttribute("aria-invalid", "true");

    errorElement.textContent = message;

}


// Clear field error
function clearError(input, errorElement) {

    input.classList.remove("invalid");

    input.removeAttribute("aria-invalid");

    errorElement.textContent = "";

}


// Validate email format
function isValidEmail(email) {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailPattern.test(email);

}


// Validate a single field
function validateField(input) {

    const value = input.value.trim();

    if (input === nameInput) {

        if (!value) {

            showError(
                nameInput,
                nameError,
                "Please enter your name."
            );

            return false;

        }

        clearError(nameInput, nameError);

    }


    if (input === emailInput) {

        if (!value) {

            showError(
                emailInput,
                emailError,
                "Please enter your email address."
            );

            return false;

        }

        if (!isValidEmail(value)) {

            showError(
                emailInput,
                emailError,
                "Please enter a valid email address."
            );

            return false;

        }

        clearError(emailInput, emailError);

    }


    if (input === messageInput) {

        if (!value) {

            showError(
                messageInput,
                messageError,
                "Please enter your message."
            );

            return false;

        }

        if (value.length < 10) {

            showError(
                messageInput,
                messageError,
                "Message must contain at least 10 characters."
            );

            return false;

        }

        clearError(messageInput, messageError);

    }

    return true;

}


// Clear errors as the user types
[nameInput, emailInput, messageInput].forEach(input => {

    input.addEventListener("input", () => {

        validateField(input);

        formStatus.textContent = "";

        formStatus.className = "form-status";

    });

});


// Handle form submission
contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    formStatus.textContent = "";

    formStatus.className = "form-status";

    // Validate all fields
    const isNameValid = validateField(nameInput);

    const isEmailValid = validateField(emailInput);

    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {

        formStatus.textContent = "Please correct the errors above.";

        formStatus.classList.add("error");

        // Focus the first invalid field
        const firstInvalid = [nameInput, emailInput, messageInput]
            .find(input => input.classList.contains("invalid"));

        firstInvalid.focus();

        return;

    }

    // Display success confirmation
    formStatus.textContent =
        "Your message has been validated successfully! Connect this form to a backend to send it.";

    formStatus.classList.add("success");

    // Clear form fields
    contactForm.reset();

    // Clear validation states
    [nameInput, emailInput, messageInput].forEach(input => {

        input.classList.remove("invalid");

        input.removeAttribute("aria-invalid");

    });

    [nameError, emailError, messageError].forEach(error => {

        error.textContent = "";

    });

});


/* ================= SCROLL REVEAL ================= */

// Find all elements with the reveal class
const revealElements = document.querySelectorAll(".reveal");


// Use IntersectionObserver for efficient animations
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Stop observing after the animation
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    // Fallback for older browsers
    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const pageSections = document.querySelectorAll("main section[id]");


// Observe sections and update active navigation link
if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentSection}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    pageSections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();


/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Nibishaka Denys Portfolio Loaded Successfully!");

});
