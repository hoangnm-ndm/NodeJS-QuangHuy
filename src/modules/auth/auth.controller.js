import bcrypt from "bcryptjs";
import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.config.js";

export const authController = {
  register: async (req, res) => {
    const { email, password } = req.body;
    /**
     * * validation
     * * hash password
     * * check email exist
     * * tao new user
     */
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    newUser.password = undefined;
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
    const isMatch = bcrypt.compareSync(password, userExist.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const accessToken = jwt.sign(
      { userId: userExist._id },
      envConfig.JWT_ACCESS_SECRET,
      {
        expiresIn: "1h",
      },
    );

    const refreshToken = jwt.sign(
      { userId: userExist._id },
      envConfig.JWT_REFRESH_SECRET,
      {
        expiresIn: "17d",
      },
    );

    userExist.password = undefined;

    res.status(200).json({
      message: "Login successfully",
      user: userExist,
      accessToken,
      refreshToken,
    });
  },
  // register: async (req, res) => {},
  // register: async (req, res) => {},
};
