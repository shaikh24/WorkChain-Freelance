const Message = require('../models/Message');
const { io } = require('../server');

exports.createMessage = async (req, res) => {
  try {
    const { roomId, text, attachments } = req.body;
    const sender = req.user ? req.user._id : null;
    const message = new Message({
      roomId, text, attachments: attachments || [], sender,
      readBy: sender ? [sender] : []
    });
    await message.save();
    // Emit to room via socket.io
    try { io.to(roomId).emit('receiveMessage', message); } catch(e){ console.error('emit err', e); }
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessagesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.markRead = async (req, res) => {
  try {
    const { roomId } = req.body;
    const userId = req.user._id;
    await Message.updateMany({ roomId, readBy: { $ne: userId } }, { $push: { readBy: userId } });
    try { io.to(roomId).emit('messagesRead', { roomId, userId }); } catch(e){}
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
