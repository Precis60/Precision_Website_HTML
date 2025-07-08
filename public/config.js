// Configuration file for data storage
// When frontend and backend are served from same domain, use relative URLs

const CONFIG = {
    // Set to true to use online API, false for localStorage only
    USE_ONLINE_STORAGE: true,
    
    // API URLs - use relative URLs when frontend and backend are on same domain
    API_URLS: {
        development: 'http://localhost:3000',
        production: '', // Empty = use relative URLs (same domain)
        staging: ''
    },
    
    // Current environment
    ENVIRONMENT: 'production',
    
    // Fallback settings
    ENABLE_FALLBACK: true,
    
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
