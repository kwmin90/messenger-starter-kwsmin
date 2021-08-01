const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, read } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const conv = await Conversation.findByPk(conversationId);
      if (conv.user1Id === senderId || conv.user2Id === senderId) {
        if (read) {
          const message = await Message.create({
            senderId,
            text,
            conversationId,
            read,
          });
          return res.json({ message, sender });
        } else {
          const message = await Message.create({
            senderId,
            text,
            conversationId,
          });
          return res.json({ message, sender });
        }
      } else return res.sendStatus(403);
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { convId, otherUserId } = req.body;
    if (convId) {
      await Message.update(
        { read: true },
        { where: { conversationId: convId, senderId: otherUserId } }
      );
      return res.sendStatus(204);
    } else return res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
