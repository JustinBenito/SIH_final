import React from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleQuery = async (msg) => {
    try {
        console.log('hereiam', msg)
        const headers = {
            "Content-Type": "application/json",
          };

          const requestOptions = {
            method: 'POST',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyBtUBoTPu28_jkmNWBZr7iEJE4mWHpgsVI',
            headers: headers,
            data: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: msg }
                  ]
                }
              ],
            
            })
          };
      const response = await axios(requestOptions)
      .then(response => response)
      .catch(error => console.error(error));
      let text=""
      if (response){
         text = await response.data.candidates[0].content.parts[0].text
    };
        console.log("response",text)
      const url = 'https://google-translator9.p.rapidapi.com/v2';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'application/gzip',
          'X-RapidAPI-Key': 'fb8e1f528emsh30c134b686ec21ep1855c5jsn1ad3efb17a1b',
          'X-RapidAPI-Host': 'google-translator9.p.rapidapi.com'
        },
        body: new URLSearchParams({
          q: text, // Use the text to be translated
          target: 'pa', // Specify the target language as 'ta' for Tamil
          source: 'en' // Specify the source language as 'en' for English
        }).toString()
      };

      const tamils = await fetch(url, options);
      const translationResponse = await tamils.json();
      const tamilTranslation = translationResponse.data.translations[0].translatedText;

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