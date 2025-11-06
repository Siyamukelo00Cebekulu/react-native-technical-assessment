# setup-windows.ps1 - Pizza Inventory Backend Setup for Windows

Write-Host "🍕 Setting up Pizza Inventory Backend on Windows..." -ForegroundColor Green

# Step 1: Find MongoDB
Write-Host "`n1. Looking for MongoDB..." -ForegroundColor Yellow
$mongoPaths = @(
    "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe",
    "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe",
    "C:\mongodb\bin\mongod.exe"
)

$mongodPath = $null
foreach ($path in $mongoPaths) {
    if (Test-Path $path) {
        $mongodPath = $path
        Write-Host "   ✅ Found MongoDB at: $path" -ForegroundColor Green
        break
    }
}

if (-not $mongodPath) {
    Write-Host "   ❌ MongoDB not found in common locations" -ForegroundColor Red
    Write-Host "   Please specify your MongoDB path manually" -ForegroundColor Yellow
    $mongodPath = Read-Host "   Enter full path to mongod.exe"
}

# Step 2: Create data directory
Write-Host "`n2. Setting up data directory..." -ForegroundColor Yellow
$dataPath = "C:\mongodb-data"
if (-not (Test-Path $dataPath)) {
    New-Item -ItemType Directory -Path $dataPath -Force
    Write-Host "   ✅ Created data directory: $dataPath" -ForegroundColor Green
} else {
    Write-Host "   ✅ Data directory exists: $dataPath" -ForegroundColor Green
}

# Step 3: Start MongoDB
Write-Host "`n3. Starting MongoDB..." -ForegroundColor Yellow
try {
    $mongodProcess = Start-Process -FilePath $mongodPath -ArgumentList "--dbpath", $dataPath -PassThru
    Write-Host "   ✅ MongoDB started (PID: $($mongodProcess.Id))" -ForegroundColor Green
    
    # Wait a bit for MongoDB to initialize
    Write-Host "   ⏳ Waiting for MongoDB to initialize..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
} catch {
    Write-Host "   ❌ Failed to start MongoDB: $_" -ForegroundColor Red
    exit 1
}

# Step 4: Install dependencies
Write-Host "`n4. Installing Node.js dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "   ✅ Dependencies installed" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Failed to install dependencies: $_" -ForegroundColor Red
    exit 1
}

# Step 5: Test connection
Write-Host "`n5. Testing database connection..." -ForegroundColor Yellow
try {
    # Start the dev server temporarily to test
    $nodeProcess = Start-Process -FilePath "node" -ArgumentList "-e", "require('./lib/mongodb.js').connectToDatabase().then(() => { console.log('✅ Connection test passed'); process.exit(0); }).catch(e => { console.error('❌ Connection test failed:', e); process.exit(1); })" -PassThru -NoNewWindow -Wait
    
    if ($nodeProcess.ExitCode -eq 0) {
        Write-Host "   ✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Database connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Connection test error: $_" -ForegroundColor Red
}

# Step 6: Seed database
Write-Host "`n6. Seeding database..." -ForegroundColor Yellow
try {
    npm run seed
    Write-Host "   ✅ Database seeded successfully" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Seeding failed: $_" -ForegroundColor Red
}

Write-Host "`n🎉 Setup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Start the development server: npm run dev" -ForegroundColor White
Write-Host "2. Open http://localhost:3000/api/health to test" -ForegroundColor White
Write-Host "3. Open http://localhost:3000/api/inventory/items to see data" -ForegroundColor White

Write-Host "`nTo stop MongoDB later, use: taskkill /PID $($mongodProcess.Id)" -ForegroundColor Yellow