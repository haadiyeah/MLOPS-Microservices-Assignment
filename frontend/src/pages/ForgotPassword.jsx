import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to process request');
            setMessage('');
        }
    };

    return (
        <div className="auth-form">
            <h2>Forgot Password</h2>
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <div className="auth-links">
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;