import { userModel } from "../model/user.schema";

export const register = async (req, res) => {
    const { userName, email, Password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.json({ message: "user already exist" });
    }
    const hashpassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      userName,
      email,
      Password: hashpassword,
    });
  
    await newUser.save();
    return res.json({ status: true, message: "record registerd" });
  };