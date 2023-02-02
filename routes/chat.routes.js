const router = require("express").Router();
const Chat = require("../models/Chat.model");

router.get("/chat", async (req, res, next) => {
  try {
    const findAllofChat = await Chat.find({}).populate("user");
    console.log(findAllofChat);
    res.json({ findAllofChat: findAllofChat });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
