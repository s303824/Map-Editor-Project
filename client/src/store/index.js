import { breadcrumbsClasses } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth';


// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext();

export const GlobalStoreActionType = {
    LOAD_PUBLISHED_MAPS: "LOAD_PUBLISHED_MAPS",
    LOAD_USER_MAPS: "LOAD_USER_MAPS",
    SET_THE_CURRENT_MAP: "SET_THE_CURRENT_MAP",
    SET_THE_CURRENT_PUBLISHED_MAP: "SET_THE_CURRENT_PUBLISHED_MAP",
    SET_THE_CURRENT_LAYER: "SET_THE_CURRENT_LAYER",
    SET_THE_CURRENT_TILESET: "SET_THE_CURRENT_TILESET",
    SET_THE_CURRENT_TILE: "SET_THE_CURRENT_TILE",
    SET_THE_SELECTED_MAP_EDIT_TOOL: "SET_THE_SELECTED_MAP_EDIT_TOOL",
    SET_THE_CAN_UNDO: "SET_THE_CAN_UNDO",
    SET_THE_CAN_REDO: "SET_THE_CAN_REDO",
    SET_THE_SEARCH_CRITERIA: "SET_THE_SEARCH_CRITERIA",
    SET_THE_OPEN_MODAL: "SET_THE_OPEN_MODAL",
    SET_THE_MAP_MARKED_FOR_DELETION: "SET_THE_MAP_MARKED_FOR_DELETION",
    UPDATE_MAP_INFO: "UPDATE_MAP_INFO"
}

function GlobalStoreContextProvider(props) {

    const layer = [
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":20,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":30,
         "x":0,
         "y":0
        }]

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        publishedMaps: [],              //holds all the published maps
        userMaps: [],                      //holds all the maps created by the user
        currentMap: {},                    //holds the current map opened for editing
        currentPublishedMap:[],     //holds the current published map opened for viewing
        currentMapInfo:[],             //current open map mapInfo
        currentLayer:[
            {
             "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             "height":20,
             "id":1,
             "name":"Tile Layer 1",
             "opacity":1,
             "type":"tilelayer",
             "visible":true,
             "width":30,
             "x":0,
             "y":0
            }],                 //holds the the layer that is now being modified in the map editor.       
        currentTileSet: [],               //holds the the tileset that is now being displayed in the map editor.
        currentTile: null,                 //holds the tile selected from the current tileset
        tilesetBeingEdited: [],        //holds the tileset that is opened for editing
        selectedMapEditTool: "",  //used to control editing actions 
        canUndo: false,                 //used to control undo button 
        canRedo: false,                  //used to control redo button
        searchCriteria: "",            //controls the search results
        openModal: "",       //used to open/close modals in the app(team manangement,settings..)
        mapMarkedForDeletion: null          
    });
    const history = useNavigate();
    const {auth} = useContext(AuthContext);
    const navigate= useNavigate();

    const storeReducer = (action) => {
        const {type, payload} = action;
        console.log(payload)
        switch(type) {
            case GlobalStoreActionType.LOAD_PUBLISHED_MAPS:
                return setStore({
                    publishedMaps: payload.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,     
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            
            case GlobalStoreActionType.LOAD_USER_MAPS:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: payload.userMaps,                      
                    currentMap: payload.currentMap ? payload.currentMap : store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:payload.mapInfo ? payload.mapInfo : store.currentMapInfo, 
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })

            case GlobalStoreActionType.SET_THE_CURRENT_MAP:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: payload.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:payload.mapInfo,      
                    currentLayer:store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })

            case GlobalStoreActionType.SET_THE_CURRENT_PUBLISHED_MAP:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: payload.currentMap ? payload.currentMap : store.currentMap,                    
                    currentPublishedMap: payload.mapInfo, 
                    currentMapInfo:payload.mapInfo,     
                    currentLayer:store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_CURRENT_LAYER:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: payload.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_CURRENT_TILESET:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: payload.currentTileSet,          
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_CURRENT_TILE:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: payload.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_SELECTED_MAP_EDIT_TOOL:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: payload.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })

            case GlobalStoreActionType.SET_THE_CAN_UNDO:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_CAN_REDO:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_SEARCH_CRITERIA:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })

            case GlobalStoreActionType.SET_THE_OPEN_MODAL:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion
                })
            case GlobalStoreActionType.SET_THE_MAP_MARKED_FOR_DELETION:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: [],                    
                    currentPublishedMap: [], 
                    currentMapInfo:[],     
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: payload.mapMarkedForDeletion
                })
            case GlobalStoreActionType. UPDATE_MAP_INFO:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap, 
                    currentMapInfo:payload.mapInfo,     
                    currentLayer: store.currentLayer,       
                    currentTileSet: store.currentTileSet,              
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: payload.mapMarkedForDeletion
                })
            default:
                return store;
        }
    };


    //Loads different pages based on the path provided by the caller, uses useHistory() hook.
//homepage,myprojects,explore,settings,likedmaps
//store.loadPages(path);

//Loads all the published maps so we can display them 
store.loadPublishedMaps = async function ()  {
    const response = await api.getAllPublishedMapInfo();
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_PUBLISHED_MAPS,
            payload: {
                publishedMaps: response.body
            }
        });
    }
}

//Loads all the user maps so we can display them 
store.loadUserMaps = async function (username) {
    let response = await api.getAllMapInfoByUser(username)
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_USER_MAPS,
            payload: {
                userMaps: response.data.mapInfos
            }
        });
    }    
}

store.loadMapInfosByIds = async function(idList) {
    console.log(idList)
    if(idList.length == 0) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_PUBLISHED_MAPS,
            payload: {
                publishedMaps: []
            }
        })
        return;
    }

    let response = await api.getMapInfoByListOfIds(idList)
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_PUBLISHED_MAPS,
            payload: {
                publishedMaps: response.data.mapInfos
            }
        })
    }
}

store.getMapInfosSortedByLikes = async function() {
    let response = await api.getAllMapInfoSortedByLikes()
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_PUBLISHED_MAPS,
            payload: {
                publishedMaps: response.data.mapInfos
            }
        })
    }
}

//called when search is entered by the user
store.SearchButtonHelper = function () {
    const response = api.getMapInfo();
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_SEARCH_CRITERIA,
            payload: {
                
            }
        });
    }    
}

//Used to filter maps
store.searchKeyword =  function (keyword) {
    const response = api.getAllMapInfoByUser();
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_SEARCH_CRITERIA,
            payload: {
                
            }
        });
    }    
}

//Updates the number of likes for the published map
store.updateMapLike= async function (mapInfo, amount) {
    mapInfo.likes = mapInfo.likes + amount;
    const response = await api.updateMapInfo(mapInfo);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        });
    }
}

//Updates the number of dislikes for the published map
store.updateMapDislike= async function (mapInfo, amount) {
    mapInfo.dislikes = mapInfo.dislikes + amount;
    const response = await api.updateMapInfo(mapInfo);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        });
    }
}

//Updates the number of downloads for the published map and returns the associated json file to user
store.downloadMap= async function (mapId) {
    let map = api.getMapInfo(mapId)
    map.downloads = map.downloads + 1
    const response = api.updateMapInfo(map);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
            payload: {
                
            }
        });
    }
}

// Creates a map
store.setNewMap = async function(mapData){
    let response;
    
    try {
        response = await api.registerMap(mapData);
        if (response.status === 200) {
            console.log(response.data)
            storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                currentMap: response.data.map,
                mapInfo: response.data.mapInfo

            }});
        navigate("/editor/"+response.data.map._id)
        }
    }
    catch(error){
    storeReducer({
        type: GlobalStoreActionType.REGISTER_USER,
        payload: {
            currentMap: {}
        }
    });
    }
}


//Deletes the selected map 
store.deleteMap= async function (mapId) {
    console.log("MAPID FOR DELETE:" + mapId)
        try {
            const response = api.deleteMap(mapId);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_THE_MAP_MARKED_FOR_DELETION,
                payload: {
                    mapMarkedForDeletion : response.body
                }
            });
        }
    }
    catch(err) {
        console.log(err)
    }
}

store.searchByType = async function (type) {
    switch(type) {

        case "NAME":
            break;

        case "CATEGORY":
            break;
        
        case "USER":
            break;

    }
}

// Deletes the selected layer
store.deleteSelectedLayer = function (id) {
    
}

// Adds a new layer 
store.addNewLayer = async function (id, source) {}

// Changes the selected layer's name
store.changeLayerName = function (id, newName) {}

// Changes the current layer's precedence
store.changeLayerPrecedence = function (precedence) {}

// Opens up tileset editor for the selected tileset 
store.openTilesetForEditing= function (id) {}

//Saves the edited tileset 
 store.saveTileset= async function () {}

//Exports the edited tileset 
 store.exportTileset= async function () {}

// Adds a new tileset to the currentMap and updates tilesets[]  
store.importNewTileset = async function (id, source) {}

// Sets the current tile that is selected from the current tileset
store.setCurrentTile = function (id,value) {
    console.log("id",id);
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_TILE,
        payload: {
            currentTile : {id,value}
        }
    });
}

// Sets the current tileset
store.setCurrentTileset = function (id) {
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_TILESET,
        payload: {
            currentTileSet : {
                _id: 1,
                backgroundcolor: "#d31313",
                columns : 1,
                fillmode: "stretch",
                firstgid: 1 ,
                grid: {},
                image: '../assets/map-card.jpg',
                imageheight: "960",
                imagewidth: "960",
                margin: 2,
                name: "tileset 2",
                objectalignment: "top",
                properties:[
                                {
                                name:"myProperty2",
                                type:"string",
                                value:"myProperty2_value"
                                }],
                source : "tilelsate",
                tilecount: "225",
                tileslateversion: "1.0.1",
                tileheight: "64",
                tilerendersize: "10",
                tiles : [],
                tilewidth:"64",
                transparentcolor :  "#000000",
                type : "tileset",
                version : "1.1",
                wangsets: []
            }
        }
    });
   

}

store.handleMapAction = function (id,value) {
    if(store.selectedMapEditTool == "stamp"){
        store.paintTile(id,value);
    }else if(store.selectedMapEditTool == "paint"){
        store.paintLayer();
    }else if (store.selectedMapEditTool == "eraser"){
        store.deleteTile(id);
    }
}

// Sets the current layer being edited
store.setCurrentLayer = function (id) {
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer: [
                {
                 "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 "height":20,
                 "id":1,
                 "name":"Tile Layer 1",
                 "opacity":1,
                 "type":"tilelayer",
                 "visible":true,
                 "width":30,
                 "x":0,
                 "y":0
                }]
        }
    });

}

// Sets the current map editing tool
store.setCurrentMapEditingTool = function (selectedTool) {
    console.log(selectedTool);
    storeReducer({
        type: GlobalStoreActionType.SET_THE_SELECTED_MAP_EDIT_TOOL,
        payload: {
            selectedMapEditTool : selectedTool,
        }
    });
}

 //Undo the latest transaction 
store.undoUserEdit = function () {}

//Redo the latest transaction 
store.redoUserEdit = function () {}

//Paints the selected currentlayer's tile with the "currentTile" 
store.paintTile = function (id,value) {
    store.currentLayer[0].data[id]=(parseInt(store.currentTile.id)+ parseInt(store.currentTileSet.firstgid));
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

//Deletes the selected tile from the current layer 
store.deleteTile = function (id) {
    console.log("id geliyo",id);
    store.currentLayer[0].data[id]=0;
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}
//Paints all tiles in the current layer with the "currentTile" 
store.paintLayer= function () {
    let data = store.currentLayer[0].data;
    data.forEach((element, index) => {
        data[index] = (parseInt(store.currentTile.id)+ parseInt(store.currentTileSet.firstgid));
      })
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });

}

//Saves the "currentMap" to database with the edits made by user
store.saveCurrentMap = async function () {}

//Saves the current map and adds it to the publishedMaps  
store.publishCurrentMap = async function () {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;
    store.currentMapInfo.published = formattedToday;
    const response = await api.updateMapInfo(store.currentMapInfo);

    if(response.status === 200) {

        auth.user.publishedMaps.push(store.currentMapInfo._id);
        const response2 = await api.updateUser(auth.user);
        if(response2.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
        }
        navigate("/projects")
    }

}

store.unpublishCurrentMap = async function () {
    store.currentPublishedMap.published = "false";
    
    const response = await api.updateMapInfo(store.currentPublishedMap);

    if(response.status === 200) {

        auth.user.publishedMaps = auth.user.publishedMaps.filter(function(e) {return e != store.currentPublishedMap._id})
        const response2 = await api.updateUser(auth.user);
        if(response2.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
            navigate("/projects")
        }

    }
}

//Saves the current map and exports the json map data.  
store.exportCurrentMap = async function () {}

//Adds paint a tile transaction ,uses currentMap and currentLayer
store.addPaintTileTransaction = function (tile,tilecoord) {}

//Adds delete a tile transaction ,uses currentMap and currentLayer
store.addDeleteTileTransaction = function (tilecoord) {}

//Adds paint a layer transaction ,uses currentMap , currentLayer and currentTile.
store.addPaintLayerTransaction = function () {}

//Sets the canUndo 
store.canUndo = function () {}

//Sets the canRedo 
store.canRedo = function () {}

//Add paint a tile transaction to the transaction store
store.addPaintTileTransaction = function (layer, index, tile) {}

//Add delete a tile transaction to the transaction store
store.addDeleteTileTransaction = function (layer,index) {} 

//Add paint a layer transaction to the transaction store
store.addPaintLayerTransaction = function (layer,tile) {} 

//Updates the number of downloads for the published map and returns the associated json file to user
store.downloadMap= async function (mapId) {}

//Sets "openmodal" and allows the different modal to open/close based on user action. 
store.setopenModal =  function (modalType) {} 

//Opens the map editor and sets the currentMap
store.loadMapEditor= async function (mapId, mapInfo) {
    try {
        console.log(mapInfo)
        console.log(mapId)
        const response = await api.getMap(mapId);
        if (response.status === 200) {
            console.log(response.data)
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: mapInfo, 
                }
            });
        }
        else {
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: {},
                    mapInfo: {}, 
                }
            });
        }
    } catch (err) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
            payload: {
                currentMap: {},
                mapInfo: {}, 
            }
        });
    }
}

store.loadMapById = async function(_id) {
    try{
        console.log(_id)
        const response = await api.getMapInfo(_id)
        if(response.status===200) {

            const response2 = await api.getMap(response.data.mapInfo.map_id)
            if(response2.status === 200) {
                console.log(response2.data)
                storeReducer({
                    type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                    payload: {
                        mapInfo: response.data.mapInfo,
                        currentMap: response2.data.map, 
                    }
                });
            }

        }
    } catch(err) {
        console.log(err)
    }
}

//Opens the map viewer and sets the currentPublishedMap 
store.loadMapViewer= async function (mapId, mapInfo) {
    try {

        const response = await api.getMap(mapId);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_PUBLISHED_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: mapInfo, 
                }
            });
        }
        else {
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_PUBLISHED_MAP,
                payload: {
                    currentMap: {},
                    mapInfo: {}, 
                }
            });
        }
    } catch (err) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_PUBLISHED_MAP,
            payload: {
                currentMap: {},
                mapInfo: {}, 
            }
        });
    }
}

//Adds a new comment to the map 
store.addComment= async function (mapInfo,comment) {
    mapInfo.comments.push(comment)
    const response = await api.updateMapInfo(mapInfo);
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }
}


//Removes the editing permission(for currentMap) from the selected user
store.removeTeamMember = async function (_id, removedUsers) {
    const response = await api.removeCreator(store.currentMapInfo, removedUsers);
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }
}

//Adds the editing permission(for currentMap) for the user
store.addTeamMember = async function (_id, addedUsers) {
    const response = await api.addCreator(store.currentMapInfo, addedUsers);
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }

}

//Updates the map info based on the user input 
store.changeMapSettings = async function (_id, title, description, tags) {
    store.currentMapInfo.name = title;
    store.currentMapInfo.description = description;
    store.currentMapInfo.tags = tags;
    const response = await api.updateMapInfo(store.currentMapInfo);
    if(response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }

}

store.sendReport = async function(report) {
    console.log(store.currentPublishedMap._id)
    const response = await api.sendReport({report:report, mapInfo_id:store.currentPublishedMap._id})
    if(response.status === 200) {
        return true;
    }
}


    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };