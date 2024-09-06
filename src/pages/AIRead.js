// import React, { useState,useEffect } from 'react';

// import ReactMarkdown from 'react-markdown'
// import ReactDom from 'react-dom'
// const AIRead = () => {

//   const [offline, setOffline] = useState(false);

//   useEffect(() => {
//     // Check for internet connectivity
//     const checkConnectivity = () => {
//       if (!navigator.onLine) {
//         setOffline(true);
//       } else {
//         setOffline(false);
//       }
//     };

//     // Check connectivity on page load
//     checkConnectivity();

//     // Add event listener to check connectivity changes
//     window.addEventListener('online', checkConnectivity);
//     window.addEventListener('offline', checkConnectivity);

//     // Clean up event listeners
//     return () => {
//       window.removeEventListener('online', checkConnectivity);
//       window.removeEventListener('offline', checkConnectivity);
//     };
//   }, []);
// let storedBlog=""
// storedBlog=localStorage.getItem('blog');
//   if (offline) {
//     storedBlog = localStorage.getItem('blog');
//   }

//   return (
//     <div className="relative [background:linear-gradient(110.84deg,_#ffd293,_#fffab7_48.96%,_rgba(255,_255,_255,_0))] box-border w-full h-[1353px] overflow-hidden flex flex-col py-[68px] px-[109px] items-center justify-start gap-[69px] text-center text-41xl text-black font-roboto border-[1px] border-solid border-gray-600">
//       <div className="self-stretch flex flex-col py-[17px] px-0 items-center justify-center">
//         <div className="self-stretch relative leading-[75.5px] capitalize font-medium">
//           AI Read
//         </div>
//       </div>
//       <div className="self-stretch flex-1 rounded-xl flex flex-row items-center justify-center text-left text-13xl text-gray-400 font-inter">
//         <div className="self-stretch flex-1 rounded-xl bg-text-white flex flex-col py-[107px] px-0 items-center justify-start">
//           <div className="relative leading-[130%] inline-block w-full px-2 h-[1038px] shrink-0">


// {<ReactMarkdown >{storedBlog}</ReactMarkdown>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AIRead;


import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDOM from 'react-dom';
import Markdown from './markdown';
// Correct import for ReactDOM

const AIRead = () => {
  const [offline, setOffline] = useState(false);
  const storedBlog = "# Strings in Python\n\nIn Python, a string is a sequence of characters enclosed within either single quotes (`'`) or double quotes (`\"`). Strings are widely used for representing text data in programs.\n\n## Creating Strings\n\nYou can create a string by enclosing text within quotes:\n\n```python\nsingle_quoted = 'This is a single-quoted string.'\ndouble_quoted = \"This is a double-quoted string.\"\n```\n\n## String Operations\n\n### Concatenation\n\nStrings can be concatenated using the `+` operator:\n\n```python\nfirst_name = \"John\"\nlast_name = \"Doe\"\nfull_name = first_name + \" \" + last_name  # Results in \"John Doe\"\n```\n\n### Repetition\n\nYou can repeat a string using the `*` operator:\n\n```python\nrepeated_text = \"Hello \" * 3  # Results in \"Hello Hello Hello \"\n```\n\n### Indexing\n\nIndividual characters within a string can be accessed using indexing, starting from 0:\n\n```python\ntext = \"Python\"\nfirst_character = text[0]  # Results in \"P\"\nthird_character = text[2]   # Results in \"t\"\n```\n\n### Slicing\n\nYou can extract a portion of a string using slicing:\n\n```python\ntext = \"Hello, World!\"\nsubstring = text[7:12]  # Results in \"World\"\n```\n\n### String Length\n\nThe `len()` function returns the length of a string:\n\n```python\ntext = \"Python\"\nlength = len(text)  # Results in 6\n```\n\n### String Methods\n\nPython provides a variety of built-in string methods for manipulation, such as `lower()`, `upper()`, `strip()`, and more:\n\n```python\ntext = \"  Hello, World!  \"\nlowercase = text.lower()           # Converts to lowercase\nuppercase = text.upper()           # Converts to uppercase\nstripped = text.strip()            # Removes leading and trailing spaces\nsplit_words = text.split(\", \")     # Splits the string into a list [\"Hello\", \"World!\"]\n```\n\n## String Formatting\n\n### Using f-strings\n\nFormatted strings (f-strings) allow you to embed expressions inside string literals:\n\n```python\nname = \"Alice\"\nage = 30\ngreeting = f\"Hello, my name is {name} and I am {age} years old.\"\n```\n\n### Using the `format()` Method\n\nThe `format()` method is another way to format strings:\n\n```python\nitem = \"apple\"\nquantity = 5\nprice = 0.75\norder_summary = \"I want to buy {} {}s for ${:.2f}.\".format(quantity, item, quantity * price)\n```\n\n## Escape Sequences\n\nEscape sequences allow you to include special characters in strings:\n\n- `\\\"` : Double quote\n- `\\'` : Single quote\n- `\\\\` : Backslash\n- `\\n` : Newline\n- `\\t` : Tab\n\n```python\nmessage = \"She said, \\\"Hello!\\\"\"\npath = \"C:\\\\Users\\\\Username\\\\Documents\"\n```\n\nStrings are fundamental data types in Python and are used extensively for various purposes, including text processing, formatting, and more.\n"


  console.log(storedBlog);

  useEffect(() => {
    const checkConnectivity = () => {
      if (!navigator.onLine) {
        setOffline(true);
      } else {
        setOffline(false);
      }
    };

    checkConnectivity();
    window.addEventListener('online', checkConnectivity);
    window.addEventListener('offline', checkConnectivity);

    return () => {
      window.removeEventListener('online', checkConnectivity);
      window.removeEventListener('offline', checkConnectivity);
    };
  }, []);


  return (
    <div className='bg-black'>
   <Markdown markdown={storedBlog}/>
    </div>
 
  );
};

export default AIRead;
