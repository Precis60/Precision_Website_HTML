// Test script to verify Railway deployment
const baseUrl = 'https://precisionwebsitedatabase-production.up.railway.app';

async function testDeployment() {
    console.log('🚀 Testing Railway Deployment...\n');
    
    // Test 1: Check if homepage loads
    try {
        const homeResponse = await fetch(baseUrl);
        console.log(`✅ Homepage: ${homeResponse.status === 200 ? 'PASS' : 'FAIL'} (${homeResponse.status})`);
    } catch (error) {
        console.log(`❌ Homepage: FAIL - ${error.message}`);
    }
    
    // Test 2: Check if protected pages load (should show authentication modal)
    const protectedPages = ['contacts.html', 'calendar.html', 'login-details.html'];
    for (const page of protectedPages) {
        try {
            const response = await fetch(`${baseUrl}/${page}`);
            console.log(`✅ ${page}: ${response.status === 200 ? 'PASS' : 'FAIL'} (${response.status})`);
        } catch (error) {
            console.log(`❌ ${page}: FAIL - ${error.message}`);
        }
    }
    
    // Test 3: Check API endpoints
    const apiEndpoints = ['contacts', 'events', 'loginDetails'];
    for (const endpoint of apiEndpoints) {
        try {
            const response = await fetch(`${baseUrl}/${endpoint}`);
            const data = await response.json();
            console.log(`✅ API /${endpoint}: ${response.status === 200 ? 'PASS' : 'FAIL'} (${response.status}) - ${Array.isArray(data) ? data.length : 0} items`);
        } catch (error) {
            console.log(`❌ API /${endpoint}: FAIL - ${error.message}`);
        }
    }
    
    // Test 4: Check static assets
    const assets = ['styles.css', 'config.js', 'data-manager.js', 'images/logo.jpg'];
    for (const asset of assets) {
        try {
            const response = await fetch(`${baseUrl}/${asset}`);
            console.log(`✅ Asset ${asset}: ${response.status === 200 ? 'PASS' : 'FAIL'} (${response.status})`);
        } catch (error) {
            console.log(`❌ Asset ${asset}: FAIL - ${error.message}`);
        }
    }
    
    console.log('\n🎉 Deployment test completed!');
}

// Run the test
testDeployment().catch(console.error);
