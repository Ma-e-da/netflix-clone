import { User } from "../models/user.model.js";

export async function signup(req, res) {
  try {
    const { email, passoword, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "すべてのフィールドを入力してください",
      });
    }
    const emailRefex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "無効なメールです" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "パスワードは６文字以下にしてください",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "メールアドレスはすでに存在します",
      });
    }
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password,
      username,
      image,
    });

    await newUser.save();
  } catch (error) {
    console.log("Signupコントローラーでエラー", error.message);
    res
      .status(500)
      .json({ success: false, message: "インターナルサーバーエラー" });
  }
}

export async function login(req, res) {
  res.send("Login");
}

export async function logout(req, res) {
  res.send("Logout");
}
