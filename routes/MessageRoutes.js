const express = require("express");
const router = express.Router();
const{
    addMessage,
    getMessages
}= require("../controllers/MessageController")

router.post("/addMessage",addMessage)
router.get("/getMessages/:conversationId", getMessages)

module.exports = router;