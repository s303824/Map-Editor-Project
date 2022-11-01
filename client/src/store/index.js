import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    DEFAULT: "DEFAULT",
    LOAD_PUBLISHED_MAPS: "LOAD PUBLISHED MAPS",
    LOAD_USER_MAPS: "LOAD USER MAPS",
    SET_THE_CURRENT_MAP: "SET THE CURRENT MAP",
    SET_THE_CURRENT_PUBLISHED_MAP: "SET THE CURRENT PUBLISHED MAP",
    SET_THE_CURRENT_LAYER: "SET THE CURRENT LAYER",
    SET_THE_CURRENT_TILESET: "SET THE CURRENT TILESET",
    SET_THE_CURRENT_TILE: "SET THE CURRENT TILE",
    SET_THE_SELECTED_MAP_EDIT_TOOL: "SET THE SELECTED MAP EDIT TOOL",
    SET_THE_CAN_UNDO: "SET THE CAN UNDO",
    SET_THE_CAN_REDO: "SET THE CAN REDO",
    SET_THE_SEARCH_CRITERIA: "SET THE SEARCH CRITERIA",
    SET_THE_OPEN_MODAL: "SET THE OPEN MODAL",
    SET_THE_MAP_MARKED_FOR_DELETETION: "SET THE MAP MARKED FOR DELETETION"
}

const [store, setStore] = useState({

    publishedMaps:[ ],              //holds all the published maps
    userMaps:[ ],                      //holds all the maps created by the user
    currentMap:[ ],                    //holds the current map opened for editing
    currentPublishedMap:[ ],     //holds the current published map opened for viewing
    currentLayer:[ ],                 //holds the the layer that is now being modified in the map editor.       
    currentTileSet:[ ],               //holds the the tileset that is now being displayed in the map editor.
    currentTile:null,                 //holds the tile selected from the current tileset
    tilesetBeingEdited:[],        //holds the tileset that is opened for editing
    selectedMapEditTool:"",  //used to control editing actions 
    canUndo:false,                 //used to control undo button 
    canRedo:false,                  //used to control redo button
    searchCriteria:"",            //controls the search results
    openModal:"",       //used to open/close modals in the app(team manangement,settings..)
    mapMarkedForDeletion: null,          
    });

// const tps : jsTPS

function GlobalStoreContextProvider(props) {

    const storeReducer = (action) => {
        const {type, payload} = action

        switch(type) {
            default:
                return store;
        }
    }


    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        map: null,
    });

    
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );

}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };