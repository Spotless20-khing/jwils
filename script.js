// ==================== INIT ====================
new WOW().init();

const WHATSAPP_NUMBER = '233500860750';

function sendToWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ==================== HEADER SCROLL ====================
(function () {
    const header = document.getElementById('main-header');
    if (!header) return;

    function handleScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
})();

// ==================== MOBILE NAV ====================
(function () {
    const toggle   = document.getElementById('navToggle');
    const overlay  = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileNavClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    if (!toggle || !overlay) return;

    function openNav()  { overlay.classList.add('open');  document.body.style.overflow = 'hidden'; }
    function closeNav() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

    toggle.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeNav();
    });
    mobileLinks.forEach(link => link.addEventListener('click', closeNav));
})();

// ==================== EVENT COUNTDOWN (mini, on main site) ====================
(function () {
    const eventDate = new Date('May 2, 2026 08:00:00').getTime();

    const evDays  = document.getElementById('evDays');
    const evHours = document.getElementById('evHours');
    const evMins  = document.getElementById('evMins');

    if (!evDays) return;

    function tick() {
        const diff = eventDate - Date.now();
        if (diff <= 0) {
            evDays.textContent = '0';
            evHours.textContent = '0';
            evMins.textContent = '0';
            return;
        }
        evDays.textContent  = Math.floor(diff / 86400000);
        evHours.textContent = Math.floor((diff % 86400000) / 3600000);
        evMins.textContent  = Math.floor((diff % 3600000) / 60000);
    }

    tick();
    setInterval(tick, 60000);
})();

// ==================== CONTACT FORM ====================
(function () {
    const form       = document.getElementById('contactForm');
    if (!form) return;

    const formMsg  = document.getElementById('form-message');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            formMsg.innerHTML = '<span class="text-warning">Please complete all required fields.</span>';
            setTimeout(() => { formMsg.innerHTML = ''; }, 5000);
            return;
        }

        const original = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';

        const name    = document.getElementById('name').value;
        const phone   = document.getElementById('phone').value;
        const email   = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;

        const waMsg = `*New Contact Form Submission*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;

        setTimeout(() => {
            sendToWhatsApp(waMsg);
            formMsg.innerHTML = '<span class="text-success">Opening WhatsApp…</span>';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = original;
            setTimeout(() => { formMsg.innerHTML = ''; }, 5000);
        }, 500);
    });
})();

// ==================== PAYMENT FORM ====================
(function () {
    const form = document.getElementById('paymentForm');
    if (!form) return;

    const payMsg = document.getElementById('payment-message');
    const payBtn = document.getElementById('paymentBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            payMsg.innerHTML = '<span class="text-danger">Please fill out all required fields.</span>';
            return;
        }

        const name   = document.getElementById('paymentName').value;
        const email  = document.getElementById('paymentEmail').value;
        const phone  = document.getElementById('paymentPhone').value;
        const amount = document.getElementById('paymentAmount').value;
        const desc   = document.getElementById('paymentDescription').value || 'Payment';

        const original = payBtn.innerHTML;
        payBtn.disabled = true;
        payBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';

        const waMsg = `*New Payment Request*\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAmount: GHS ${amount}\nDescription: ${desc}\n\nPlease confirm payment after sending.`;

        setTimeout(() => {
            sendToWhatsApp(waMsg);
            payMsg.innerHTML = '<span class="text-success">Opening WhatsApp to complete payment…</span>';
            form.reset();
            payBtn.disabled = false;
            payBtn.innerHTML = original;
        }, 500);
    });
})();