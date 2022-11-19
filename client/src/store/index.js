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
    LOAD_SEARCH_RESULTS: "LOAD_SEARCH_RESULTS",
    SET_THE_CURRENT_MAP: "SET_THE_CURRENT_MAP",
    SET_THE_CURRENT_LAYER: "SET_THE_CURRENT_LAYER",
    SET_THE_CURRENT_TILESET: "SET_THE_CURRENT_TILESET",
    SET_THE_CURRENT_TILE: "SET_THE_CURRENT_TILE",
    SET_THE_SELECTED_MAP_EDIT_TOOL: "SET_THE_SELECTED_MAP_EDIT_TOOL",
    SET_THE_CAN_UNDO: "SET_THE_CAN_UNDO",
    SET_THE_CAN_REDO: "SET_THE_CAN_REDO",
    SET_THE_SEARCH_CRITERIA: "SET_THE_SEARCH_CRITERIA",
    SET_THE_OPEN_MODAL: "SET_THE_OPEN_MODAL",
    SET_THE_MAP_MARKED_FOR_DELETION: "SET_THE_MAP_MARKED_FOR_DELETION",
    UPDATE_MAP_INFO: "UPDATE_MAP_INFO",
}

function GlobalStoreContextProvider(props) {

    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        publishedMaps: [],              //holds all the published maps
        userMaps: [],                      //holds all the maps created by the user
        searchResults: [],                   //holds search results
        currentMap: {},                    //holds the current map opened for editing
        currentMapInfo:[],             //current open map mapInfo
        currentLayer:[] ,                 //holds the the layer that is now being modified in the map editor.       
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
    const {auth} = useContext(AuthContext);
    const navigate= useNavigate();

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch(type) {
            case GlobalStoreActionType.LOAD_PUBLISHED_MAPS:
                return setStore({
                    publishedMaps: payload.publishedMaps,              
                    userMaps: store.userMaps,                
                    searchResults: store.searchResults,      
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                    
                    currentMap: payload.currentMap ? payload.currentMap : store.currentMap,                    
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
                    searchResults: store.searchResults,                 
                    currentMap: payload.currentMap,                    
                    currentMapInfo:payload.mapInfo,      
                    currentLayer: payload.currentLayer ? payload.currentMap.layers : store.currentLayer,   //edited      
                    currentTileSet: payload.currentTileSet ? payload.currentTileSet : store.currentTileSet,  //edited
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
                    searchResults: store.searchResults,                  
                    currentMap: store.currentMap,                    
                    currentMapInfo:store.currentMapInfo,      
                    currentLayer: payload.currentLayer,   //edited  back by burcu  
                    currentTileSet: store.currentTileSet,  //edited
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
                    searchResults: store.searchResults,                   
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                    
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                 
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                  
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                    
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                     
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                     
                    currentMap: store.currentMap,                    
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
                    searchResults: store.searchResults,                    
                    currentMap: [],                    
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
                    searchResults: store.searchResults,                  
                    currentMap: store.currentMap,                    
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

                case GlobalStoreActionType.LOAD_SEARCH_RESULTS:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                    
                    searchResults: payload.searchResults,                  
                    currentMap: store.currentMap,                    
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


//Loads all the user maps so we can display them 
//Used by: useEffect(MyProjects)
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

//Loads a list of mapInfos by a list of ids
//Used by: useEffect(LikedMaps)
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

//Gets the top 10 maps in the database sorted by likes
//Used by: useEffect(Home)
//TODO: add "amount" field to get different amount of maps
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

//Updates the number of likes for the published map
//Used by: right-sidebar.component
store.updateMapLike= async function (mapInfo, amount) {
    mapInfo.likes = mapInfo.likes + amount;             //update amount of likes
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
//Used by: right-sidebar.component
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
//Used by: right-sidebar.component (not yet implemented)
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
//Used by: MyProjects(button press)
store.setNewMap = async function(mapData){
    let response;
    
    try {
        response = await api.registerMap(mapData);
        if (response.status === 200) {
            storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                currentMap: response.data.map,
                mapInfo: response.data.mapInfo,
                currentLayer: response.data.map.layers

            }});
        navigate("/editor/"+response.data.map._id)
        }
    }
    catch(error){
        //if the map cannot be found, don't set any data
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
        payload: {
            currentMap: {},
            mapInfo: {}
        }
    });
    }
}


//Deletes the selected map 
//Used by: map-settings.component(button press)
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

//Searches by "type" and "value", for example type = "NAME" and value = "Michael"
store.searchByType = async function (type, value, skip, sortBy) {
    try {
        const response = await api.searchMapInfo({type, value, skip, sortBy})
        if(response.status == 200) {
            storeReducer({
                type: GlobalStoreActionType.LOAD_SEARCH_RESULTS,
                payload: {
                    searchResults: response.data.mapInfos
                }
            })
            navigate("/explore", [])
        }
    }
    catch(err) {
        storeReducer({
            type: GlobalStoreActionType.LOAD_SEARCH_RESULTS,
            payload: {
                searchResults: []
            }
        })
    }
    
}

// Deletes the selected layer
store.deleteSelectedLayer = function (id) {
    
}

// Adds a new layer 
store.addNewLayer = function () {
    let old_layer=store.currentMap.layers[0];
    //init new Layer
    let new_layer={
        data : new Array(old_layer.width*old_layer.height).fill(0), //init data with 0's
        height :old_layer.height,
        id  : (parseInt(store.currentMap.layers[0].id)+1), //latest id increased by one 
        name : "Untitled Layer" + (parseInt( store.currentMap.layers[0].id)+1),
        opasity : 1,
        type : "tilelayer",
        visible :true,
        width :old_layer.width,
        x :0,
        y : 0
}
   store.currentMap.layers.unshift(new_layer); //add new layer to the top of the array 
   storeReducer({
    type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
    payload: {
        currentMap: store.currentMap,
        mapInfo:store.currentMap.mapInfo,
        currentLayer: new_layer,
        currentTileSet: store.currentTileSet
    }
});
}

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
            currentLayer: store.currentMap.layers.filter( layer => layer.id == id)
                
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
//Used by: Save button at Map editor toolbar(map-toolbar.component.js)
store.saveCurrentMap = async function () {
    let UpdateMapdata = {
        _id: store.currentMap._id,
        compressionlevel: store.currentMap.compressionlevel, 
        backgroundcolor: store.currentMap.backgroundcolor,  
        height: store.currentMap.height, 
        infinite: store.currentMap.infinite, 
        layers: store.currentLayer,                             // takes currentLayer 
        nextlayerid: store.currentMap.nextlayerid, 
        nextobjectid: store.currentMap.nextobjectid, 
        renderorder: store.currentMap.renderorder, 
        tiledversion: store.currentMap.tiledversion, 
        tileheight: store.currentMap.tileheight, 
        tilesets: store.currentTileSet,                         // takes currentTileset
        tilewidth: store.currentMap.tilewidth, 
        version: store.currentMap.version, 
        width: store.currentMap.width
    }
    const response = await api.updateMap(UpdateMapdata)
    
}

//Saves the current map and adds it to the publishedMaps  
//Used by: publish.component
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

//Unpublishes the map
//Used by: unpublish.component
store.unpublishCurrentMap = async function () {
    store.currentMapInfo.published = "false";
    
    const response = await api.updateMapInfo(store.currentMapInfo);

    if(response.status === 200) {

        auth.user.publishedMaps = auth.user.publishedMaps.filter(function(e) {return e != store.currentMapInfo._id})
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
//Used by: map-card.component(edit button press)
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
                    currentLayer: response.data.map.layers,
                    currentTileSet: response.data.map.tilesets[0]
                }
            });
            navigate("/editor/"+mapInfo._id, {})
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

//Used to load map on refresh of a page
//Used by MapViewer and MapEditor
store.loadMapById = async function(_id) {
    try{
        const response = await api.getMapInfo(_id)
        if(response.status===200) {

            const response2 = await api.getMap(response.data.mapInfo.map_id)
            if(response2.status === 200) {
                storeReducer({
                    type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                    payload: {
                        mapInfo: response.data.mapInfo,
                        currentMap: response2.data.map,
                        currentLayer: response2.data.map.layers,
                        currentTileSet: response2.data.map.tilesets[0] 
                    }
                });
            }

        }
    } catch(err) {
        console.log(err)
    }
}

//Opens the map viewer and sets the currentMap 
//Used by: map-card.component(view button press)
store.loadMapViewer= async function (mapId, mapInfo) {
    try {

        const response = await api.getMap(mapId);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: mapInfo, 
                }
            });
            navigate("/view/"+mapInfo._id, {})
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

//update map thumbnail url
//Used by: In map toolbar, settings icon -> update map thumbnail
store.updateMapInfoUrl = async function (thumbnailUrl){
    store.currentMapInfo.thumbnailURL = thumbnailUrl
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

//Adds a new comment to the map
//Used by: comment-section.component 
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
//Used by: manage-team.component
store.removeTeamMember = async function (removedUsers) {
    let param = {
        _id: store.currentMapInfo._id, 
        removedCreators: removedUsers}
    const response = await api.removeCreator(param);
    if(response.status === 200 && response.data.mapInfo != null) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }
}

//Adds the editing permission(for currentMap) for the user
//Used by: manage-team.component
store.addTeamMember = async function (addedUsers) {
    console.log(store.currentMapInfo._id)
    let param = {
        _id: store.currentMapInfo._id, 
        addedCreators: addedUsers}
    const response = await api.addCreator(param);
    console.log(response.status)
    console.log(response.data.mapInfo)
    if(response.status === 200 && response.data.mapInfo != null) {
        console.log(response.data.mapInfo)
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response.data.mapInfo
            }
        })
    }

}

//Updates the map info based on the user input 
//Used by: map-settings.component
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

//Sends a report with the mapInfo_id and report text
//Used by: right-sidebar.component
store.sendReport = async function(report) {
    console.log(store.currentMapInfo._id)
    const response = await api.sendReport({report:report, mapInfo_id:store.currentMapInfo._id})
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