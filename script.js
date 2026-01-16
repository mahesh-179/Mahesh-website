// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');
const currentYear = document.getElementById('year');

// Form elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('form_subject');
const messageInput = document.getElementById('message');

// Certificate Modal Elements
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalCertificateImage');
const modalTitle = document.getElementById('modalCertificateTitle');
const modalIssuer = document.getElementById('modalCertificateIssuer');
const modalDate = document.getElementById('modalCertificateDate');
const modalId = document.getElementById('modalCertificateId');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalLink = document.getElementById('modalCertificateLink');
const closeButtons = document.querySelectorAll('.close-modal');

// Certificate Data
const certificateData = {
    'python': {
        title: 'Python Programming Certification',
        issuer: 'Great Learning',
        date: 'May 2023',
        description: 'Comprehensive certification covering Python fundamentals, data structures, and object-oriented programming concepts. This certification validates expertise in Python programming language and its applications in real-world scenarios.',
        credentialId: 'GL-PYTHON-2023-05789',
        link: '#'
    },
    'web': {
        title: 'Web Development Fundamentals',
        issuer: 'The Digital Adda',
        date: 'March 2023',
        description: 'Certification covering HTML5, CSS3, JavaScript, and responsive design principles. Demonstrates proficiency in modern web development techniques and best practices.',
        credentialId: 'TDA-WEB-2023-03421',
        link: '#'
    },
    'responsive': {
        title: 'Responsive Web Design',
        issuer: 'FreeCodeCamp',
        date: 'May 7, 2025',
        description: 'Certification demonstrating proficiency in HTML, CSS, and JavaScript for responsive web development. Includes hands-on projects showcasing responsive design implementation.',
        credentialId: 'FCC-RWD-2025-78901',
        link: '#'
    }
};

// Web3Forms Configuration
const WEB3FORMS_ACCESS_KEY = '0e95c1ed-0a4f-4ea5-8570-a9d8d10e4e7e';
const RECIPIENT_EMAIL = 'lamsalmahesh0007@gmail.com';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize certificate modals
    initCertificateModals();
    
    // Initialize form handling
    initFormHandling();
});

// Animation on Scroll
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Header shadow on scroll
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Back to top click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Navigation
function initMobileNav() {
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!navLinks.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Certificate Modals
function initCertificateModals() {
    const certificationCards = document.querySelectorAll('.certification-card');
    const viewButtons = document.querySelectorAll('.view-certificate');
    
    // Open modal when clicking card
    certificationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the view button
            if (e.target.closest('.view-certificate')) {
                return;
            }
            
            const certType = this.getAttribute('data-cert');
            openCertificateModal(certType);
        });
    });
    
    // Open modal when clicking view button
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.certification-card');
            const certType = card.getAttribute('data-cert');
            openCertificateModal(certType);
        });
    });
    
    // Close modal functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', closeCertificateModal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
}

function openCertificateModal(certType) {
    const data = certificateData[certType];
    if (!data) return;
    
    const card = document.querySelector(`[data-cert="${certType}"]`);
    const imageSrc = card.querySelector('img').src;
    
    modalImage.src = imageSrc;
    modalImage.alt = data.title;
    modalTitle.textContent = data.title;
    modalIssuer.textContent = data.issuer;
    modalDate.textContent = data.date;
    modalId.textContent = data.credentialId;
    modalDescription.textContent = data.description;
    modalLink.href = data.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Form Handling
function initFormHandling() {
    if (!contactForm) return;
    
    // Real-time validation
    setupFormValidation();
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
}

function setupFormValidation() {
    const formInputs = [nameInput, emailInput, subjectInput, messageInput];
    
    formInputs.forEach(input => {
        if (!input) return;
        
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(field);
    
    // Check if empty
    if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Message length validation
    if (field.id === 'message' && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function validateForm() {
    let isValid = true;
    const formInputs = [nameInput, emailInput, subjectInput, messageInput];
    
    formInputs.forEach(input => {
        if (!input) return;
        
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Hide previous messages
    formSuccess.classList.remove('show');
    formError.classList.remove('show');
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Disable submit button and show loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
        // Create FormData
        const formData = new FormData(contactForm);
        
        // Add Web3Forms specific data
        formData.set('access_key', WEB3FORMS_ACCESS_KEY);
        formData.set('subject', `New Message from ${nameInput.value}: ${subjectInput.value}`);
        formData.set('from_name', 'Mahesh Portfolio Contact Form');
        formData.set('replyto', emailInput.value);
        
        // Send to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Show success message
            formSuccess.classList.add('show');
            contactForm.reset();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ 
                behavior: 'smooth',
                block: 'nearest'
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        } else {
            throw new Error(result.message || 'Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        formError.classList.add('show');
        
        // Scroll to error message
        formError.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest'
        });
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            formError.classList.remove('show');
        }, 5000);
    } finally {
        // Re-enable submit button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

// Setup Web3Forms email configuration
function setupWeb3FormsEmail() {
    // Note: You need to configure the recipient email in Web3Forms dashboard
    console.log('Web3Forms Configuration:');
    console.log('- Access Key:', WEB3FORMS_ACCESS_KEY);
    console.log('- Recipient Email:', RECIPIENT_EMAIL);
    console.log('- To change recipient email, visit: https://web3forms.com');
    console.log('- Login with your access key and update email settings');
}

// Call setup function
setupWeb3FormsEmail();

// Responsive adjustments for timeline
function adjustTimelineForMobile() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (window.innerWidth <= 768) {
        timelineItems.forEach(item => {
            const yearElement = item.querySelector('.timeline-year');
            if (yearElement) {
                // Adjust year position for mobile
                const content = item.querySelector('.timeline-content h3');
                if (content) {
                    if (content.textContent.includes('Bachelor') || content.textContent.includes('BSc')) {
                        yearElement.textContent = 'Present';
                    } else if (content.textContent.includes('+2')) {
                        yearElement.textContent = '2022-2024';
                    } else if (content.textContent.includes('School') || content.textContent.includes('SEE')) {
                        yearElement.textContent = '2022';
                    }
                }
            }
        });
    }
}

// Initial call for responsive adjustments
adjustTimelineForMobile();

// Update on resize
window.addEventListener('resize', adjustTimelineForMobile);