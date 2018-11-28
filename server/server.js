const path = require('path');
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
const port = process.env.PORT || 3000;

// use the public directory to serve our static assets
app.use(express.static(publicPath));

// if what was requested isn't in the public folder, send index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// start server on heroku or port 3000 if not running on heroku
app.listen(port, () => {
    console.log("server is running on port", port);
});