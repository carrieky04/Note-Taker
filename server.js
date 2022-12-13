const express = require('express');
const path = require('path');
const api = require("./routes/apiRoute.js");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));


// get requests for front end routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Wildcard route to direct users to a home page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
