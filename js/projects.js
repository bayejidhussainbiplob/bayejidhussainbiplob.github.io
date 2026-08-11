// ============================================================
// PROJECTS, SKILLS & MODALS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Populate Skills ---
    const skillsData = [
        // Marketing
        { name: "Digital Marketing", category: "marketing", icon: "fa-solid fa-bullhorn", desc: "Strategy & Execution" },
        { name: "Social Media Marketing", category: "marketing", icon: "fa-solid fa-share-nodes", desc: "Brand Building" },
        { name: "Facebook Ads", category: "marketing", icon: "fa-brands fa-facebook", desc: "250+ Campaigns" },
        { name: "SEO", category: "marketing", icon: "fa-solid fa-magnifying-glass", desc: "Search Optimization" },
        // AI
        { name: "Prompt Engineering", category: "ai", icon: "fa-solid fa-microchip", desc: "LLM Optimization" },
        { name: "AI Tools", category: "ai", icon: "fa-solid fa-robot", desc: "Productivity & Creation" },
        { name: "AI Solutions", category: "ai", icon: "fa-solid fa-brain", desc: "Workflow Automation" },
        // Frontend
        { name: "HTML5", category: "frontend", icon: "fa-brands fa-html5", desc: "Semantic Markup" },
        { name: "CSS3", category: "frontend", icon: "fa-brands fa-css3-alt", desc: "Responsive Design" },
        { name: "JavaScript", category: "frontend", icon: "fa-brands fa-js", desc: "Interactive Logic" },
        { name: "React.js", category: "frontend", icon: "fa-brands fa-react", desc: "Component UI" },
        { name: "Vue.js", category: "frontend", icon: "fa-brands fa-vuejs", desc: "Progressive Framework" },
        // Design & Tools
        { name: "Canva", category: "design", icon: "fa-solid fa-pen-nib", desc: "Social Graphics" },
        { name: "Node.js", category: "design", icon: "fa-brands fa-node-js", desc: "Backend Familiarity" },
        { name: "Git & GitHub", category: "design", icon: "fa-brands fa-github", desc: "Version Control" },
        { name: "UI Design", category: "design", icon: "fa-solid fa-layer-group", desc: "User Interfaces" }
    ];

    const skillsGrid = document.getElementById('skills-grid');
    const skillTabs = document.querySelectorAll('.skills-tabs .tab-btn');

    function renderSkills(filter) {
        if(!skillsGrid) return;
        skillsGrid.innerHTML = '';
        
        const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);
        
        filtered.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card glass-panel';
            card.innerHTML = `
                <i class="${skill.icon}"></i>
                <h4>${skill.name}</h4>
                <p>${skill.desc}</p>
            `;
            skillsGrid.appendChild(card);
        });
    }

    if(skillsGrid) {
        renderSkills('all');
        
        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSkills(tab.getAttribute('data-tab'));
            });
        });
    }


    // --- 2. Populate Projects & Filtering ---
    const projectsData = [
        {
            id: 1,
            title: "E-Commerce Facebook Ad Campaign",
            category: "ads",
            categoryLabel: "Advertising",
            img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Managed a highly successful Facebook advertising campaign for an e-commerce brand, generating a 300% ROAS and acquiring over 5,000 new leads in one month.",
            tech: ["Facebook Ads Manager", "Meta Pixel", "Canva", "Copywriting"],
            role: "Digital Advertiser",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 2,
            title: "Modern Business Website",
            category: "web",
            categoryLabel: "Web Development",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Developed a fully responsive, modern website for a local agency using HTML, CSS, and Vanilla JavaScript with advanced scroll animations.",
            tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            role: "Frontend Developer",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 3,
            title: "AI-Powered Content Strategy",
            category: "ai",
            categoryLabel: "AI Solutions",
            img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Created a comprehensive social media content calendar by leveraging advanced Prompt Engineering techniques with ChatGPT and Midjourney.",
            tech: ["Prompt Engineering", "ChatGPT", "Midjourney", "Content Strategy"],
            role: "AI Specialist",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 4,
            title: "Brand Identity Design",
            category: "design",
            categoryLabel: "Design",
            img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Designed complete brand identity including logo, social media kits, and advertising banners for a startup.",
            tech: ["Canva", "Graphic Design", "UI Design"],
            role: "Visual Designer",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 5,
            title: "Social Media Growth Campaign",
            category: "marketing",
            categoryLabel: "Digital Marketing",
            img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Grew an Instagram and TikTok account organically by 150% over 3 months using viral content strategies and precise audience targeting.",
            tech: ["Social Media Marketing", "TikTok", "Instagram", "Analytics"],
            role: "SMM Specialist",
            liveLink: "#",
            githubLink: "#"
        },
        {
            id: 6,
            title: "SEO & Traffic Optimization",
            category: "marketing",
            categoryLabel: "Digital Marketing",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            desc: "Implemented a comprehensive SEO strategy that increased organic website traffic by 200% and ranked multiple keywords on the first page of Google.",
            tech: ["SEO", "Google Analytics", "Keyword Research", "Content Optimization"],
            role: "SEO Specialist",
            liveLink: "#",
            githubLink: "#"
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    const projectFilters = document.querySelectorAll('.project-filters .filter-btn');

    function renderProjects(filter) {
        if(!projectsGrid) return;
        projectsGrid.innerHTML = '';
        
        const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
        
        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass-panel';
            card.innerHTML = `
                <div class="project-img">
                    <img src="${project.img}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <span class="project-btn"><i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${project.categoryLabel}</span>
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                </div>
            `;
            
            // Open Modal on click
            card.addEventListener('click', () => openProjectModal(project));
            
            projectsGrid.appendChild(card);
        });
    }

    if(projectsGrid) {
        renderProjects('all');
        
        projectFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                projectFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(btn.getAttribute('data-filter'));
            });
        });
    }


    // --- 3. Modals Logic (Projects & Certificates) ---
    const projectModal = document.getElementById('project-modal');
    const projectModalContent = document.getElementById('project-modal-content');
    
    const certModal = document.getElementById('cert-modal');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalImg = document.getElementById('cert-modal-img');
    
    const closeButtons = document.querySelectorAll('.modal-close');

    function openProjectModal(project) {
        if(!projectModalContent) return;
        
        projectModalContent.innerHTML = `
            <div class="project-modal-grid">
                <div>
                    <h2 style="font-size:2rem; margin-bottom: 10px;">${project.title}</h2>
                    <div class="project-modal-meta">
                        <span><i class="fa-solid fa-tag"></i> ${project.categoryLabel}</span>
                        <span><i class="fa-solid fa-user"></i> Role: ${project.role}</span>
                    </div>
                    <img src="${project.img}" alt="${project.title}" class="project-modal-img">
                </div>
                <div>
                    <h3 style="margin-bottom: 15px;">Project Overview</h3>
                    <p class="project-modal-desc">${project.desc}</p>
                    
                    <h3 style="margin-bottom: 15px;">Technologies Used</h3>
                    <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom: 30px;">
                        ${project.tech.map(t => `<span style="padding:5px 15px; border:1px solid var(--glass-border); border-radius:20px; font-size:0.9rem;">${t}</span>`).join('')}
                    </div>
                    
                    <div class="project-modal-links">
                        <a href="${project.liveLink}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-globe"></i> Live Demo</a>
                        ${project.githubLink !== '#' ? `<a href="${project.githubLink}" target="_blank" class="btn btn-outline"><i class="fa-brands fa-github"></i> Source Code</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Certificate Buttons
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certName = e.target.getAttribute('data-cert');
            const certImg = e.target.getAttribute('data-img');
            certModalTitle.textContent = certName;
            
            if (certImg) {
                certModalImg.src = certImg;
            } else {
                // Set dynamic placeholder image based on certificate name
                certModalImg.src = `https://via.placeholder.com/800x600/1e1e2f/ffffff?text=${encodeURIComponent(certName)}`;
            }
            
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modals
    function closeModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }

    closeButtons.forEach(btn => btn.addEventListener('click', closeModals));
    
    // Close on click outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) closeModals();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeModals();
    });

});
