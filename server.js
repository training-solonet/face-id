// import express from 'express';
// import cors from 'cors';
// import multer from 'multer';
// import axios from 'axios';
// import FormData from 'form-data';
// import fs from 'fs';
// import path from 'path';
// import router from './api-express/routes/Routes.js';
// import Data from './api-express/model/dataModel.js';
// import { fileURLToPath } from 'url';
// import { timeStamp } from 'console';

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const app = express();
// const port = 3050;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.use(express.static("public"));
// app.use(cors())
// app.use(express.json())
// app.use(router)

// app.post("/upload", upload.single("image"), async (req, res) => {
//   // take the image from the uploads folder ...
//   const image = path.join(__dirname, "uploads", req.file.originalname);

//   const form = new FormData();
//   form.append("file", fs.createReadStream(image));

//   try {
//     const response = await axios
//       .post("https://faceid.connectis.my.id/find_face", form, {
//         headers: {
//           ...form.getHeaders(),
//         },
//       })
//       .then((response) => {
//         // simpan data ke table logs
//         console.log(response.data);

//         return Data.create({
//           name: name,
//           img: req.file.originalname,
//           timeStamp: new Date(),
//           is_valid: is_valid
//         })
//         .then(() => {
          
//           fs.readdir("uploads", (err, files) => {
//             if (err) throw err;
//             for (const file of files) {
//               fs.unlink(path.join("uploads", file), (err) => {
//                 if (err) throw err;
//               });
//             }
//           });
//           res.json(response.data);
//         })
//         // delete all the images in the uploads folder
//       });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

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
        console.log(response.data);
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