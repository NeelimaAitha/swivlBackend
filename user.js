const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

module.exports = class User {
  async registerUser(request, response, db) {
    try {
      const { username, name, password, gender, location } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userQuery = `SELECT * FROM user WHERE username='${username}'`;
      const user = await db.get(userQuery);
      if (user === undefined) {
        const loginUserQuery = `
                INSERT INTO user(username,name,password,gender,location) VALUES
                ('${username}','${name}','${hashedPassword}','${gender}','${location}');`;
        await db.run(loginUserQuery);
        response.send("User Registered Successfully");
      } else {
        response.status(400);
        response.send("User Already Exists");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      response.status(500).send("An error occurred while regestering user");
    }
  }

  async loginUser(request, response, db) {
    try {
      const { username, password } = request.body;
      const userQuery = `SELECT * FROM user
    WHERE username='${username}';`;
      const user = await db.get(userQuery);
      if (user !== undefined) {
        const isPassowordCorrect = await bcrypt.compare(
          password,
          user.password
        );
        if (isPassowordCorrect === true) {
          const payload = { username, password };
          const jwtToken = jwt.sign(payload, "ganikey");
          response.send({ jwtToken });
        } else {
          response.status(400);
          response.send("Invalid Password");
        }
      } else {
        response.status(400);
        response.send("Invalid User");
      }
    } catch (error) {
      console.error("Error loggin user:", error);
      response.status(500).send("An error occurred while loggin user");
    }
  }

  async getUserProfile(request, response, db) {
    try {
      const { user } = request;
      const userProfileQuery = `SELECT id,username,name,gender,location FROM user  WHERE username='${user.username}';`;
      const userDetails = await db.get(userProfileQuery);
      response.send(userDetails);
    } catch (error) {
      console.error("Error getting user profile:", error);
      response.status(500).send("An error occurred while getting user profile");
    }
  }
};
