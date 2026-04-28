@echo off
cd /d "%~dp0"
echo Node.js 설치 확인 중...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js가 설치되어 있지 않거나 PATH 설정이 되어 있지 않습니다.
    echo https://nodejs.org/ 에서 LTS 버전을 설치한 후 다시 실행해 주세요.
    pause
    exit /b
)

echo 필요한 패키지 설치 중 (최초 1회 실행 시 시간이 다소 소요될 수 있습니다)...
if not exist "node_modules" (
    call npm install
)

echo 개발 서버 실행 중... http://localhost:3000 주소로 접속합니다.
start http://localhost:3000
call npm run dev
pause
