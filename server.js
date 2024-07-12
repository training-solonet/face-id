const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
    // take the image from the uploads folder
    const image = path.join(__dirname, 'uploads', req.file.originalname);

    const form = new FormData();
    form.append('file', fs.createReadStream(image));

    try {
        const response = await axios.post('http://175.106.17.180:5001/find_face', form, {
            headers: {
                ...form.getHeaders()
            }
        }).then(response => {
            console.log(response.data);
            // delete the image after processing
            fs.unlinkSync(image);
            res.json(response.data);
        });
    } catch (error) {
        res.status(500).send(error);
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
