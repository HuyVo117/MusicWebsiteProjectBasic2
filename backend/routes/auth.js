import express from "express";
import { User } from "/home/jun/Documents/MusicWebsiteProjectBasic2/backend/model/user.js";
import bcrypt from "bcrypt";
import getToken from "/home/jun/Documents/MusicWebsiteProjectBasic2/backend/utils/helpers.js";

const router = express.Router();

// This POST route will help to register a user
router.post("/register", async (req, res) => {
  //This code is run when the /register api is called as POST request

  // My req.body will be of the format {email, password, firstname , lastname, username}
  const { email, password, firstName, lastName, username } = req.body;

  try {
    //Step 2: Does a user with this email already exist?
    const user = await User.findOne({ email: email });
    if (user) {
      //Status code by default 200
      return res
        .status(403)
        .json({ error: "A user with this email already exists" });
    }

    // This is valid request

    // Step 3: Create a new user in DB
    // Step 3.1: We do not store passwords in plain text.
    // xyz: we convert password to hash.
    // xyz -> abifjweoifjweifjifjweiofwejfiowef
    // my hash of xyz depends on 2 parameters
    // If I keep those 2 parameters same, xyz ALWAYS gives the same hash.
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    };
    const newUser = await User.create(newUserData);
    console.log(newUserData);

    // Step 4: We want to create the token to return to the user
    const token = await getToken(email, newUser);

    // Step 5: Return the result to the user
    const userToReturn = { ...newUser.toJSON(), token };
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  // Step 1: Get email and password sent by user from req.body
  const { email, password } = req.body;

  // Step 2: Check if a user with given email exists. If not, the credentials are invalid
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  console.log(user);

  // Step 3: If the user exists, check if the password is correct. If not, the credentials are invalid
  // This is a tricky step. Why? Because we have stored the original password in a hashed form, which we cannot use to get back the password.
  // I cannot do : if(password === user.password)
  // bcrypt.compare enabled us to compare 1 password in plaintext(password from req.body) to a hashed password(the one in our db) securely
  const isPasswordValid = await bcrypt.compare(password, user.password);
  // This will return true if the password is correct
  if (!isPasswordValid) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  // Step 4: If the credentials are valid, we create a token and return it to the user
  const token = await getToken(email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

export default router;
