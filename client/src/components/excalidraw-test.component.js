import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import "../App.css"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AuthContext from '../auth';
import { useRef } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";

function ExcalidrawTest() {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'natialemu47'
        }
     });

    let editorRef = useRef();
    const myImage = cld.image('v1670625672/Tileslate/plain-white-background-or-wallpaper-abstract-image-2E064N7_gbgqgo.jpg');
        
    const src = myImage.resize(fill().width(500).height(500)).toURL();
   

    let editor = <ImageEditor
                    ref = {editorRef}
                    includeUI={{
                    loadImage: {
                        path: src,
                        name: 'SampleImage',
             
                    },

                    menu: ['shape', 'filter', 'draw'],
                    initMenu: 'filter',
                    uiSize: {
                        width: '100%',
                        height: '100%',
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
        <Box className="App" sx={{height:"1000px"}}>
            {editor}
             <button onClick={() => handleClickButton()}>Flip image by X Axis!</button>
             
        </Box>
    );
}
  
  export default ExcalidrawTest;