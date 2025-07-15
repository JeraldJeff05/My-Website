// Core Portfolio Functionality

// Function to show/hide windows based on tab selection
function showWindow(windowId) {
    // Hide all windows
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected window
    document.getElementById(windowId).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    setupKeyboardNavigation();
});

// Main initialization function
function initializePortfolio() {
    console.log('Portfolio initialized');
    
    // Set default active tab and window
    const defaultTab = document.querySelector('.nav-tab');
    const defaultWindow = document.querySelector('.window');
    
    if (defaultTab && defaultWindow) {
        defaultTab.classList.add('active');
        defaultWindow.classList.add('active');
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Window control buttons
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', handleWindowControl);
    });

    // Navigation tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });

    // Contact links
    setupContactLinks();
    
    // Download buttons
    setupDownloadButtons();
}

// Handle window control button clicks
function handleWindowControl(e) {
    const controlType = e.target.classList[1]; // Gets 'close', 'minimize', or 'maximize'
    const window = e.target.closest('.window');
    
    switch(controlType) {
        case 'close':
            // For demo purposes, just hide the window
            window.style.opacity = '0.5';
            setTimeout(() => {
                window.style.opacity = '1';
            }, 1000);
            break;
        case 'minimize':
            window.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.style.transform = 'scale(1)';
            }, 300);
            break;
        case 'maximize':
            window.style.transform = 'scale(1.02)';
            setTimeout(() => {
                window.style.transform = 'scale(1)';
            }, 300);
            break;
    }
}

// Handle tab clicks
function handleTabClick(e) {
    const tabText = e.target.textContent.toLowerCase().replace(/\s+/g, '');
    const windowId = getWindowIdFromTab(tabText);
    
    if (windowId) {
        showWindow(windowId);
    }
}

// Get window ID from tab text
function getWindowIdFromTab(tabText) {
    const tabMap = {
        'aboutme': 'about',
        'projects': 'projects',
        'contact': 'contact',
        'cv&resume': 'cv',
        'cvresume': 'cv'
    };
    
    return tabMap[tabText] || null;
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Tab for tab navigation
        if (e.key === 'Tab' && e.ctrlKey) {
            e.preventDefault();
            navigateToNextTab();
        }
        
        // Arrow keys for tab navigation
        if (e.key === 'ArrowRight' && e.altKey) {
            e.preventDefault();
            navigateToNextTab();
        }
        
        if (e.key === 'ArrowLeft' && e.altKey) {
            e.preventDefault();
            navigateToPrevTab();
        }
        
        // Escape key to close current window effect
        if (e.key === 'Escape') {
            const activeWindow = document.querySelector('.window.active');
            if (activeWindow) {
                activeWindow.style.opacity = '0.8';
                setTimeout(() => {
                    activeWindow.style.opacity = '1';
                }, 200);
            }
        }
    }); }

    