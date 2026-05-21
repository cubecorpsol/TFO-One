# TFO One — Textile Factory ERP (PWA)

Mobile-first Progressive Web App for Tamil Nadu TFO/Textile factory owners.

## File Structure

```
tfo-one/
├── index.html        ← Main app (all pages)
├── manifest.json     ← PWA install config
├── sw.js             ← Service Worker (offline support)
├── css/
│   └── app.css       ← All styles
├── js/
│   └── app.js        ← All logic
└── icons/
    ├── icon-192.png  ← App icon 192×192
    └── icon-512.png  ← App icon 512×512
```

## How to Run

### Option 1 — Open directly in browser
Double-click `index.html` — works immediately, no server needed.

### Option 2 — Local dev server (recommended for PWA features)
```bash
# Python
python3 -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code Live Server extension
Right-click index.html → Open with Live Server
```
Then open: http://localhost:8080

## How to Install as PWA (on phone)
1. Open in Chrome (Android) or Safari (iOS)
2. Android: tap ⋮ menu → "Add to Home screen"
3. iOS: tap Share → "Add to Home Screen"

## Login (Demo)
- Enter any 10-digit mobile number
- Check "I agree to Terms"
- Tap Send OTP
- Enter **123456** as the OTP
- Tap Verify & Login

## Features
- OTP-based mobile login
- Yarn Inward / Outward with auto weight calculation
- Color-wise stock management with edit
- Employee profiles with blood group, photo capture
- Morning / Night shift attendance marking
- Bag production payroll (primary) + shift-wise option
- Start Payroll → Edit Payroll per employee
- PDF report download with date range: Today / 1 Week / 1 Month / Custom
- English / Tamil language toggle
- Profile: Factory Settings, Notifications, Language, Data & Backup, Logout
- PWA: installable, offline-capable via Service Worker

## Adding App Icons
Place icon images in `icons/` folder:
- `icon-192.png` — 192×192 px, navy background (#0D2B6B), white TFO One logo
- `icon-512.png` — 512×512 px, same design

## Backend Integration (Next Steps)
Connect to FastAPI backend:
- Replace `empDB`, `stockDB` with API calls
- Auth: POST `/api/auth/send-otp` and `/api/auth/verify-otp`
- Stock: GET/POST `/api/inventory`
- Employees: CRUD `/api/employees`
- Attendance: POST `/api/attendance`
- Payroll: POST `/api/payroll/calculate`
- Reports: GET `/api/reports/{type}?range=week`

## Tech Stack
- HTML5 + CSS3 + Vanilla JS (zero framework — runs anywhere)
- Tabler Icons (cdn.jsdelivr.net)
- DM Sans + Noto Sans Tamil (Google Fonts)
- PWA: Web App Manifest + Service Worker + Cache API
