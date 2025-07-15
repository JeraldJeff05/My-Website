// Project data with images
const projectData = {
    'flutter-app': {
        title: 'SPHERE',
        description: 'A comprehensive mobile application built with Flutter and Firebase, featuring real-time data synchronization and modern UI design.',
        images: [
            'images/SphereS.png',
            'images/SphereH.png',
            'images/flutter-app-3.jpg',
            'images/flutter-app-4.jpg'
        ]
    },
    'ai-solution': {
        title: 'ELDERLY HAKI',
        description: 'An intelligent system developed using Python and machine learning algorithms to solve real-world problems efficiently.',
        images: [
            'images/Elderly/9.png',
            'images/Elderly/10.png',
            'images/Elderly/11.png',
            'images/Elderly/12.png'
        ]
    },
    'team-project': {
        title: 'MEOWRFF!!',
        description: 'Successfully led a team of developers in creating a complex software solution, demonstrating strong project management skills.',
        images: [
            'images/Meowrff/Meow1.png',
            'images/Meowrff/Meow2.png',
            'images/Meowrff/Meow2.png',
            'images/Meowrff/Meow2.png'
        ]
    },
    'travel-mate': {
        title: 'Travelmate',
        description: 'A comprehensive mobile application built with Flutter and Firebase, featuring real-time data synchronization and modern UI design.',
        images: [
            'images/Travelmate/travel1.png',
            'images/Travelmate/travel (1).png',
            'images/Travelmate/travel (2).png',
            'images/Travelmate/travel (3).png'
        ]
    },



};

let currentSlide = 0;
let currentProject = null;

// Function to open project slideshow
function openProjectSlideshow(projectId) {
    currentProject = projectData[projectId];
    if (!currentProject) return;
    
    currentSlide = 0;
    
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${currentProject.title}</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="slideshow-container">
                <div class="slides">
                    ${currentProject.images.map((img, index) => `
                        <div class="slide ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="${currentProject.title} - Image ${index + 1}" onerror="this.src='images/placeholder.jpg'">
                        </div>
                    `).join('')}
                </div>
                <button class="nav-btn prev" onclick="changeSlide(-1)">&#10094;</button>
                <button class="nav-btn next" onclick="changeSlide(1)">&#10095;</button>
                <div class="slide-indicators">
                    ${currentProject.images.map((_, index) => `
                        <span class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>
                    `).join('')}
                </div>
            </div>
            <div class="project-description">
                <p>${currentProject.description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Show modal
    setTimeout(() => modal.classList.add('show'), 10);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.project-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.removeEventListener('keydown', handleKeyPress);
        }, 300);
    }
}

// Function to change slides
function changeSlide(direction) {
    if (!currentProject) return;
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide >= currentProject.images.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = currentProject.images.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Function to go to specific slide
function goToSlide(index) {
    if (!currentProject) return;
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Handle keyboard navigation
function handleKeyPress(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Escape') closeModal();
}

// Auto-advance slideshow (optional)
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Initialize project view buttons
document.addEventListener('DOMContentLoaded', function() {
    // Update the existing "View Project" buttons
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const viewBtn = card.querySelector('.download-btn');
        const projectIds = ['flutter-app', 'ai-solution', 'team-project'];
        
        if (viewBtn && projectIds[index]) {
            viewBtn.onclick = function(e) {
                e.preventDefault();
                openProjectSlideshow(projectIds[index]);
                startAutoSlide();
            };
        }
    });
});

// Stop auto-slide when modal is closed
const originalCloseModal = closeModal;
closeModal = function() {
    stopAutoSlide();
    originalCloseModal();
};