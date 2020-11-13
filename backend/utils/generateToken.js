import jwt from "jsonwebtoken";

//to generate a token we need
//install jsonwebtoken in the root
//create a env variable : i.e. : JWT_SECRET = thiscanbewhateveryoudecide
//in the usercontroller, the returned token key will use the generateToken function to get the id /token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken; //exported to usercontroller
