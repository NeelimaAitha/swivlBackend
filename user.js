const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

module.exports = class User {
  async registerUser(request, response, db) {
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
  }

  async loginUser(request, response, db) {
    const { username, password } = request.body;
    const userQuery = `SELECT * FROM user
  WHERE username='${username}';`;
    const user = await db.get(userQuery);
    if (user !== undefined) {
      const isPassowordCorrect = await bcrypt.compare(password, user.password);
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
  }

  async getUserProfile(request, response, db) {
    const { user } = request;
    const userProfileQuery = `SELECT * FROM user  WHERE username='${user.username}';`;
    const userDetails = await db.get(userProfileQuery);
    response.send(userDetails);
  }
};
