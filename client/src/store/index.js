import { createContext, useContext, useState } from 'react'
import { useHistory, useNavigate } from 'react-router-dom'
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
    SET_THE_MAP_MARKED_FOR_DELETION: "SET_THE_MAP_MARKED_FOR_DELETION"
}

/*
 const tps : jsTPS
*/

function GlobalStoreContextProvider(props) {

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        publishedMaps: [ ],              //holds all the published maps
        userMaps: [ ],                      //holds all the maps created by the user
        currentMap: [ ],                    //holds the current map opened for editing
        currentPublishedMap:[ ],     //holds the current published map opened for viewing
        currentLayer: [ ],                 //holds the the layer that is now being modified in the map editor.       
        currentTileSet: [ ],               //holds the the tileset that is now being displayed in the map editor.
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

    const storeReducer = (action) => {
        const {type, payload} = action;
        if(!GlobalStoreActionType.has(type)){
            throw new Error("Incorrect Type. Choose one of the existing action types.");
        }
        switch(type) {
            case GlobalStoreActionType.LOAD_PUBLISHED_MAPS:
                return setStore({
                    publishedMaps: payload,              
                    userMaps: [ ],                      
                    currentMap: [ ],                    
                    currentPublishedMap:[ ],     
                    currentLayer: [ ],       
                    currentTileSet: [ ],              
                    currentTile: null,
                    tilesetBeingEdited: [],        
                    selectedMapEditTool: "",   
                    canUndo: false,                  
                    canRedo: false,                  
                    searchCriteria: "",            
                    openModal: "",       
                    mapMarkedForDeletion: null
                })
            
            case GlobalStoreActionType.LOAD_USER_MAPS:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: payload.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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

            case GlobalStoreActionType.SET_THE_CURRENT_PUBLISHED_MAP:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
            case GlobalStoreActionType.SET_THE_CURRENT_LAYER:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
            case GlobalStoreActionType.SET_THE_CURRENT_TILESET:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
            case GlobalStoreActionType.SET_THE_CURRENT_TILE:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
            case GlobalStoreActionType.SET_THE_SELECTED_MAP_EDIT_TOOL:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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

            case GlobalStoreActionType.SET_THE_CAN_UNDO:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
            case GlobalStoreActionType.SET_THE_MAP_MARKED_FOR_DELETETION:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                      
                    currentMap: store.currentMap,                    
                    currentPublishedMap: store.currentPublishedMap,     
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
store.loadUserMaps = async function () {
    let response = await api.getAllMapInfoByUser(auth.user);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_USER_MAPS,
            payload: {
                userMaps: response.data.mapInfos
            }
        });
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
store.updateMapLike= async function (mapId) {
    let map = api.getMapInfo(mapId)
    map.likes = map.likes + 1
    const response = api.updateMapInfo(map);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
            payload: {
                
            }
        });
    }
}

//Updates the number of dislikes for the published map
store.updateMapDisLike= async function (mapId) {
    let map = api.getMapInfo(mapId)
    map.likes = map.dislikes - 1
    const response = api.updateMapInfo(map);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
            payload: {
                
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

//Deletes the selected map 
store.deleteMap= async function (mapId) {
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
store.setCurrentTile = function (id) {}

// Sets the current tileset
store.setCurrentTileset = function (id) {}

// Sets the current layer being edited
store.setCurrentLayer = function (id) {}

// Sets the current map editing tool 
store.setCurrentMapEditingTool = function (selectedTool) {}

 //Undo the latest transaction 
store.undoUserEdit = function () {}

//Redo the latest transaction 
store.redoUserEdit = function () {}

//Paints the selected currentlayer's tile with the "currentTile" 
store.paintTile = function () {}

//Deletes the selected tile from the current layer 
store.deleteTile = function (tileToBeDeleted) {} 

//Paints all tiles in the current layer with the "currentTile" 
store.paintLayer= function () {}

//Saves the "currentMap" to database with the edits made by user
store.saveCurrentMap = async function () {}

//Saves the current map and adds it to the publishedMaps  
store.publishCurrentMap = async function () {}

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

//Updates the number of likes for the published map
store.updateMapLike= async function (mapId) {}

//Updates the number of dislikes for the published map
store.updateMapDisLike= async function (mapId) {}

//Updates the number of downloads for the published map and returns the associated json file to user
store.downloadMap= async function (mapId) {}

//Sets "openmodal" and allows the different modal to open/close based on user action. 
store.setopenModal =  function (modalType) {} 

//Opens the map editor and sets the currentMap
store.loadMapEditor= async function (mapId) {

}

//Opens the map viewer and sets the currentPublishedMap 
store.loadMapViewer= async function (mapId) {
    const response = api.getMap(mapId);
    if (response.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
            payload: {
                currentMap: response.body 
            }
        });
    }
}

//Adds a new comment to the map 
store.addComment= async function (mapId,comment) {}

//Removes the editing permission(for currentMap) from the selected user
store.removeTeamMember = async function (userId) {}

//Adds the editing permission(for currentMap) for the user
store.addTeamMember = async function (userId) {}

//Updates the map info based on the user input 
store.changeMapSettings = async function (mapInfo) {}


    return (
        <GlobalStoreContext.Provider value={{store}}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };