import jwt from "jsonwebtoken";

const getToken = async (email, user) => {
  // Assume this code is complete
  const token = jwt.sign({ identifier: user._id }, process.env.JWT_SECRET);
  return token;
};

export default getToken;
