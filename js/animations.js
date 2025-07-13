// Animation Effects and Interactions

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupHoverEffects();
    setupScrollEffects();
    setupParallaxEffects();
});

// Initialize all animations
function initializeAnimations() {
    // Add entrance animations to elements
    animateOnLoad();
    
    // Setup intersection observer for scroll animations
    setupIntersectionObserver();
    
    // Add floating animation to profile image
    addFloatingAnimation();
}

// Animate elements on page load
function animateOnLoad() {
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const activeWindow = document.querySelector('.window.active');
    
    // Animate header
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Animate navbar
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            navbar.style.transition = 'all 0.6s ease-out';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 400);
    }
    
    // Animate active window
    if (activeWindow) {
        activeWindow.style.opacity = '0';
        activeWindow.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            activeWindow.style.transition = 'all 0.8s ease-out';
            activeWindow.style.opacity = '1';
            activeWindow.style.transform = 'translateY(0)';
        }, 600);
    }
}

// Setup hover effects
function setupHoverEffects() {
    // Enhanced project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.03)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            
            // Add glow effect
            this.style.border = '2px solid rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = '';
            this.style.border = '';
        });
    });
    
    // Enhanced contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.download-btn, .nav-tab');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Setup scroll effects
function setupScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for header
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
        
        // Fade effect for navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const opacity = Math.max(0, 1 - scrolled / 200);
            navbar.style.opacity = opacity;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Setup parallax effects
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.window');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.1 * (index + 1);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Add floating animation to profile image
function addFloatingAnimation() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Create floating keyframes
        const floatingKeyframes = `
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.textContent = floatingKeyframes;
        document.head.appendChild(style);
        
        // Apply animation
        profileImage.style.animation = 'floating 3s ease-in-out infinite';
    }
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, options);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('.project-card, .contact-item, .cv-section');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Typewriter effect for text
function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Ripple effect for buttons
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.download-btn, .nav-tab')) {
        const element = e.target;
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        
        createRippleEffect(element, e);
    }
});

// Smooth window transitions
function smoothWindowTransition(fromWindow, toWindow) {
    if (fromWindow === toWindow) return;
    
    // Fade out current window
    fromWindow.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
    fromWindow.style.opacity = '0';
    fromWindow.style.transform = 'translateX(-50px)';
    
    setTimeout(() => {
        fromWindow.classList.remove('active');
        fromWindow.style.opacity = '';
        fromWindow.style.transform = '';
        
        // Fade in new window
        toWindow.style.opacity = '0';
        toWindow.style.transform = 'translateX(50px)';
        toWindow.classList.add('active');
        
        setTimeout(() => {
            toWindow.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            toWindow.style.opacity = '1';
            toWindow.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                toWindow.style.transition = '';
                toWindow.style.opacity = '';
                toWindow.style.transform = '';
            }, 300);
        }, 50);
    }, 300);
}

// Add CSS for animate-in class
const animateInStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

// Add animation styles to document
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animateInStyles;
document.head.appendChild(animationStyleSheet);