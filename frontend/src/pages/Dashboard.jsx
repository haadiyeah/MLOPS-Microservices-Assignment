import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('/api/data', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="dashboard-content">
                <h3>Your Data</h3>
                {data.length > 0 ? (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>{item.name}: {item.value}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;