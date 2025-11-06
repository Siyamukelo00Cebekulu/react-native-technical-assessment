@echo off
echo Creating directory structure...

mkdir src\api
mkdir src\components
mkdir src\context
mkdir src\screens
mkdir src\navigation
mkdir src\utils

echo Creating files...
type nul > src\api\apiClient.ts
type nul > src\components\InputField.tsx
type nul > src\components\Button.tsx
type nul > src\context\AuthContext.tsx
type nul > src\screens\LoginScreen.tsx
type nul > src\screens\SignupScreen.tsx
type nul > src\screens\HomeScreen.tsx
type nul > src\navigation\AppNavigator.tsx
type nul > src\utils\storage.ts
type nul > App.tsx
type nul > .env

echo File structure created successfully!
echo.
dir src /b