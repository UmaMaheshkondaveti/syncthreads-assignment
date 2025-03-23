import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyToken, getMapData } from '../../services/mockAuthService';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

// Fix Leaflet icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue in Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Default center coordinates for India
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  useEffect(() => {
    const fetchMapData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        // Verify the token using our mock service
        await verifyToken(token);
        
        // Get map data using our mock service
        const data = await getMapData(cardId);
        setMapData(data);
        setLoading(false);
      } catch (err) {
        if (err.message === 'Invalid token') {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load map data');
          setLoading(false);
        }
      }
    };
    
    fetchMapData();
  }, [cardId, navigate]);

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return <div className="map-loading-container">Loading map...</div>;
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <button 
          className="back-button" 
          onClick={handleBackToDashboard}
        >
          Back to Dashboard
        </button>
        
        <h1>{mapData?.title || 'Map View'}</h1>
        
        {cardId && (
          <div className="map-card-info">
            <span>Card ID: {cardId}</span>
          </div>
        )}
      </div>
      
      {error && <div className="map-error">{error}</div>}
      
      <div className="map-content">
        <MapContainer 
          center={mapData?.center || defaultCenter}
          zoom={mapData?.zoom || defaultZoom} 
          zoomControl={false}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          
          {/* Add a marker at the center point */}
          {mapData && mapData.center && (
            <Marker position={mapData.center}>
              <Popup>
                {mapData.title}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;