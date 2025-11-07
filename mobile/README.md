# MobileApp

This is a **mobile inventory management app** built with **React Native**, **Expo**, and **TypeScript**. The app demonstrates a **minimum viable product (MVP)** user flow, including authentication, inventory listing, item management, quantity adjustments, and audit logging. It uses **React Navigation** for navigation and **React Context** for authentication state management.

---

## ⚙️ Setup & Run Instructions

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## 📱 Features

- **Authentication:** Sign in and Sign up screens with form validation using `react-hook-form` and `yup`.
- **Inventory List:** Search, filter, and pull-to-refresh capabilities.
- **Item Detail:** View detailed information and recent adjustments for each item.
- **Add/Edit Item:** Forms with input validation and friendly error messages.
- **Adjust Quantity:** Single screen or modal for adding or removing inventory with a reason.
- **Audit Log:** Simple per-item history of changes.
- **Context-based User Flow:** Automatically switches between authentication screens and inventory screens based on login state.

---

# Folder Structure
``` bash
app/
│
├── index.tsx # App entry point, renders RootNavigator
│
├── navigation/
│ ├── RootNavigator.tsx # Chooses AuthNavigator or AppNavigator based on user state
│ ├── AuthNavigator.tsx # Stack navigator for SignIn / SignUp
│ └── AppNavigator.tsx # Stack navigator for Inventory screens
│
├── screens/
│ ├── Auth/
│ │ ├── SignInScreen.tsx
│ │ └── SignUpScreen.tsx
│ │
│ └── Inventory/
│ ├── InventoryListScreen.tsx
│ ├── ItemDetailScreen.tsx
│ ├── AddEditItemScreen.tsx
│ ├── AdjustQuantityScreen.tsx
│ └── AuditLogScreen.tsx
│
components/
├── InputField.tsx # Reusable input component
├── ItemCard.tsx # Card component for displaying inventory items
└── LoadingSpinner.tsx # Loading indicator
│
context/
└── AuthContext.tsx # Handles user authentication state
│
services/
└── api.ts # Axios setup for API requests
│
utils/
└── validators.ts # Custom validation helpers
```

## Directory Overview

- **app/**: Main application directory containing the entry point and navigation
- **components/**: Reusable UI components used throughout the app
- **context/**: React Context providers for state management
- **services/**: API and external service configurations
- **utils/**: Helper functions and utilities


| Path | Type | Description |
|------|------|-------------|
| `app/index.tsx` | File | App entry point, renders RootNavigator |
| `app/navigation/RootNavigator.tsx` | File | Chooses AuthNavigator or AppNavigator based on user state |
| `app/navigation/AuthNavigator.tsx` | File | Stack navigator for SignIn / SignUp |
| `app/navigation/AppNavigator.tsx` | File | Stack navigator for Inventory screens |
| `app/screens/Auth/SignInScreen.tsx` | File | Sign in screen component |
| `app/screens/Auth/SignUpScreen.tsx` | File | Sign up screen component |
| `app/screens/Inventory/InventoryListScreen.tsx` | File | Main inventory list screen |
| `app/screens/Inventory/ItemDetailScreen.tsx` | File | Item details screen |
| `app/screens/Inventory/AddEditItemScreen.tsx` | File | Add/edit item form screen |
| `app/screens/Inventory/AdjustQuantityScreen.tsx` | File | Quantity adjustment screen |
| `app/screens/Inventory/AuditLogScreen.tsx` | File | Audit log viewing screen |
| `components/InputField.tsx` | File | Reusable input component |
| `components/ItemCard.tsx` | File | Card component for displaying inventory items |
| `components/LoadingSpinner.tsx` | File | Loading indicator component |
| `context/AuthContext.tsx` | File | Handles user authentication state |
| `services/api.ts` | File | Axios setup for API requests |
| `utils/validators.ts` | File | Custom validation helpers |