@echo off
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
 echo Python is required. Install Python 3 or use the GitHub Pages link.
 pause
 exit /b 1
)
start "" http://localhost:8080/
python -m http.server 8080
pause
