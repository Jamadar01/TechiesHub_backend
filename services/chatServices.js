const Chat = require("../mongooseModels/Chat");
const Message = require("../mongooseModels/Message");

const accessChat = async (req, res) => {
  const { userId1, userId2 } = req.body;
  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [userId1, userId2] },
    });

    if (!chat) {
      chat = await Chat.create({ users: [userId1, userId2] });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $in: [req.query.userId] } })
      .populate("users", "username profilePicture")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroupChat = async (req, res) => {
  const { users, chatName, adminId } = req.body;
  try {
    const groupChat = await Chat.create({
      chatName,
      users,
      isGroupChat: true,
      groupAdmin: adminId,
    });
    res.status(201).json(groupChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { senderId, content, chatId } = req.body;
  try {
    const message = await Message.create({
      sender: senderId,
      content,
      chat: chatId,
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "username profilePicture");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { accessChat, fetchChats, createGroupChat, sendMessage, fetchMessages };
