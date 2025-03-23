# React + Vite

# Project Name: Map Integration Dashboard

## Description
This project is a React-based dashboard with authentication and map integration. Users can log in, view different locations on a dashboard, and navigate to an interactive map displaying the selected location.

## Features
- User authentication (mock implementation)
- Secure token-based access control
- Interactive map integration using Leaflet
- Dynamic dashboard with location-based cards
- Responsive UI with React Router for navigation

## Technologies Used
- React.js
- React Router
- Leaflet.js (for maps)
- Express.js (backend for authentication & API requests)
- SQLite (for user data storage)
- bcrypt (for password hashing)

## Installation
### Prerequisites
Make sure you have **Node.js** and **npm** installed.

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   node server.js
   ```

4. Start the frontend React application:
   ```sh
   npm start
   ```

## Project Structure
```
project-folder/
├── src/
│   ├── components/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── MapView.js
│   ├── services/
│   │   ├── mockAuthService.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
├── public/
├── server.js
├── package.json
└── README.md
```

## API Endpoints (Mock)
| Method | Endpoint  | Description  |
|--------|----------|--------------|
| POST   | /login   | User authentication |
| GET    | /dashboard | Fetch user-specific dashboard data |
| GET    | /map/:cardId | Fetch map details for a given card |

## Usage
1. Start at the login page (`/login`).
2. Enter the mock credentials:
   - **Username:** `admin`
   - **Password:** `password123`
3. Upon successful login, users are redirected to the dashboard (`/dashboard`).
4. Clicking on a card navigates to a map view (`/map/:cardId`).
5. Users can log out to return to the login page.

## Future Improvements
- Implement real authentication with JWT.
- Store user data and authentication in a real database.
- Improve UI/UX with better styling and animations.
- Enhance error handling and form validation.

