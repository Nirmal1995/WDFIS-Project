import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.name}!</p>
          {/* Display additional user information or dashboard components */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
