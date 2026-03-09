// Initialize WOW.js for scroll animations
new WOW().init();

// WhatsApp Integration
const WHATSAPP_NUMBER = '233500860750';

// Helper function to send message to WhatsApp
function sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Countdown Timer
document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date('April 1, 2026 23:59:59').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Only update if elements exist
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
        
        // Also update countdown and pricing-countdown if they exist
        const countdownEl = document.getElementById('countdown');
        const pricingCountdownEl = document.getElementById('pricing-countdown');
        const displayTime = distance < 0 ? 'OFFER EXPIRED' : days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
        
        if (countdownEl) countdownEl.innerHTML = displayTime;
        if (pricingCountdownEl) pricingCountdownEl.innerHTML = displayTime;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Header scroll behavior - Fixed header scroll effect
(function() {
    const header = document.getElementById('main-header');
    
    // Guard clause - exit if header doesn't exist
    if (!header) return;
    
    const scrollThreshold = 100; // Distance in pixels before header becomes solid

    // Function to handle scroll
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also check on page load in case user refreshes mid-page
    handleScroll();
})();

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            formMessage.innerHTML = '<span class="text-warning">Please complete all required fields.</span>';
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...';

        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;

        // Send to WhatsApp
        setTimeout(() => {
            sendToWhatsApp(whatsappMessage);
            formMessage.innerHTML = '<span class="text-success">Opening WhatsApp...</span>';
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
        }, 500);
    });
}

// ==================== PAYMENT FORM ====================
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    const paymentBtn = document.getElementById('paymentBtn');
    const paymentMessage = document.getElementById('payment-message');

    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!paymentForm.checkValidity()) {
            paymentMessage.classList.add('text-danger');
            paymentMessage.innerHTML = 'Please fill out all required fields.';
            paymentForm.classList.add('was-validated');
            return;
        }

        // Get form data
        const name = document.getElementById('paymentName').value;
        const email = document.getElementById('paymentEmail').value;
        const phone = document.getElementById('paymentPhone').value;
        const amount = document.getElementById('paymentAmount').value;
        const description = document.getElementById('paymentDescription').value || 'Payment';

        // Create WhatsApp message with payment details
        const whatsappMessage = `*New Payment Request*\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAmount: GHS ${amount}\nDescription: ${description}\n\nPlease confirm payment after sending.`;

        // Show loading and redirect to WhatsApp
        paymentBtn.disabled = true;
        paymentBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
        
        setTimeout(() => {
            sendToWhatsApp(whatsappMessage);
            paymentMessage.classList.remove('text-danger');
            paymentMessage.classList.add('text-success');
            paymentMessage.innerHTML = '<p class="mb-1">Opening WhatsApp to complete payment...</p><p class="mb-0">Please send your payment to the account details provided.</p>';
            paymentForm.reset();
            paymentBtn.disabled = false;
            paymentBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Pay Now';
        }, 500);
    });
}

// ==================== REGISTRATION FORM ====================
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!registrationForm.checkValidity()) {
            formMessage.innerHTML = '<span class="text-warning">Please complete all required fields.</span>';
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Submitting...';

        // Get form data
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const business = document.getElementById('business').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message (Early Bird - GH¢850)
        const whatsappMessage = `*New Event Registration*\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nBusiness: ${business || 'N/A'}\nTicket: Early Bird - GH¢850\n\nMessage:\n${message || 'None'}\n\nPlease confirm your registration.`;

        // Send to WhatsApp
        setTimeout(() => {
            sendToWhatsApp(whatsappMessage);
            formMessage.innerHTML = '<span class="text-success">Opening WhatsApp to complete registration...</span>';
            registrationForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            setTimeout(() => { formMessage.innerHTML = ''; }, 5000);
        }, 500);
    });
}

