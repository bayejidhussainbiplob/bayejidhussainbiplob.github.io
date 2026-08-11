// ============================================================
// MAIN SCRIPT
// ============================================================

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader (Removed) ---
    // Ensure we start at the top on load
    window.scrollTo(0, 0);
    if(window.location.hash !== '') {
        window.history.replaceState(null, null, ' ');
    }
    
    // Call reveal immediately
    setTimeout(reveal, 50);

    // --- Navigation & Hamburger ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- Smooth Scrolling for all Hash Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Offset for the sticky navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // --- Sticky Navbar & Scroll Spy ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
        
        // Trigger reveal animations on scroll
        reveal();
    });

    // --- Scroll Reveal Animation ---
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // when to trigger

        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
                
                // If it's the about section, trigger counters
                if(reveals[i].id === 'about' && typeof animateCounters === 'function') {
                    animateCounters();
                }
                // If it's experience, trigger that counter
                if(reveals[i].id === 'experience' && typeof animateCounters === 'function') {
                    animateCounters();
                }
            }
        }
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation
            if(!name || !email || !subject || !message) {
                formMessage.textContent = 'Please fill out all fields.';
                formMessage.className = 'form-message error';
                return;
            }

            // Since it's static Github pages, we'll format a mailto link
            // OR simulate success if they want to integrate Formspree later
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                // Simulate form submission success
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Real fallback: open mail client
                const mailtoLink = `mailto:halalstep@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
                window.location.href = mailtoLink;
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

});
