import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Signup page");
});

router.get("/login", (req, res) => {
  res.send("Login page");
});

router.get("/logout", (req, res) => {
  res.send("Logout page");
});

export default router;
