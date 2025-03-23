import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import './App.css';

// Authentication check helper
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={<PrivateRoute element={<Dashboard />} />} 
          />
          <Route 
            path="/map/:cardId" 
            element={<PrivateRoute element={<MapView />} />} 
          />
          <Route 
            path="/map" 
            element={<PrivateRoute element={<MapView />} />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;