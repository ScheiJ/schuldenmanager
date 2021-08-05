/**
 * Used to serve on Heroku on Port 80
 */
const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const dotenv = require('dotenv').config();

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const app = express();
app.use(requireHTTPS);
app.use(serveStatic(path.join(__dirname, 'dist')));

const port = process.env.PORT || 80;
app.listen(port);