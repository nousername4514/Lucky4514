const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors()); // Use cors
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', (req, res) => {
  console.log('Received a request'); // Log the request
  const imgData = req.body.image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(imgData, 'base64');
  const filePath = path.join(__dirname, 'uploads', `${Date.now()}.png`);
  fs.writeFile(filePath, buffer, err => {
    if (err) {
      console.error('Failed to save image', err); // Log error
      return res.status(500).send('Failed to save image');
    }
    console.log('Image saved'); // Log success
    res.send('Image saved');
  });
});

app.listen(3000, () => console.log('Server started on port 3000'));
