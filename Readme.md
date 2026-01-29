# Blood Bank Frontend

React frontend for the Blood Bank Management System.

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v7
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **UI:** Bootstrap 5, Font Awesome
- **Notifications:** React Hot Toast
- **Date Formatting:** Moment.js

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   REACT_APP_BASEURL=http://localhost:8080/api/v1
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App |

## Project Structure

```
src/
├── components/
│   ├── routes/          # Protected & Public route wrappers
│   └── shared/
│       ├── Form/        # Reusable form component
│       ├── Layout/      # Layout, Sidebar, Header
│       └── modal/       # Modal components
├── pages/
│   ├── auth/            # Login, Register pages
│   ├── admin/           # Admin dashboard pages
│   ├── Dashboard/       # Dashboard pages (Donor, Hospital, etc.)
│   ├── LandingPage.jsx  # Main entry page
│   ├── HomePage.jsx     # Organisation inventory page
│   ├── Donation.jsx     # Donor's donation history
│   └── AddDonation.jsx  # Add new donation form
├── redux/
│   ├── store.js         # Redux store configuration
│   └── features/        # Redux slices (auth)
├── services/
│   └── API.js           # Axios instance configuration
└── styles/              # CSS files
```

## User Roles & Features

### Admin
- View all donors, hospitals, and organisations
- Delete users from the system
- Access admin dashboard

### Organisation (Blood Bank)
- Manage blood inventory (add donations, distribute blood)
- View donor list
- View hospital list
- Track blood stock levels

### Donor
- View organisations
- Add new donations
- View donation history

### Hospital
- View organisations
- Request blood (consumer records)
- View blood consumption history

## Sample Test Credentials

Use these credentials to test the application:

### Admin
```
Email: admin@bloodbank.com
Password: password123
Role: admin
```

### Organisation (Blood Bank)
```
Email: org@bloodbank.com
Password: password123
Role: organisation
```

### Donors
```
Email: john@example.com
Password: password123
Role: donar

Email: jane@example.com
Password: password123
Role: donar

Email: mike@example.com
Password: password123
Role: donar
```

### Hospitals
```
Email: cityhospital@example.com
Password: password123
Role: hospital

Email: memorial@example.com
Password: password123
Role: hospital
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_BASEURL` | Backend API base URL |

**Important:** Always include `https://` prefix for production URLs.

## Deployment (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `REACT_APP_BASEURL=https://your-backend-url.onrender.com/api/v1`
4. Deploy

**Note:** Environment variables in React are embedded at build time. After changing any `REACT_APP_*` variable, you must redeploy the app.

## Pages & Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | LandingPage | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/home` | HomePage | Organisation |
| `/donar` | Donar | Organisation |
| `/hospital` | Hospital | Organisation |
| `/organisation` | OrganisationPage | Donor, Hospital |
| `/add-donation` | AddDonation | Donor |
| `/donation` | Donation | Donor |
| `/consumer` | Consumer | Hospital |
| `/donar-list` | DonarList | Admin |
| `/hospital-list` | HospitalList | Admin |
| `/org-list` | OrgList | Admin |

## Color Theme

The app uses a light red color theme:
- Primary: `#e63946`
- Primary Dark: `#c1121f`
- Primary Light: `#ffccd2`
