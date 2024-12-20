
/*   Sample Server APP using http  */
/*
const http = require("http");
const fs = require("fs");
const url = require("url");


server = http.createServer((req,res) => {
    // console.log(req);
    if (req.url === '/favicon.ico') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }    
    
    // Log request details asynchronously
    const str = `Date: ${Date.now()} url: ${req.url}\n`;
    fs.appendFile("log.txt", str, (err) => {
        if (err) 
            console.error(`Error writing log: ${err}`);
        else 
            console.log(`Log added - ${str}`);
    });
    
    res.setHeader('Content-Type', 'text/plain');

    const my_url = url.parse(req.url, true);
    // console.log(my_url);
    
    // Route handling
    if(req.method === 'GET') {
        switch (my_url.pathname) {
            case "/":
                res.statusCode = 200;
                res.end("Welcome to the Home Page");
                break;
            case "/about":
                res.statusCode = 200;
                res.end("About Page");
                break;
            default:
                res.statusCode = 404;
                res.end("Page Not Found");
        }
    } else {
        res.end("Please try with GET method");
    }

    for (const key in my_url.query) {
        console.log(`${key}: ${my_url.query[key]}`);
    }
});

// Define the port and start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);   
});

*/


/* similar server app using express */

const express = require("express");
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    res.send('This is the About Page.');
});

app.get('/contact', (req, res) => {
    res.send('This is the Contact Page.');
});

// Route parameters
app.get('/users/:userId/books/:bookID', (req, res) => {
    res.send(`Hello User with Id : ${req.params.userId}, you searched for bookId : ${req.params.bookID}`);
});


// Chain of callback function 
app.get('/try_multiple_callback', (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
}, (req, res) => {
    res.send("from second call back function");
});


// Handle unknown routes (404)
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});