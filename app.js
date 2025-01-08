const express = require('express');
const path = require('path');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Routes
app.get('/', (req, res) => {
    try {
        res.render('index', {
            title: 'Welcome to Penang',
            categories: [
                {
                    name: 'Tourist Spots',
                    description: 'Explore the beautiful attractions'
                },
                {
                    name: 'Food & Cuisine',
                    description: 'Taste local delicacies'
                },
                {
                    name: 'Accommodations',
                    description: 'Find your perfect stay'
                }
            ]
        });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Error rendering page');
    }
});

// 404 handling
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});

module.exports = app; 