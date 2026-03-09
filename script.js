// Initialize EmailJS with your public key
(function() {
    emailjs.init({
        publicKey: "zTZ8McmgSZVKgxujq",
    });
})();

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

// Paystack Configuration
const PAYSTACK_PUBLIC_KEY = 'pk_live_49bf25182b74e52f2c21524d3cf2f6dbb4e014be';
const PAYMENT_CURRENCY = 'GHS';
const PAYMENT_REF_PREFIX = 'JWILS-PAY-LIVE';

// Get Payment Form Elements
const paymentForm = document.getElementById('paymentForm');
const paymentBtn = document.getElementById('paymentBtn');
const paymentMessage = document.getElementById('payment-message');

// Helper function to generate a unique reference
const generatePaymentRef = () => {
    return `${PAYMENT_REF_PREFIX}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Paystack Integration Function
function payWithPaystack(name, email, phone, amount, description) {
    // Convert amount to pesewas (multiply by 100)
    const amountInPesewas = amount * 100;
    const paymentReference = generatePaymentRef();

    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amountInPesewas,
        currency: PAYMENT_CURRENCY,
        ref: paymentReference,
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    variable_name: "full_name",
                    value: name
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone",
                    value: phone
                },
                {
                    display_name: "Description",
                    variable_name: "description",
                    value: description || "Payment"
                }
            ]
        },
        
        callback: function(response) {
            paymentMessage.classList.remove('text-danger');
            paymentMessage.classList.add('text-success');
            paymentMessage.innerHTML = `
                <p class="mb-1">✅ Thank you, ${name}! Your payment of GHS ${amount} is confirmed.</p>
                <p class="mb-0">Transaction Ref: ${response.reference}</p>
            `;
            
            paymentForm.reset();
            paymentForm.classList.remove('was-validated'); 
            paymentBtn.disabled = false;
            paymentBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Pay Now';
        },

        onClose: function() {
            paymentMessage.classList.remove('text-success');
            paymentMessage.classList.add('text-danger');
            paymentMessage.innerHTML = "Payment was cancelled. Please try again.";
            
            paymentBtn.disabled = false;
            paymentBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Pay Now';
        }
    });

    handler.openIframe();
}

// Handle Payment Form Submission
paymentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!paymentForm.checkValidity()) {
        paymentMessage.classList.add('text-danger');
        paymentMessage.innerHTML = 'Please fill out all required fields.';
        paymentForm.classList.add('was-validated');
        return;
    }

    const formData = new FormData(paymentForm);
    const name = formData.get('paymentName');
    const email = formData.get('paymentEmail');
    const phone = formData.get('paymentPhone');
    const amount = parseFloat(formData.get('paymentAmount'));
    const description = formData.get('paymentDescription');
    
    if (amount <= 0) {
        paymentMessage.classList.add('text-danger');
        paymentMessage.innerHTML = 'Please enter a valid amount.';
        return;
    }

    paymentBtn.disabled = true;
    paymentBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
    paymentMessage.innerHTML = '';
    
    payWithPaystack(name, email, phone, amount, description);
});

// Rotate photo-stack images every 10 seconds
(function() {
    const stack = document.querySelectorAll('.photo-stack img');
    if (stack.length === 0) return;
    const classes = ['center', 'left', 'right'];
    let order = [...classes];
    let intervalId;

    const rotate = () => {
        order.unshift(order.pop());
        stack.forEach((img, idx) => {
            img.className = order[idx];
        });
    };

    // Auto rotate every 10 seconds
    intervalId = setInterval(rotate, 10000);

    // Manual rotate on click/tap
    const stackContainer = document.querySelector('.photo-stack');
    if (stackContainer) {
        stackContainer.addEventListener('click', () => {
            clearInterval(intervalId); // Reset timer
            rotate();
            intervalId = setInterval(rotate, 10000); // Restart timer
        });
    }
})();