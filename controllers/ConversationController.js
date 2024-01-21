const Conversation = require("../models/Conversation");


const newConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderEmail, req.body.receiverEmail],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.stautus(500).json(err);
  }
};


const getConversationOfUser =  async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.email] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getConversationOfTwoUser = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserEmail, req.params.secondUserEmail] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
    newConversation,
    getConversationOfUser,
    getConversationOfTwoUser,

}