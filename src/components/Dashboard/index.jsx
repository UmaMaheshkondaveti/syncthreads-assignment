import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken, getDashboardData } from '../../services/mockAuthService';
import './index.css';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        // Verify the token using our mock service
        await verifyToken(token);
        
        // Get dashboard data using our mock service
        const data = await getDashboardData();
        setCards(data.cards);
        setLoading(false);
      } catch (err) {
        if (err.message === 'Invalid token') {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load dashboard data');
          setLoading(false);
        }
      }
    };
    
    fetchDashboardData();
  }, [navigate]);

  const handleCardClick = (cardId) => {
    navigate(`/map/${cardId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-container">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>
      
      {error && <div className="error-banner">{error}</div>}
      
      <div className="dashboard-content">
        <h2>Your Map Cards</h2>
        <p className="dashboard-subtitle">Click on a card to view its location on the map</p>
        
        <div className="cards-grid">
          {cards.length > 0 ? (
            cards.map(card => (
              <div 
                key={card.id} 
                className="dashboard-card" 
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-icon">
                  <i className={card.icon || 'fas fa-map-marker-alt'}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="card-footer">
                  <span className="card-location">{card.location}</span>
                  <button className="view-map-button">View Map</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-cards-message">
              No map cards available. New cards will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;