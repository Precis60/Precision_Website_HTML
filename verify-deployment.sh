#!/bin/bash
# Railway Deployment Verification Script

echo "=== RAILWAY DEPLOYMENT VERIFICATION ==="
echo ""

# Check critical files
echo "1. Checking critical files:"
test -f package.json && echo "   ✓ package.json exists" || echo "   ✗ package.json missing"
test -f server.js && echo "   ✓ server.js exists" || echo "   ✗ server.js missing"
test -f railway.toml && echo "   ✓ railway.toml exists" || echo "   ✗ railway.toml missing"
test -d public && echo "   ✓ public/ directory exists" || echo "   ✗ public/ directory missing"

echo ""
echo "2. Checking package.json validity:"
node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8')); console.log('   ✓ package.json is valid JSON')" 2>/dev/null || echo "   ✗ package.json is invalid JSON"

echo ""
echo "3. Checking server.js syntax:"
node -c server.js && echo "   ✓ server.js syntax is valid" || echo "   ✗ server.js has syntax errors"

echo ""
echo "4. Checking key public files:"
test -f public/index.html && echo "   ✓ public/index.html exists" || echo "   ✗ public/index.html missing"
test -f public/calendar.html && echo "   ✓ public/calendar.html exists" || echo "   ✗ public/calendar.html missing"
test -f public/contacts.html && echo "   ✓ public/contacts.html exists" || echo "   ✗ public/contacts.html missing"
test -f public/login-details.html && echo "   ✓ public/login-details.html exists" || echo "   ✗ public/login-details.html missing"
test -f public/styles.css && echo "   ✓ public/styles.css exists" || echo "   ✗ public/styles.css missing"
test -f public/config.js && echo "   ✓ public/config.js exists" || echo "   ✗ public/config.js missing"
test -f public/data-manager.js && echo "   ✓ public/data-manager.js exists" || echo "   ✗ public/data-manager.js missing"

echo ""
echo "5. Checking git status:"
git status --porcelain | wc -l | awk '{if($1==0) print "   ✓ No uncommitted changes"; else print "   ! " $1 " uncommitted changes"}'

echo ""
echo "=== DEPLOYMENT SHOULD BE READY ==="
echo "Push any remaining changes and redeploy on Railway"
