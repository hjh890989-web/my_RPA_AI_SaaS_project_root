@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo   FactoryAI Prototype Launcher
echo ==========================================
echo.

echo [1/3] Checking Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please install LTS version from https://nodejs.org/
    echo.
    pause
    exit /b
)

echo [2/3] Checking dependencies...
if not exist "node_modules" (
    echo.
    echo node_modules not found. Installing packages...
    echo (This may take a few minutes for the first time)
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install packages.
        echo Please check your internet connection and try again.
        pause
        exit /b
    )
)

echo [3/3] Starting Dev Server...
echo.
echo The browser should open automatically.
echo If not, please open http://localhost:3000 in your browser.
echo.
echo To stop the server, press Ctrl+C in this window.
echo.

:: Use npm run dev with --open flag
call npm run dev -- --open

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to start the server.
    pause
)

pause
