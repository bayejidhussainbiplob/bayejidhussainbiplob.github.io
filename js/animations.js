// ============================================================
// ANIMATIONS (Typing, Counters, Sliders)
// ============================================================

// --- 1. Typing Effect for Hero ---
const titles = [
    "Digital Marketing Expert", 
    "AI Specialist", 
    "SMM Specialist", 
    "Frontend Web Developer",
    "Prompt Engineer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    if(!typingText) return;

    const currentTitle = titles[titleIndex];

    if(isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if(!isDeleting && charIndex === currentTitle.length) {
        // Pause at end
        typeSpeed = 2000;
        isDeleting = true;
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 2000);
});


// --- 2. Skill Slider Infinite Loop ---
const skills = [
    { name: "Digital Marketing", icon: "fa-solid fa-bullhorn" },
    { name: "AI", icon: "fa-solid fa-robot" },
    { name: "SMM", icon: "fa-solid fa-share-nodes" },
    { name: "Frontend Development", icon: "fa-solid fa-code" },
    { name: "Web Design", icon: "fa-solid fa-pen-nib" },
    { name: "Prompt Engineering", icon: "fa-solid fa-microchip" },
    { name: "Facebook Advertising", icon: "fa-brands fa-facebook" }
];

function initSkillSlider() {
    const track = document.getElementById('slide-track');
    if(!track) return;

    // Create a loop by doubling the skills
    const displaySkills = [...skills, ...skills];

    displaySkills.forEach(skill => {
        const slide = document.createElement('div');
        slide.className = 'slide-item';
        slide.innerHTML = `<i class="${skill.icon}"></i> <span>${skill.name}</span>`;
        track.appendChild(slide);
    });
}

document.addEventListener('DOMContentLoaded', initSkillSlider);


// --- 3. Animated Counters ---
let countersAnimated = false;

window.animateCounters = function() {
    if(countersAnimated) return;
    
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed * 4;

            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + "+";
            }
        };
        updateCount();
    });

    countersAnimated = true;
}


// --- 4. Testimonial Slider ---
document.addEventListener('DOMContentLoaded', () => {
    const reviews = [
        {
            name: "John Doe",
            role: "Business Owner",
            img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Bayejid transformed our social media presence. The ROI on the Facebook ad campaigns he managed was incredible.",
            stars: 5,
            service: "Facebook Advertising"
        },
        {
            name: "Sarah Smith",
            role: "CEO, TechStart",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Highly skilled frontend developer with a great eye for design. He delivered our website ahead of schedule and it looks fantastic.",
            stars: 5,
            service: "Frontend Web Development"
        },
        {
            name: "Michael Johnson",
            role: "Marketing Director",
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "His expertise in AI-assisted workflows saved our team countless hours. Very professional and creative solutions.",
            stars: 5,
            service: "AI Solutions"
        },
        {
            name: "Emily Chen",
            role: "E-commerce Manager",
            img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Working with Bayejid was a game changer for our brand. The digital marketing strategy was spot on and sales doubled.",
            stars: 5,
            service: "Digital Marketing"
        },
        {
            name: "David Wilson",
            role: "Startup Founder",
            img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            text: "Excellent UI/UX skills and solid frontend development. He built a stunning landing page that converts like crazy.",
            stars: 5,
            service: "Web Design"
        }
    ];

    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('review-dots');
    
    if(!track) return;

    // Build DOM
    const innerTrack = document.createElement('div');
    innerTrack.className = 'testimonial-track-inner';
    track.appendChild(innerTrack);

    reviews.forEach((review, index) => {
        // Card
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <img src="${review.img}" alt="${review.name}" class="client-img">
            <div class="stars">
                ${'<i class="fa-solid fa-star"></i>'.repeat(review.stars)}
            </div>
            <p class="review-text">"${review.text}"</p>
            <div class="client-info">
                <h4>${review.name}</h4>
                <p>${review.role}</p>
                <span class="text-accent" style="font-size:0.8rem; margin-top:5px; display:inline-block;">${review.service}</span>
            </div>
        `;
        innerTrack.appendChild(card);

        // Dot
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    const totalSlides = reviews.length;

    function goToSlide(index) {
        currentSlide = index;
        innerTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    document.getElementById('review-next')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    });

    document.getElementById('review-prev')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 2500);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(slideInterval));
    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 2500);
    });
});
