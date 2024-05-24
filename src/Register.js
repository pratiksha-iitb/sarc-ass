
import React, { useState } from 'react';
import axios from 'axios';

function Register({eventId, onClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8001/api/registrations/', {
            event: eventId,
            name,email
        })
        .then(response => {
            console.log('Registration successful:', response.data);
            onClose();
        })
        .catch(error => {
            console.error('There was an error registering!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Register for {eventId}</h2>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;