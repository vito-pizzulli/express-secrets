// FOR THE USER
// Make sure you have installed all the dependencies with "npm i".
// The password is ILoveProgramming


// Express framework and modules importation from Node.js.
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Constant defining the absolute path of the current directory.
const __dirname = dirname(fileURLToPath(import.meta.url));

// Creating an Express application.
const app = express();

// Constant defining the port number on which the app will be started.
const port = 3000;

// Variable that tracks if the user is authorized or not.
let isAuthorized = false;

// Middleware to parse data from HTTP requests sent via POST requests and populate req.body.
app.use(bodyParser.urlencoded({ extended: true }));

// Custom Middleware to handle password verification.
function passwordChecker(req, res, next) {
    isAuthorized = false;
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
        isAuthorized = true;
    }
    next();
}
app.use(passwordChecker);

// Route that serves the main HTML file in response to a GET request to the root of the server.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Route that serves the secret HTML file in response to a POST request to the check route if the password is correct, otherwise the user is redirected to the main HTML file.
app.post("/check", (req, res) => {
    if (isAuthorized) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});