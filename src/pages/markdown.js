import {React, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

// const initialContent = localStorage.getItem("editorContent");

export default function Markdown({markdown}) {
    const editor = useBlockNote({
        editable: false,
        // initialContent : part,
        
});
    useEffect(() => {
        const getBlocks = async () => {
            const blocks = await editor.markdownToBlocks(markdown);
            editor.replaceBlocks(editor.topLevelBlocks, blocks);
          };
          getBlocks();
      }, [markdown]);

    // const blk ={
    //     content: markdown
    // }
    // const part=[blk]



          return <BlockNoteView editor={editor} theme={"light"} />;
}


// // // Gets the previously stored editor contents.
// // const initialContent = localStorage.getItem("editorContent");

// // export default function App() {
// //   // Creates a new editor instance.
// //   const editor: BlockNoteEditor | null = useBlockNote({
// //     // If the editor contents were previously saved, restores them.
// //     initialContent: initialContent ? JSON.parse(initialContent) : undefined,
// //     // Serializes and saves the editor contents to local storage.
// //     onEditorContentChange: (editor) => {
// //       localStorage.setItem(
// //         "editorContent",
// //         JSON.stringify(editor.topLevelBlocks)
// //       );
// //     }
// //   });

// //   // Renders the editor instance.
// //   return <BlockNoteView editor={editor} theme={"light"} />;
// // }

// import React from 'react';
// import ReactMarkdown from 'react-markdown';

// const Markdown = ({ markdown }) => {
//   return <ReactMarkdown>{markdown}</ReactMarkdown>;
// };

// export default Markdown;

// import React from 'react';
// import marked from 'marked';

// const Markdown = ({ markdownContent }) => {

//   return marked.parse(markdownContent)
// };

// export default Markdown;

