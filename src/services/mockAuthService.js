// src/services/mockAuthService.js

// Mock user credentials
const validCredentials = {
    username: 'admin',
    password: 'password123'
  };
  
  // Generate a simple mock token
  const generateToken = (username) => {
    return `mock-jwt-token-${username}-${Date.now()}`;
  };
  
  // Mock login function
  export const login = async (username, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check credentials
    if (username === validCredentials.username && password === validCredentials.password) {
      const token = generateToken(username);
      return { success: true, token, user: { username } };
    } else {
      throw new Error('Invalid username or password');
    }
  };
  
  // Mock function to verify token
  export const verifyToken = async (token) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simple check if token starts with our prefix
    if (token && token.startsWith('mock-jwt-token-')) {
      return { valid: true };
    } else {
      throw new Error('Invalid token');
    }
  };
  
  // Mock dashboard data
  export const getDashboardData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      cards: [
        {
          id: '1',
          title: 'Delhi Office',
          description: 'Main headquarters located in New Delhi',
          location: 'New Delhi',
          icon: 'fas fa-building'
        },
        {
          id: '2',
          title: 'Mumbai Branch',
          description: 'Financial district office in Mumbai',
          location: 'Mumbai',
          icon: 'fas fa-city'
        },
        {
          id: '3',
          title: 'Bangalore Tech Hub',
          description: 'Technology center in Bangalore',
          location: 'Bangalore',
          icon: 'fas fa-laptop-code'
        },
        {
            id: '4',
          title: 'Chennai Tech Hub',
          description: 'Technology center in Chennai',
          location: 'Chennai',
          icon: 'fas fa-laptop-code'
        },
        {
            id: '5',
          title: 'Hyderabad Tech Hub',
          description: 'Technology center in Hyderabad',
          location: 'Hyderabad',
          icon: 'fas fa-laptop-code'
        },
        {
            id: '6',
          title: 'Kolkata Tech Hub',
          description: 'Technology center in Kolkata',
          location: 'Kolkata',
          icon: 'fas fa-laptop-code'
        }
      ]
    };
  };
  
  // Mock map data
  export const getMapData = async (cardId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const mapLocations = {
      '1': { 
        title: 'Delhi Office', 
        center: [28.6139, 77.2090], 
        zoom: 12 
      },
      '2': { 
        title: 'Mumbai Branch', 
        center: [19.0760, 72.8777], 
        zoom: 12 
      },
      '3': { 
        title: 'Bangalore Tech Hub', 
        center: [12.9716, 77.5946], 
        zoom: 12 
      },
      '4': { 
        title: 'Chennai Tech Hub', 
        center: [13.1617, 80.2562], 
        zoom: 12 
      },
      '5': { 
        title: 'Hyderabad Tech Hub', 
        center: [17.4410, 78.3808], 
        zoom: 12 
      },
      '6': { 
        title: 'Kolkata Tech Hub', 
        center: [22.5744, 88.3629], 
        zoom: 12 
      },
      'default': { 
        title: 'India Map', 
        center: [20.5937, 78.9629], 
        zoom: 5 
      }
    };
    
    return cardId ? mapLocations[cardId] : mapLocations['default'];
  };