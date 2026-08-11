// ============================================================
// SETTINGS (Theme & Colors)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const themeDark = document.getElementById('theme-dark');
    const themeLight = document.getElementById('theme-light');
    const colorOptionsContainer = document.getElementById('color-options');
    const animationToggle = document.getElementById('animation-toggle');

    // Define Colors
    const colors = [
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#8b5cf6' },
        { name: 'Green', value: '#10b981' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Orange', value: '#f59e0b' },
        { name: 'Red', value: '#ef4444' }
    ];

    // 1. Toggle Panel
    if(settingsToggle && settingsPanel) {
        settingsToggle.addEventListener('click', () => {
            settingsPanel.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if(!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
                settingsPanel.classList.remove('open');
            }
        });
    }

    // 2. Theme Switching
    const currentTheme = localStorage.getItem('bhb-theme') || 'dark';
    
    function setTheme(theme) {
        if(theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            themeLight.classList.add('active');
            themeDark.classList.remove('active');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeDark.classList.add('active');
            themeLight.classList.remove('active');
        }
        localStorage.setItem('bhb-theme', theme);
    }

    // Initialize Theme
    setTheme(currentTheme);

    if(themeDark && themeLight) {
        themeDark.addEventListener('click', () => setTheme('dark'));
        themeLight.addEventListener('click', () => setTheme('light'));
    }

    // 3. Color Switching
    const currentColor = localStorage.getItem('bhb-color') || '#3b82f6';

    function setAccentColor(colorHex) {
        document.documentElement.style.setProperty('--accent-primary', colorHex);
        
        // Calculate RGB for glow
        // Very basic conversion just for visual effect
        let glow = `rgba(59, 130, 246, 0.3)`; // fallback blue
        if(colorHex === '#8b5cf6') glow = `rgba(139, 92, 246, 0.3)`;
        if(colorHex === '#10b981') glow = `rgba(16, 185, 129, 0.3)`;
        if(colorHex === '#ec4899') glow = `rgba(236, 72, 153, 0.3)`;
        if(colorHex === '#f59e0b') glow = `rgba(245, 158, 11, 0.3)`;
        if(colorHex === '#ef4444') glow = `rgba(239, 68, 68, 0.3)`;
        
        document.documentElement.style.setProperty('--accent-glow', glow);
        localStorage.setItem('bhb-color', colorHex);
        
        // Update active dot
        document.querySelectorAll('.color-dot').forEach(dot => {
            dot.classList.remove('active');
            if(dot.dataset.color === colorHex) dot.classList.add('active');
        });
    }

    // Generate Color Dots
    if(colorOptionsContainer) {
        colors.forEach(color => {
            const dot = document.createElement('div');
            dot.className = `color-dot ${color.value === currentColor ? 'active' : ''}`;
            dot.style.backgroundColor = color.value;
            dot.dataset.color = color.value;
            dot.title = color.name;
            
            dot.addEventListener('click', () => setAccentColor(color.value));
            colorOptionsContainer.appendChild(dot);
        });
        
        // Initialize Color
        setAccentColor(currentColor);
    }

    // 4. Animations Toggle
    const animState = localStorage.getItem('bhb-animations');
    const isAnimOn = animState === null ? true : animState === 'true';

    function setAnimations(isOn) {
        if(!isOn) {
            // We use a trick to disable animations globally via CSS
            const style = document.createElement('style');
            style.id = 'disable-animations';
            style.innerHTML = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            const style = document.getElementById('disable-animations');
            if(style) style.remove();
        }
        
        if(animationToggle) animationToggle.checked = isOn;
        localStorage.setItem('bhb-animations', isOn);
    }

    // Initialize Animations
    setAnimations(isAnimOn);

    if(animationToggle) {
        animationToggle.addEventListener('change', (e) => {
            setAnimations(e.target.checked);
        });
    }

});
