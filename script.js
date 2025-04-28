// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Slideshow elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Other interactive elements
    const themeToggle = document.querySelector('.theme-toggle');
    const profileName = document.querySelector('.profile-name');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Slideshow functionality
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    // Auto-advance slideshow every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Form validation
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameMessage = nameInput.nextElementSibling;
        
        if (nameValue === '') {
            nameMessage.textContent = 'Name is required';
            return false;
        } else {
            nameMessage.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailMessage = emailInput.nextElementSibling;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            emailMessage.textContent = 'Email is required';
            return false;
        } else if (!emailPattern.test(emailValue)) {
            emailMessage.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailMessage.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const passwordValue = passwordInput.value;
        const passwordMessage = passwordInput.nextElementSibling;
        
        if (passwordValue === '') {
            passwordMessage.textContent = 'Password is required';
            return false;
        } else if (passwordValue.length < 8) {
            passwordMessage.textContent = 'Password must be at least 8 characters long';
            return false;
        } else {
            passwordMessage.textContent = '';
            return true;
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.textContent = 'Light Theme';
        } else {
            themeToggle.textContent = 'Dark Theme';
        }
    });
    
    // Accordion functionality
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });
    
    // Keyboard event handling
    document.addEventListener('keydown', function(event) {
        if (event.key === 'k' || event.key === 'K') {
            alert('Keyboard shortcut activated! 🎉');
        }
    });
    
    // Secret double-click action
    profileName.addEventListener('dblclick', function() {
        this.textContent = 'You found the secret! 🎉';
        this.classList.add('bounce-animation');
        
        setTimeout(() => {
            this.classList.remove('bounce-animation');
            setTimeout(() => {
                this.textContent = 'Interactive Profile';
            }, 2000);
        }, 500);
    });
    
    // Secret long press action
    let pressTimer;
    
    profileName.addEventListener('mousedown', function() {
        pressTimer = window.setTimeout(function() {
            profileName.style.color = getRandomColor();
        }, 1000); // Long press for 1 second
    });
    
    profileName.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    // Helper function for random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});