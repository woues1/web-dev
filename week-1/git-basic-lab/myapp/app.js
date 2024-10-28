const express = require('express');
const path = require('path');
const { format, addDays } = require('date-fns');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Get the current date
const currentDate = new Date();
   
// Format the current date
const formattedDate = format(currentDate, 'MMMM dd, yyyy');
console.log('Formatted Date:', formattedDate);
   
// Add 7 days to the current date
const futureDate = addDays(currentDate, 7);
console.log('Future Date:', format(futureDate, 'MMMM dd, yyyy'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

