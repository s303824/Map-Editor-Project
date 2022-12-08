import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import {Excalidraw} from "@excalidraw/excalidraw"
import { useRef } from 'react';
import initalData from "./initalData"
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

function ExcalidrawTest() {

  let editorRef = useRef();
    let imagePath = 'https://res.cloudinary.com/natialemu47/image/upload/v1669851225/Tileslate/map-card-7_xhnvme.jpg'

    let editor = <ImageEditor
    ref = {editorRef}
    includeUI={{
      loadImage: {
        path: imagePath,
        name: 'SampleImage',
      },
      
      menu: ['shape', 'filter', 'draw'],
      initMenu: 'filter',
      uiSize: {
        width: '1200px',
        height: '1100px',
      },
      menuBarPosition: 'bottom',
    }}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70,
    }}
    usageStatistics={true}
  />

  const handleClickButton = () => {
    const editorInstance = editorRef.current.getInstance();

    editorInstance.flipX();
  };


  return (
    <Box className="App" sx={{marginLeft:50}}>
      {editor}
      <button onClick={() => handleClickButton()}>Flip image by X Axis!</button>
    </Box>
  );

  }
  
  export default ExcalidrawTest;