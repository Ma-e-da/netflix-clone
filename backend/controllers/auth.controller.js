import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function signup(req, res) {
  try {
    // すべての項目を入力する
    const { email, passoword, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "すべてのフィールドを入力してください",
      });
    }

    // emailRegex
    const emailRefex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "無効なメールです" });
    }
    // パスワードの長さ
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "パスワードは６文字以下にしてください",
      });
    }
    //メールがすでに存在する場合
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "メールアドレスはすでに存在します",
      });
    }
    //ユーザー名がすでに存在する場合
    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "ユーザー名はすでに存在します",
      });
    }
    //hashedPassoword
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //プロフィールアバター
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    //新しいユーザー
    const newUser = new User({
      email, //email:email,
      password: hashedPassword,
      username, //username:username
      image,
    });

    //ユーザーを保存する
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
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
