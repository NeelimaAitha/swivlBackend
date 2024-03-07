const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const dbPath = path.join(__dirname, "swivl.db");
const User = require("./user");
const Recipe = require("./recipe");
let db;

const initializeDB = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("users server started on 3000 port");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDB();

const userObj = new User();
const recipeObj = new Recipe();

//Authenticate middleware function
const authenticateToken = async (request, response, next) => {
  let jwtToken;
  const { authorization } = request.headers;
  if (authorization !== undefined) {
    jwtToken = authorization.split(" ")[1];
  }
  if (jwtToken !== undefined) {
    jwt.verify(jwtToken, "ganikey", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid Access Token");
      } else {
        request.user = payload;
        next();
      }
    });
  }
};

//register user API
app.post("/users/", (request, response) => {
  userObj.registerUser(request, response, db);
});

//Login User API
app.post("/login/", (request, response) => {
  userObj.loginUser(request, response, db);
});

//User Profile API
app.get("/profile/", authenticateToken, (request, response) => {
  userObj.getUserProfile(request, response, db);
});

//get recipe API
app.get("/recipes/:id", authenticateToken, (request, response) => {
  recipeObj.getRecipe(request, response, db);
});

app.post("/recipes/", authenticateToken, (request, response) => {
  recipeObj.addRecipe(request, response, db);
});
