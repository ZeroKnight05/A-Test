const express = require('express');
const multer = require('multer'); // For handling file uploads

const app = express();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// POST endpoint for image/video upload
app.post('/upload', upload.single('fileInput'), (req, res) => {
    // Handle file upload logic here
    const file = req.file; // Uploaded file details
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    // Save file details to database, etc.
    return res.status(200).send('File uploaded successfully.');
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
