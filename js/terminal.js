// ============================================================
// INTERACTIVE TERMINAL
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termBody = document.getElementById('terminal-body');

    if(!termInput || !termOutput) return;

    const portfolioData = {
        name: "Bayejid Hossain Biplob",
        titles: [
            "Digital Marketing Expert",
            "AI Specialist",
            "SMM Specialist",
            "Frontend Web Developer"
        ],
        contact: "halalstep@gmail.com",
        phone: "01615907617"
    };

    const commands = {
        help: `
            Available commands:
            <br><span class="term-highlight">whoami</span>       - Display profile summary
            <br><span class="term-highlight">about</span>        - View short biography
            <br><span class="term-highlight">skills</span>       - List technical skills
            <br><span class="term-highlight">education</span>    - View academic background
            <br><span class="term-highlight">experience</span>   - View professional experience
            <br><span class="term-highlight">services</span>     - List of services offered
            <br><span class="term-highlight">projects</span>     - View recent work
            <br><span class="term-highlight">certificates</span> - List of training and certificates
            <br><span class="term-highlight">achievements</span> - Key statistics and results
            <br><span class="term-highlight">contact</span>      - Get contact details
            <br><span class="term-highlight">social</span>       - View social media links
            <br><span class="term-highlight">clear</span>        - Clear terminal screen
        `,
        whoami: `
            <span class="term-success">${portfolioData.name}</span><br>
            ${portfolioData.titles.map(t => `<span class="term-info">>>></span> ${t}`).join('<br>')}
        `,
        about: `
            I specialize in digital marketing, social media marketing, Facebook advertising, AI-powered solutions, prompt engineering, web design, and frontend development.
        `,
        skills: `
            <span class="term-highlight">[Marketing]</span> Digital Marketing, Facebook Ads, SEO, SMM<br>
            <span class="term-highlight">[AI]</span> Prompt Engineering, AI Tools, AI Solutions<br>
            <span class="term-highlight">[Frontend]</span> HTML5, CSS3, JavaScript, React.js, Vue.js<br>
            <span class="term-highlight">[Design]</span> Graphic Design, Canva, UI Design
        `,
        education: `
            1. Alim (Currently Studying) - Lalmonirhat Nesaria Kamil Madrasa<br>
            2. Dakhil (2025) - Kisamat Harati DS Dakhil Madrasa
        `,
        experience: `
            - 250+ Facebook Ad Campaigns<br>
            - Social Media Marketing & Brand Promotion<br>
            - Web Design & Frontend Development<br>
            - Campaign Planning & Optimization
        `,
        services: `
            01. Digital Marketing<br>02. Social Media Marketing<br>03. Facebook Advertising<br>04. AI Solutions<br>05. Web Design & Development
        `,
        projects: `
            Check out the <b>Projects</b> section below or type <span class="term-highlight">nav projects</span> to scroll there.
        `,
        certificates: `
            - Digital Marketing (LEAD IT Institute)<br>
            - Digital Marketing (NSDA)<br>
            - Web Design & Development for Freelancing (NSDA / ASSET)
        `,
        achievements: `
            Clients: 100+<br>
            Projects: 160+<br>
            Facebook Ad Campaigns: 250+
        `,
        contact: `
            Email: <a href="mailto:${portfolioData.contact}" style="color:var(--accent-primary)">${portfolioData.contact}</a><br>
            WhatsApp/Phone: ${portfolioData.phone}
        `,
        social: `
            Facebook: fb.com/hm.bayejid.hussain.biplob<br>
            LinkedIn: linkedin.com/in/bhbiplob<br>
            GitHub: github.com/bayejidhussainbiplob
        `
    };

    termInput.addEventListener('keydown', function(e) {
        if(e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            this.value = '';
            
            // Print command
            const cmdElement = document.createElement('div');
            cmdElement.innerHTML = `<span class="prompt">bayejid@portfolio:~$</span> ${cmd}`;
            termOutput.appendChild(cmdElement);

            // Handle clear
            if(cmd === 'clear') {
                termOutput.innerHTML = '';
                return;
            }

            // Handle response
            const resElement = document.createElement('div');
            resElement.style.paddingLeft = '20px';
            resElement.style.marginBottom = '15px';
            
            if(cmd === '') {
                // do nothing
            } else if(commands[cmd]) {
                // Simple typewriter effect for the output
                resElement.innerHTML = commands[cmd];
            } else if(cmd.startsWith('nav ')) {
                const section = cmd.split(' ')[1];
                if(document.getElementById(section)) {
                    resElement.innerHTML = `<span class="term-success">Navigating to ${section}...</span>`;
                    window.location.href = '#' + section;
                } else {
                    resElement.innerHTML = `<span class="term-error">Error: Section '${section}' not found.</span>`;
                }
            } else {
                resElement.innerHTML = `<span class="term-error">Command not found: ${cmd}</span>. Type <span class="term-highlight">help</span> for a list of commands.`;
            }

            if(cmd !== '') termOutput.appendChild(resElement);
            
            // Scroll to bottom
            termBody.scrollTop = termBody.scrollHeight;
        }
    });

});
