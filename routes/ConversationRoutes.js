const express = require("express");
const router = express.Router();
const{
    newConversation,
    getConversationOfUser,
    getConversationOfTwoUser
}= require("../controllers/ConversationController")

router.post("/newConversation",newConversation)
router.get("/getConversationOfUser/:email", getConversationOfUser)
router.get("/getConversationOfTwoUser/:firstUserEmail/:secondUserEmail", getConversationOfTwoUser)

module.exports = router;