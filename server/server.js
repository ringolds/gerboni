const express = require('express');
const multer = require("multer");
const mysql = require("mysql2");
const dotenv = require("dotenv")

dotenv.config()

const connection = mysql.createConnection(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME
    }
)

connection.connect();

const app = express();
const PORT = 3001;
const upload = multer({ dest:process.env.UPLOADS });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hi world!'});
});

app.post('/api/upload', upload.single("picture"), (req, res) => {
    if(!req.file){
        return res.status(400).send("No file uploaded");
    }
    if(!req.file.mimetype.startsWith("image/")){
        return res.status(400).send("Not an image!");
    }

    const {name, category} = req.body;
    const picture = req.file;

    connection.query(
    "INSERT INTO dati (name, category, filename, path, mimetype, size) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category, picture.filename, picture.path, picture.mimetype, picture.size],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({name: name});
    }
    );
})

app.get('/api/display', (req, res)=>{
    connection.query(
        "Select id, name, path FROM dati",
        (err, results) =>{
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
})

app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})