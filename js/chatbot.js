// ============================================================
// AI CHATBOT LOGIC
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-text');
    const chatbotSend = document.getElementById('chatbot-send');

    // Bot Knowledge Base
    const knowledgeBase = {
        greetings: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon', 'hola', 'ki obostha', 'kemon acho'],
        skills: ['skill', 'skills', 'technologies', 'stack', 'tech', 'expert', 'tools'],
        services: ['what can you do', 'what do you do', 'service', 'services', 'kaj', 'ki kaj koro', 'offer', 'kaj korte paro'],
        experience: ['experience', 'work', 'projects', 'clients', 'how many clients', 'portfolio'],
        contact: ['contact', 'email', 'phone', 'hire', 'call', 'reach', 'number', 'whatsapp', 'jogajog'],
        about: ['about', 'who are you', 'bayejid', 'biplob', 'yourself', 'background', 'intro', 'porichoy']
    };

    const responses = {
        greetings: "Hello there! 😊 I'm <strong class='text-accent'>Bayejid's AI Assistant</strong>. How are you doing today? Let me know how I can help you!",
        skills: "Bayejid is highly skilled in <strong class='text-accent'>Frontend Web Development</strong> (HTML, CSS, JS, React) and is an expert in <strong class='text-accent'>Digital Marketing, SEO, and AI Tools</strong>. Are you looking for a specific skill?",
        services: "Bayejid provides a variety of premium services! 🚀 These include:<br><br><strong class='text-accent'>1. Digital Marketing & Social Media Marketing</strong><br><strong class='text-accent'>2. Facebook Advertising</strong><br><strong class='text-accent'>3. AI Solutions & Prompt Engineering</strong><br><strong class='text-accent'>4. Web Design & Frontend Development</strong><br><strong class='text-accent'>5. Graphic Design & SEO</strong><br><br>Which of these services are you interested in?",
        experience: "Bayejid has successfully delivered projects for over <strong class='text-accent'>100+ clients</strong> locally and globally. He has solid practical experience managing <strong class='text-accent'>250+ Facebook Ad campaigns</strong> and building beautiful web interfaces.",
        contact: "You can easily reach Bayejid directly via <strong class='text-accent'>Email (halalstep@gmail.com)</strong> or <strong class='text-accent'>WhatsApp (+8801615907617)</strong>. You can also use the Contact form at the bottom of the page! 📬",
        about: "<strong class='text-accent'>Bayejid Hossain Biplob</strong> is the Founder of HalalStep and Owner of BHB SHOP. He is a passionate Digital Marketing Expert, AI Specialist, and Frontend Web Developer from <strong class='text-accent'>Bangladesh</strong>. 🇧🇩",
        default: "That's a very interesting question! 🤔 As an AI, I am still learning about some specific details. I highly recommend sending Bayejid a direct message using the <strong class='text-accent'>Contact form</strong> or <strong class='text-accent'>WhatsApp</strong>, he would love to chat with you!"
    };

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotPanel.classList.add('active');
        chatbotInput.focus();
    });

    chatbotClose.addEventListener('click', () => {
        chatbotPanel.classList.remove('active');
    });

    // Send Message
    function sendMessage() {
        const text = chatbotInput.value.trim();
        if (!text) return;

        // 1. Add User Message
        appendMessage(text, 'user-message');
        chatbotInput.value = '';

        // 2. Show Typing Indicator
        showTypingIndicator();

        // 3. Process and Respond
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateResponse(text);
            appendMessage(response, 'bot-message');
        }, 1000 + Math.random() * 1000); // 1-2s delay for realism
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-box';
        typingDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingBox = chatbotMessages.querySelector('.typing-box');
        if (typingBox) {
            typingBox.remove();
        }
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function generateResponse(text) {
        const lowerText = text.toLowerCase();
        
        // Simple NLP Matching
        const isMatch = (words) => words.some(word => lowerText.includes(word));
        
        if (isMatch(knowledgeBase.greetings)) return responses.greetings;
        if (isMatch(knowledgeBase.services)) return responses.services;
        if (isMatch(knowledgeBase.skills)) return responses.skills;
        if (isMatch(knowledgeBase.experience)) return responses.experience;
        if (isMatch(knowledgeBase.contact)) return responses.contact;
        if (isMatch(knowledgeBase.about)) return responses.about;
        
        return responses.default;
    }
});
