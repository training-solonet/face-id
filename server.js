const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize")
const DataTypes = require("sequelize");
const { type } = require("os");

const db = new Sequelize('face_recognition_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const Data = db.define('logs', {
    name: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_valid: {
        type: DataTypes.ENUM('0', '1'),
        allowNull: false
    }
})


const app = express();
const port = 3050;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.post("/upload", upload.single("image"), async (req, res) => {
  // take the image from the uploads folder ...
  const image = path.join(__dirname, "uploads", req.file.originalname);

  const form = new FormData();
  form.append("file", fs.createReadStream(image));

  try {
    const response = await axios
      .post("https://faceid.connectis.my.id/find_face", form, {
        headers: {
          ...form.getHeaders(),
        },
      })
      .then((response) => {
          // simpan data ke table logs
        const { name, is_valid} = response.data
        console.log(response.data);

        Data.create({
            name: name,
            img: req.file.originalname,
            timeStamp: new Date(),
            is_valid: is_valid ? '1' : '0'
        })
        
        // delete all the images in the uploads folder
        fs.readdir("uploads", (err, files) => {
          if (err) throw err;
          for (const file of files) {
            fs.unlink(path.join("uploads", file), (err) => {
              if (err) throw err;
            });
          }
        });
        res.json(response.data);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});