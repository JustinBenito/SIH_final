import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Hi This is Mimi, Your personal AI Guru`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: 'rgb(96 165 250 / var(--tw-bg-opacity))',
    },
    chatButton: {
      backgroundColor: 'black',
    },
  },
};

export default config;