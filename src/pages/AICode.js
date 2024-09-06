import MonacoEditor from '@monaco-editor/react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import React, { useState, useEffect } from "react";
import Typewriter from 'typewriter-effect';
import OpenAI from "openai";
import { useLocation } from 'react-router-dom';


const AICode = () => {
const [title, setTitle]=useState('Strings')
const [skill, setSkill]=useState('Beginner')
const [lang, setLang]=useState('python')

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
  maxRetries: 0,
});

const location = useLocation();

// Access props from the state object
const { state: props } = location;

if (props !== null) {
  const { lang1, skill1, title1 } = props;

  if (lang1 !== undefined) {
    const modifiedLang = lang1.toString().toLowerCase();
    setLang(modifiedLang);
  }

  if (skill1 !== undefined) {
    setSkill(skill1);
  }

  if (title1 !== undefined) {
    setTitle(title1);
  }

  console.log("1", lang1, skill1, title1);
}
console.log("2", lang, skill, title);
// Now you can use the prop

  const [chatInput, setChatInp]=useState()

  const [resp,setResp]=useState({})
  const [enableTypewriter, setEnableTypewriter] = useState(false);

  const [explain, setExplain]=useState('')

  const [query, setQuery]=useState('')

  const [msg,setMsg]=useState('')
  
  useEffect(()=>{
    if(title !='' && skill!='' && lang!=''){
      const messages = [
        {role:'system',content: "Only use the function I provide"},
        { role: "user", content: `Give me a coding question for ${title} a ${skill} level. I want a JSON response.
        of the question, output, input like this
        ` },
      ];


      
      const functions = [
        {
          name: "getquestion",
          description: `Get a coding question which is highly relevant to this ${title} and can be solved by a user in ${skill} level in this ${lang} language . I want a JSON response.
          of the question, output, input like this 
          {
            question: "generated question",
            input: "what are the inputs",
            output: "what is the expected output for the generated question"
          }`,
          parameters: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: `The coding question, e.g Write a program to check palindrome`,
              },
              input: { 
                type: "string", 
                description: `the necessary input values eg. madam or 50`
              },
              output: { 
                type: "string", 
                description: `the expected output for the coding question with the input values eg. true or 65`
              },
            },
            required: ["question",'input','output'],
          },
        },
      ];

    async function fetchData() {
      try {
        // Your async code here
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo-0613',
          messages: messages,
          functions: functions,
          function_call: 'auto',
        });
        
        console.log(response)
        const response_message = response.choices[0].message;
        if (!response_message.content) {
          const resp_args = JSON.parse(response_message.function_call.arguments);
          setResp(resp_args)
          setQues(resp_args.question)
          console.log('question: ', resp_args.question);
          console.log('input: ', resp_args.input);
          setChatInp(resp_args.input)
          console.log('output: ', resp_args.output);
        }
      } catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.error(error.status);  // e.g. 401
          console.error(error.message); // e.g. The authentication token you passed was invalid...
          console.error(error.code);  // e.g. 'invalid_api_key'
          console.error(error.type);  // e.g. 'invalid_request_error'
        } else {
          // Non-API error
          console.log(error);
        }
      }
    }
  
    fetchData();

    }

  },[title,skill,lang])

  
  const [input, setInput]=React.useState('');

  const [output, setOutput]=React.useState('');

  const [translate,setTranslate]=React.useState('');

  const [ques, setQues]=React.useState("")
  
  const [code1, setCode] = React.useState("");
  
  
  const handleSubmit = async()=>{
    const url = 'https://code-compiler10.p.rapidapi.com/';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'x-compile': 'rapidapi',
		'Content-Type': 'application/json',
		'X-RapidAPI-Key': 'd97c6a3da3msha0fb39354ee8db5p1efac8jsn16284e54f514',
		'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
	},
	body: JSON.stringify({
		langEnum: [
			'php',
			'python',
			'c',
			'c_cpp',
			'csharp',
			'kotlin',
			'golang',
			'r',
			'java',
			'typescript',
			'nodejs',
			'ruby',
			'perl',
			'swift',
			'fortran',
			'bash'
		],
		lang: 'python',
		code: code1,
		input: chatInput,
	})
};
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setOutput(result.output);
      console.log(result);
      
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleRun = async() => {
    console.log("run",lang,input,code1)
    const url = 'https://code-compiler10.p.rapidapi.com/';
    const options = {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        'x-compile': 'rapidapi',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'd97c6a3da3msha0fb39354ee8db5p1efac8jsn16284e54f514',
        'X-RapidAPI-Host': 'code-compiler10.p.rapidapi.com'
      },
      body: JSON.stringify({
        langEnum: [
          'php',
          'python',
          'c',
          'c_cpp',
          'csharp',
          'kotlin',
          'golang',
          'r',
          'java',
          'typescript',
          'nodejs',
          'ruby',
          'perl',
          'swift',
          'fortran',
          'bash'
        ],
        lang: lang,
        code: code1,
        input: "",
      })
    };

    
    try {

// const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
// const options = {
// 	method: 'POST',
// 	headers: {
// 		'content-type': 'application/json',
// 		'X-RapidAPI-Key': 'fdd20bf5b8msh7ae40a7bc92e6eep1156dfjsn9c466cb6de64',
// 		'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
// 	},
// 	body: JSON.stringify({
//     language: 'python3',
//     version: 'latest',
//     code: 'print(3)',
//     input: null
//   })
  
// };
      const response = await fetch(url, options);
      const result = await response.json();
      setOutput(result.output);
      console.log(result)
      
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log("Output changed but no change")
    if (output != "" && resp.output != "") {
      const cleanedOutput = (output || '').replace(/\s/g, '');
      const cleanedRespOutput = (resp.output || '').replace(/\s/g, '');
      console.log("done both are same")
      console.log("output:",output,"resp:",resp.output)
  
      if (cleanedOutput == cleanedRespOutput) {
        console.log("confirmed both are same")
        setExplain('Great you have done it, Congrats!');
        console.log("this is the explanation",explain)
        console.log("Setted Explain")
      }
    }
  }, [output, resp.output]);
  

	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();
  
	recognition.onstart = () => {
	  console.log("We are listening. Try speaking into the microphone.");
	};
  
	recognition.onspeechend = () => {
    
	  recognition.stop();
	};
  
	recognition.onresult = (event) => {
	  const result = event.results[0][0];
	  const recognizedText = result.transcript;
	  setQuery(recognizedText);
	  console.log(recognizedText)
	};
  
	const startRecognition = () => {
	  recognition.start();
	};
	

  const userQuery = async () => {
    console.log(query)
    console.log("handle query")
    if (output != undefined && resp.output != undefined) {
      const cleanedOutput = output.replace(/\s/g, '');
      const cleanedRespOutput = resp.output.replace(/\s/g, '');
      console.log("came inside userQuery")

      console.log("Opened the flood gates")
        const messages = [
          { role: 'system', content: 'Only use the function I provide' },
          {
            role: 'user',
            content: `What's wrong in this code, e.g., Print("hello")?`,
          },
        ];
        const functions = [
          {
            name: 'getcurrect',
            description: `${query} in this JSON format
            for this ${ques} and ${code1}
            {
              explanation: e.g., The code misses the closing (") so it is not working
            }`,
            parameters: {
              type: 'object',
              properties: {
                explanation: {
                  type: 'string',
                  description: 'Explain the question or the code why it does not work as expected',
                },
              },
              required: ['explanation'],
            },
          },
        ];

        console.log(messages,functions)
  
        async function fetchData() {
          try {
            // Your async code here
            const response = await openai.chat.completions.create({
              model: 'gpt-3.5-turbo-0613',
              messages: messages,
              functions: functions,
              function_call: 'auto',
            });
  
            console.log(response);
            const response_message = response.choices[0].message;
            if (!response_message.content) {
              const resp_args = JSON.parse(response_message.function_call.arguments);
              setExplain(resp_args.explanation);
            }
          } catch (error) {
            if (error instanceof OpenAI.APIError) {
              console.error(error.status); // e.g. 401
              console.error(error.message); // e.g. The authentication token you passed was invalid...
              console.error(error.code); // e.g. 'invalid_api_key'
              console.error(error.type); // e.g. 'invalid_request_error'
            } else {
              // Non-API error
              console.log(error);
            }
          }
        }
  
        fetchData();
      
    }
  };
  

  useEffect(() => {
    console.log("explain hook:",explain)
    if (explain!="") { // Only run if 'explain' has a value
      const handleQuery = async () => {
        console.log('handleQuery');
        const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'd97c6a3da3msha0fb39354ee8db5p1efac8jsn16284e54f514',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
          },
          body: JSON.stringify({
            q: explain,
            source: 'en',
            target: 'ta',
          }),
        };
  
        try {
          const tamils = await fetch(url, options);
          const translationResponse = await tamils.json();
          const tamilTranslation = translationResponse.data.translations.translatedText;
          setTranslate(tamilTranslation);
          responsiveVoice.speak(tamilTranslation, "Tamil Female");
          setEnableTypewriter(!enableTypewriter);
          console.log(tamilTranslation)
        } catch (error) {
          console.log('Request error:', error);
        }
      };
      handleQuery();
    }
  }, [explain]);
  



    return (
      <div className="h-full flex flex-col p-4 bg-black"> {/* Change background color to black */}
        {/* First Row */}
        <div className="flex-row flex gap-2 border border-gray-800 rounded-2xl ">
          {/* Left Column */}
          <div className="bg-black p-4 rounded-lg flex flex-col w-3/4">
            {/* Title */}
            <div className="text-center font-bold text-2xl mb-2 font-manrope text-white"> {/* Change text color to white */}
              AICode
            </div>
            {/* Monaco Editor */}
            <div className=" flex flex-col  rounded-2xl">
              <MonacoEditor
              height={600}
              value={code1}
              defaultValue="//write your code here"
              onChange={(e)=>{setCode(e)}}
                theme="vs-dark"
                language="python"
                options={{ automaticLayout: true }}
              />
              {/* Input Text Areas */}
              <div className="rounded-lg flex flex-row w-full gap-2 my-2">
                <button 
                onClick={handleSubmit}
                className="bg-white text-black px-4 py-2 rounded"> {/* Change button styles */}
                  Submit
                </button>
                <button 
                onClick={handleRun}
                className="bg-white text-black px-4 py-2 rounded"> {/* Change button styles */}
                  Run Code
                </button>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-2 flex-1 my-2 mx-2">
            <textarea placeholder='Input' className="border p-2 rounded-lg flex-1" value={input} onChange={(e)=>{setInput(e.target.value)}}></textarea>
            <textarea placeholder='Output' className="border p-2 rounded-lg flex-1" value={output} readOnly={true}></textarea>
          </div>
        </div>
  
        {/* Second Row */}
        <div className=" mt-4 border border-gray-800 p-4 rounded-lg bg-darkgray"> {/* Change background color to dark grey */}
            <div className="font-manrope text-green-300"> {/* Change text color to white */}
              {/* Text */}
              {!enableTypewriter && (<Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(`${ques} Wait for your problem statment ${input}`)
                .callFunction(() => {
                  console.log('String typed out!');
                })
            }}
              options={{
                deleteSpeed: 1000000000,
                loop:false,
                strings: [ques],
                autoStart: true,
                delay: 50,
              }}
            />)}
              {enableTypewriter && (
            <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString(translate)
                .callFunction(() => {
                  console.log('Explanation typed out!');
                  responsiveVoice.speak(translate,'Tamil Female');
                })
            }}
              options={{
                deleteSpeed: 100000,
                loop:false,
                strings: [translate],
                autoStart: true,
                delay: 50,
              }}
            />
          )}
            </div>
            {/* Chat Input */}
            <div className="flex">
              <input
                type="text"
                className="border p-2 rounded-l w-full bg-darkgray text-black placeholder-black" 
                placeholder="Ask Something" 
                value={query}
                onChange={(e)=>{setQuery(e.target.value)}}
              />
              <button 
              onClick={userQuery}
              onDoubleClick={startRecognition}
              className="bg-white text-black px-4 rounded-r hover:bg-blue-300 transition-all ease-in-out"> {/* Change button styles */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
        </div>
      </div>
    );
  };

export default AICode;