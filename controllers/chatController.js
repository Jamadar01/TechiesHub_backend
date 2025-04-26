import express from 'express';
import { accessChat, fetchChats, createGroupChat, sendMessage, fetchMessages } from '../services/chatServices.js';

const router = express.Router();

router.post('/', accessChat); // Start chat
router.get('/', fetchChats);  // Fetch user's chats
router.post('/group', createGroupChat); // Create group chat
router.post('/message', sendMessage); // Send message
router.get('/message/:chatId', fetchMessages); // Get messages for a chat

export default router;
