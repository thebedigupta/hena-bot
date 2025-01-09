const { text } = require('express');
const { axiosInstance } = require('./axios');

function sendMessage(messageObj, messageText) {
  return axiosInstance.get('sendMessage', {
    chat_id: messageObj.chat.id,
    text: messageText,
  });
}

function handleMessage(messageObj) {
  const messageText = messageObj.text || '';
  if (messageText.charAt(0) === '/') {
    const command = messageText.substr(1);
    switch (command) {
      case 'start':
        return sendMessage(
          messageObj,
          'Hi,I am a bot. I can help you to get started'
        );
      case 'test':
        return sendMessage(
          messageObj,
          'Come On tell me What I can do for you I am alive ☺️'
        );
      case 'courses':
        return sendMessage(messageObj, `No Courses Avaliable Right Now`);

      default:
        return sendMessage(messageObj, "Hi, I don't know that command");
    }
  } else {
    return sendMessage(messageObj, 'Sorry not programmed for this command 😕');
  }
}

module.exports = { handleMessage };
