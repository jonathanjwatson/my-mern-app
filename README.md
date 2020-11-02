# my-mern-app

## GOAL: Build a fullstack MERN App

## Steps

### 1. Setup the server.js

- Create your `server.js` file.
- Run `npm init -y`
- Run `npm install express mongoose dotenv if-env path`
- Build out the basic server

```javascript
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/my-mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
```

### 2. Add create-react-app client on top.

- In the root, run `npx create-react-app client --use-npm`
- Run `npm install concurrently -D`
- Add script: `"client": "cd client && npm run start",` to server package.json
- Add script `"start-dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",` to server package.json
- Add `"proxy": "http://localhost:3001",` to the client package.json

#### Testing and Validation

- Install axios in the client directory
- Make an API call to the `/api/config` route and log it to the console.

### 3. Set the app up for Production

- Update the scripts object in the server package.json:

```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"
  },
```

- Add build folder static and route to server.js

```javascript
app.use(express.static("client/build"));
```

```javascript
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
```
