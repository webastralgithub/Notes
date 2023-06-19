import React, { Component, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState} from 'draft-js';
import { convertToHTML } from 'draft-convert'

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function TextEditor({setNotesText}){
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    setNotesText(currentContentAsHTML)
    console.log(currentContentAsHTML)
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        editorStyle={{ border: "1px solid black" ,height:"300px"}}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
     
 </div>
  )
     }
  