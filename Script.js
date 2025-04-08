const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// In a real app, you would use a database
const users = [
    {
        id: 1,
        email: 'admin@example.com',
        username: 'admin',
        // Password is "password123" hashed
        passwordHash: '$2b$10$G8Z8zJ3ZQ6Z6Z6Z6Z6Z6ZO6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6Z6'
    }
];

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find user by username or email
    const user = users.find(u => 
        u.username === username || u.email === username
    );
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare passwords
    const match = await bcrypt.compare(password, user.passwordHash);
    
    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create JWT token
    const token = jwt.sign(
        { userId: user.id },
        'your-secret-key', // In production, use a proper secret from environment variables
        { expiresIn: '1h' }
    );
    
    res.json({ token });
});

app.listen(3000, () => console.log('Server running on port 3000'));