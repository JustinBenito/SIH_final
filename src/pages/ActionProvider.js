import React from 'react';
import axios from 'axios';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuery = async (msg) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/ai?q=${msg}`);


      
      const text = await response.data.res.response;
        console.log("response",text)
        const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'fdd20bf5b8msh7ae40a7bc92e6eep1156dfjsn9c466cb6de64',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
          },
          body: JSON.stringify({
            q: text,
            source: 'en',
            target: 'ta',
          }),
        };

      const tamils = await fetch(url, options);
      console.log("tamils",tamils)
      const translationResponse = await tamils.json();
      console.log("translationResponse",translationResponse)
      const tamilTranslation = translationResponse.data.translations.translatedText;
      console.log("tamilTranslation",tamilTranslation)
      const botMessage = createChatBotMessage(tamilTranslation);
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.log('Request error:', error);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleQuery },
        });
      })}
    </div>
  );
};

export default ActionProvider;