// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(filterBtn => {
                    filterBtn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                    
                    // Add animation for visible items
                    setTimeout(() => {
                        if (item.style.display === 'block') {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }
                    }, 300);
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;
    
    if (testimonialItems.length > 1) {
        // Create navigation dots
        const testimonialSlider = document.querySelector('.testimonial-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('testimonial-dots');
        
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        testimonialSlider.appendChild(dotsContainer);
        
        // Create prev/next buttons
        const prevBtn = document.createElement('button');
        prevBtn.classList.add('testimonial-nav', 'prev-btn');
        prevBtn.innerHTML = '&lt;';
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('testimonial-nav', 'next-btn');
        nextBtn.innerHTML = '&gt;';
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
        
        testimonialSlider.appendChild(prevBtn);
        testimonialSlider.appendChild(nextBtn);
        
        // Auto-rotate testimonials
        setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
        
        // Show testimonial function
        function showTestimonial(index) {
            // Handle index out of bounds
            if (index < 0) {
                index = testimonialItems.length - 1;
            } else if (index >= testimonialItems.length) {
                index = 0;
            }
            
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.style.display = 'none';
                item.style.opacity = '0';
            });
            
            // Show current testimonial
            testimonialItems[index].style.display = 'block';
            setTimeout(() => {
                testimonialItems[index].style.opacity = '1';
            }, 50);
            
            // Update dots
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentTestimonial = index;
        }
    }
    
    // Animate skill bars on scroll
    const skillSections = document.querySelector('.skills-container');
    if (skillSections) {
        const skillBars = document.querySelectorAll('.skill-progress');
        let animated = false;
        
        window.addEventListener('scroll', function() {
            if (skillSections && isInViewport(skillSections) && !animated) {
                skillBars.forEach(bar => {
                    const value = bar.getAttribute('data-value');
                    bar.style.width = value + '%';
                });
                animated = true;
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Typing effect for hero section
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        typingElement.style.width = '0';
        setTimeout(() => {
            typingElement.style.width = '100%';
        }, 500);
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Simple validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() === '') {
                    isValid = false;
                    showError(emailInput, 'Please enter your email');
                } else if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    showError(emailInput, 'Please enter a valid email');
                } else {
                    removeError(emailInput);
                }
            }
            
            if (messageInput && messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Here you would normally send the form data to a server
                const formData = new FormData(contactForm);
                
                // For demo purposes, just show a success message
                contactForm.innerHTML = '<div class="form-success"><h3>Thank you!</h3><p>Your message has been sent successfully.</p></div>';
            }
        });
        
        function showError(input, message) {
            const formGroup = input.parentElement;
            let errorElement = formGroup.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            input.style.borderColor = 'var(--danger-color)';
        }
        
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            input.style.borderColor = '';
        }
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value)) {
                    emailInput.style.borderColor = 'var(--danger-color)';
                    return;
                }
                
                // Here you would normally send the email to a server
                
                // For demo purposes, show a success message
                const parentElement = newsletterForm.parentElement;
                newsletterForm.remove();
                
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = '<p>Thank you for subscribing to our newsletter!</p>';
                parentElement.appendChild(successMessage);
            }
        });
    }
    
    // Animation on scroll for various elements
    const animatedElements = document.querySelectorAll('.service-card, .about-content, .portfolio-item, .contact-content');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        function animateOnScroll() {
            animatedElements.forEach(element => {
                if (isInViewport(element)) {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
        }
        
        // Initial check on page load
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector select');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            // In a real-world scenario, you would change the language here
            // For demo purposes, just reload the page
            const selectedLanguage = this.value;
            console.log(`Language changed to: ${selectedLanguage}`);
            
            // You could use this to set a cookie or localStorage value for language preference
            localStorage.setItem('preferredLanguage', selectedLanguage);
            
            // Reload page with language parameter
            // window.location.href = `?lang=${selectedLanguage}`;
        });
    }
});

// Add additional CSS for JS-created elements
const style = document.createElement('style');
style.textContent = `
    .testimonial-dots {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        gap: 0.5rem;
    }
    
    .testimonial-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ddd;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .testimonial-dot.active {
        background-color: var(--primary-color);
    }
    
    .testimonial-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--box-shadow);
        transition: var(--transition);
    }
    
    .testimonial-nav:hover {
        background-color: var(--secondary-color);
    }
    
    .prev-btn {
        left: -20px;
    }
    
    .next-btn {
        right: -20px;
    }
    
    .testimonial-item {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .error-message {
        color: var(--danger-color);
        font-size: 0.85rem;
        margin-top: 0.5rem;
    }
    
    .form-success {
        text-align: center;
        padding: 2rem;
    }
    
    .form-success h3 {
        color: var(--success-color);
        margin-bottom: 1rem;
    }
    
    .newsletter-success {
        color: var(--success-color);
        text-align: center;
        margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
        .testimonial-nav {
            width: 35px;
            height: 35px;
            font-size: 1rem;
        }
        
        .prev-btn {
            left: 0;
        }
        
        .next-btn {
            right: 0;
        }
    }
`;

document.head.appendChild(style);