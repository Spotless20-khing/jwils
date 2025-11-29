// Initialize EmailJS with your public key
(function() {
    emailjs.init({
        publicKey: "zTZ8McmgSZVKgxujq",
    });
})();

const header = document.getElementById('main-header');
const scrollThreshold = 100; // Distance in pixels before header becomes solid

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Get the form, message div, and submit button
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submitBtn');

// Add an event listener for form submission
contactForm.addEventListener('submit', function(event) {
    // Stop the page from reloading.
    event.preventDefault();

    // Validate form
    if (!contactForm.checkValidity()) {
        formMessage.innerHTML = '<span class="text-warning">Please complete all required fields.</span>';
        autoClearMessage();
        return;
    }

    // Show loading spinner
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';
    formMessage.innerHTML = '';

    const serviceID = "service_836ws6e";
    const contactTemplateID = "template_z2h7iir";
    const replyTemplateID = "template_2e4lhnj";

    // Send both the contact email and the auto-reply email
    Promise.all([
            emailjs.sendForm(serviceID, contactTemplateID, this),
            emailjs.sendForm(serviceID, replyTemplateID, this)
        ])
        .then(() => {
            formMessage.innerHTML = '<span class="text-success">Message sent successfully!</span>';
            contactForm.reset();
            autoClearMessage();
        })
        .catch((error) => {
            formMessage.innerHTML = `<span class="text-danger">Error: ${error.text || "Please try again."}</span>`;
            console.error('EmailJS Error:', error);
            autoClearMessage();
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
});

// Helper function to auto-hide the form message
function autoClearMessage() {
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000); // clears after 5 seconds
}