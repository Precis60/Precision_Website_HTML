// Configuration file for data storage
// Change these settings to control where your data is stored

const CONFIG = {
    // Set to true to use online API, false for localStorage only
    USE_ONLINE_STORAGE: true,
    
    // API URLs for different environments
    API_URLS: {
        development: 'http://localhost:3000',
        production: 'https://precision-website-production.up.railway.app', // Update this with your actual Railway URL
        staging: 'https://your-staging-app.railway.app'
    },
    
    // Current environment (change this based on where you're running)
    ENVIRONMENT: 'production', // 'development', 'staging', or 'production'
    
    // Fallback settings
    ENABLE_FALLBACK: true, // If true, falls back to localStorage when API fails
    
    // Auto-retry settings
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // milliseconds
};

// Helper function to get the current API URL
function getApiUrl() {
    return CONFIG.API_URLS[CONFIG.ENVIRONMENT];
}

// Helper function to check if online storage should be used
function shouldUseOnlineStorage() {
    return CONFIG.USE_ONLINE_STORAGE && navigator.onLine;
}

// Export configuration for use in data-manager.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Usage Examples:
// 
// For Local Development:
// CONFIG.USE_ONLINE_STORAGE = true;
// CONFIG.ENVIRONMENT = 'development';
//
// For Production:
// CONFIG.USE_ONLINE_STORAGE = true; 
// CONFIG.ENVIRONMENT = 'production';
// CONFIG.API_URLS.production = 'https://your-real-domain.com';
//
// For Offline Mode:
// CONFIG.USE_ONLINE_STORAGE = false;
