import express from "express";
import { User, validate } from "../model/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Create user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(403)
      .send({ message: "User with given email already exists!" });
  }

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hashPassword,
  });

  await newUser.save(); // Save User to DB

  newUser.password = undefined; // Hide password
  newUser.__v = undefined; // Hide key

  res
    .status(200)
    .send({ data: newUser, message: "Account created successfully" });
});

export default router;
