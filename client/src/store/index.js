import { breadcrumbsClasses } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, useHistory, useNavigate } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth';
import JsTPS from "../common/jsTPS"
import PlaceTile_Transaction from '../transactions/PlaceTile_Transaction';
import DeleteTile_Transaction from '../transactions/DeleteTile_Transaction';
import PaintLayer_Transaction from '../transactions/PaintLayer_Transaction';


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
    ERROR: "ERROR"
}

const tps = new JsTPS();

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
        mapMarkedForDeletion: null,
        error: "",          
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
                })

            case GlobalStoreActionType.SET_THE_CURRENT_MAP:
                return setStore({
                    publishedMaps: store.publishedMaps,              
                    userMaps: store.userMaps,                     
                    searchResults: store.searchResults,                 
                    currentMap: payload.currentMap,                    
                    currentMapInfo:payload.mapInfo,      
                    currentLayer: payload.currentLayer ? payload.currentMap.layers : store.currentLayer,   //edited back by bur      
                    currentTileSet: payload.currentTileSet ? payload.currentTileSet : store.currentTileSet,  //edited
                    currentTile: store.currentTile,
                    tilesetBeingEdited: store.tilesetBeingEdited,        
                    selectedMapEditTool: store.selectedMapEditTool,   
                    canUndo: store.canUndo,                  
                    canRedo: store.canRedo,                  
                    searchCriteria: store.searchCriteria,            
                    openModal: store.openModal,       
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: payload.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: payload.mapMarkedForDeletion,
                    error: ""
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
                    mapMarkedForDeletion: payload.mapMarkedForDeletion,
                    error: ""
                })

                case GlobalStoreActionType.ERROR:
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
                        mapMarkedForDeletion: store.mapMarkedForDeletion,
                        error: payload.error
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
    console.log(mapId)
    const response = await api.getMapInfo(mapId)
    if(response.status == 200) {
        response.data.mapInfo.downloads = response.data.mapInfo.downloads +1;
        const response2= await api.updateMapInfo(response.data.mapInfo);
        if (response2.status === 200) {
            console.log(response2.data.mapInfo)
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo:response2.data.mapInfo
                }
            });
        }
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
        navigate("/editor/"+response.data.mapInfo._id)
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
    let new_layers= store.currentMap.layers.filter( layer => layer.id != id); //remove the selected layer
    store.currentMap.layers = new_layers; 

    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
        payload: {
            currentMap: store.currentMap,
            mapInfo: store.currentMapInfo,
            currentLayer: id == store.currentLayer.id ? null : store.currentLayer, //set the currentLayer null if it is being deleted
            currentTileSet: store.currentTileset
        }
    });
    
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
        mapInfo:store.currentMapInfo,
        currentLayer: new_layer,
        currentTileSet: store.currentTileSet
    }
});

}

// Changes the selected layer's name
store.changeLayerName = function (id, newName) {}

// Changes the current layer's precedence
store.increaseLayerPrecedence = function () {
    let idx = store.currentMap.layers.indexOf(store.currentLayer[0]);
    var layer = store.currentMap.layers.splice(idx, 1)[0];
    console.log("layer",layer);
   // let arr = store.currentMap.layers;
   // console.log("arr1",arr)
   // let i1 = idx;
    //let i2= idx-1;
  //  arr.slice(0,i1).concat(arr[i2],arr.slice(i1+1,i2),arr[i1],arr.slice(i2+1))
    // insert stored layer into position 
   // console.log("arr",arr)
    let ne = store.currentMap.layers.splice(idx-1,0, layer);
    console.log("ne",ne);
    let new_layer = store.currentMap.layers[idx-1];
    console.log("new",new_layer);
    
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
        payload: {
            currentMap: store.currentMap,
            mapInfo: store.currentMapInfo,
            currentLayer:new_layer,
            currentTileSet: store.currentTileSet
        }
    });
}

store.decreaseLayerPrecedence = function () {
    let idx = store.currentMap.layers.indexOf(store.currentLayer[0]);
    var layer = store.currentMap.layers.splice(idx, 1)[0];
    // insert stored layer into position 
    store.currentMap.layers.splice(idx-1,0, store.currentLayer[0]);
    
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
        payload: {
            currentMap: store.currentMap,
            mapInfo: store.currentMapInfo,
            currentLayer: layer,
            currentTileSet: store.current
        }
    });


}

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
    console.log("value", value)
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_TILE,
        payload: {
            currentTile : {id,value}
        }
    });
}

// Sets the current tileset
store.setCurrentTileset = function (id) {
    // console.log("================")
    // console.log(id)
    // console.log(store.currentMap.tilesets.filter(tileset => tileset._id === id ))
    // console.log("================")
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_TILESET,
        payload: {
            currentTileSet: store.currentMap.tilesets.filter(tileset => tileset._id == id )
        }
        // {
        //     currentTileSet : {
        //         _id: 1,
        //         backgroundcolor: "#d31313",
        //         columns : 1,
        //         fillmode: "stretch",
        //         firstgid: 1 ,
        //         grid: {},
        //         image: '../assets/map-card.jpg',
        //         imageheight: "960",
        //         imagewidth: "960",
        //         margin: 2,
        //         name: "tileset 2",
        //         objectalignment: "top",
        //         properties:[
        //                         {
        //                         name:"myProperty2",
        //                         type:"string",
        //                         value:"myProperty2_value"
        //                         }],
        //         source : "tilelsate",
        //         tilecount: "225",
        //         tileslateversion: "1.0.1",
        //         tileheight: "64",
        //         tilerendersize: "10",
        //         tiles : [],
        //         tilewidth:"64",
        //         transparentcolor :  "#000000",
        //         type : "tileset",
        //         version : "1.1",
        //         wangsets: []
        //     }
        // }
    });
    console.log(store.currentTileSet)
   

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
store.undoUserEdit = function () {
    tps.undoTransaction();
}

//Redo the latest transaction 
store.redoUserEdit = function () {
    tps.doTransaction();
}

//Paints the selected currentlayer's tile with the "currentTile"
//store.currentTile.id is the id of the tile selected from the current tileset
//id is the id of the tile on the mpa 
store.paintTile = function (id,value) {
    let transaction = new PlaceTile_Transaction(store, store.currentTile.id, id, store.currentLayer[0].data[id])
    tps.addTransaction(transaction)
}

store.paintHelper = function(id) {
    store.currentLayer[0].data[id]=(parseInt(store.currentTile.id)+ parseInt(store.currentTileSet[0].firstgid));
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

store.paintHelperUndo = function(id, tileId) {
    console.log(parseInt(tileId)+ parseInt(store.currentTileSet.firstgid))
    store.currentLayer[0].data[id]=(parseInt(tileId)+ parseInt(store.currentTileSet.firstgid));
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

//Deletes the selected tile from the current layer 
store.deleteTile = function (id) {
    let transaction = new DeleteTile_Transaction(store, id, store.currentLayer[0].data[id])
    tps.addTransaction(transaction)
}

store.deleteTileHelper = function(id) {
    store.currentLayer[0].data[id]=0;
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

store.deleteTileUndo = function(id, oldTileId) {
    console.log(oldTileId)
    store.currentLayer[0].data[id]=oldTileId;
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

//Paints all tiles in the current layer with the "currentTile" 
store.paintLayer= function () {
    let oldData =[]
    store.currentLayer[0].data.forEach((element, index) => {
        oldData[index] = element;
      })
    let transaction = new PaintLayer_Transaction(store, oldData, store.currentTile.id)
    tps.addTransaction(transaction)
}

store.paintLayerHelper = function(newTileId) {
    let data = store.currentLayer[0].data;
    data.forEach((element, index) => {
        data[index] = (parseInt(newTileId)+ parseInt(store.currentTileSet[0].firstgid));
      })
    storeReducer({
        type: GlobalStoreActionType.SET_THE_CURRENT_LAYER,
        payload: {
            currentLayer:store.currentLayer
        }
    });
}

store.paintLayerUndo = function(oldLayerData) {
    oldLayerData.forEach((element, index) => {
        store.currentLayer[0].data[index] = element;
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
        layers: store.currentMap.layers,                            
        nextlayerid: store.currentMap.nextlayerid, 
        nextobjectid: store.currentMap.nextobjectid, 
        renderorder: store.currentMap.renderorder, 
        tiledversion: store.currentMap.tiledversion, 
        tileheight: store.currentMap.tileheight, 
        tilesets: store.currentMap.tilesets,
        tilewidth: store.currentMap.tilewidth, 
        version: store.currentMap.version, 
        width: store.currentMap.width
    }
    console.log(UpdateMapdata)
    const response = await api.updateMap(UpdateMapdata)
    if(response.status == 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: store.currentMapInfo
                }
        })
    }
    
}

store.updateMapSize = async function () {
    const response = await api.updateMap(store.currentMap)
    if(response.status == 200) {
        storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: store.currentMapInfo
                }
        })
    }
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
    store.currentMapInfo.editActive = false; // when the map is done being edited, editActive set to false
    const response = await api.updateMapInfo(store.currentMapInfo);

    if(response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
        navigate("/projects")
    }

}

//Unpublishes the map
//Used by: unpublish.component
store.unpublishCurrentMap = async function () {
    store.currentMapInfo.published = "false";

    const response = await api.updateMapInfo(store.currentMapInfo);

    if(response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
            navigate("/projects")


    }
}

//Saves the current map and exports the json map data.  
store.exportCurrentMap = async function () {}

// Adds a tileset to map
// Used by: Add Tileset in Map editor page
store.addTilsetToMap = async function (tileImage, tileWidth, tileHeight, imageHeight, imageWidth, tileName) {
    const column = imageWidth/tileWidth;
    const row = imageHeight/tileHeight;
    const tilecount = column * row
    let firstgid;
    console.log("*************************")
    console.log(store.currentMap.tilesets[store.currentMap.tilesets.length - 1])
    if (store.currentMap.tilesets.length == 0){
        firstgid = 1
    }else{
        firstgid = store.currentMap.tilesets[store.currentMap.tilesets.length - 1].tilecount + store.currentMap.tilesets[store.currentMap.tilesets.length - 1].firstgid + 1  
    }
    console.log("*************************")
    console.log(tileWidth)
    console.log(tileHeight)
    console.log(imageHeight)
    console.log(imageWidth)
    console.log(firstgid)
    console.log(tilecount)
    console.log("*************************")


    const tileData = {
        backgroundcolor: "#d31313",
        columns : 1,
        fillmode: "stretch",
        firstgid: firstgid,
        grid: {},
        image: tileImage,
        imageheight: imageHeight,
        imagewidth: imageWidth,
        margin: 2,
        name: tileName,
        objectalignment: "top",
        properties:[
                        {
                        name:"myProperty2",
                        type:"string",
                        value:"myProperty2_value"
                        }],
        source : "tilelsate",
        tilecount: tilecount,
        tileslateversion: "1.0.1",
        tileheight: tileHeight,
        tilerendersize: "10",
        tiles : [],
        tilewidth: tileWidth,
        transparentcolor :  "#000000",
        type : "tileset",
        version : "1.1",
        wangsets: []

    };

    let response1
    let AddedTileset 
    try {
        response1 = await api.registerTileSet(tileData);
        if (response1.status === 200) {
            AddedTileset = await api.getTileSet(response1.data.tileset._id)
            store.currentMap.tilesets.push(AddedTileset.data.tileset)
            
        }
    }
    catch(error){
        console.error(error)
    }
    console.log("----------------")
    console.log(store.currentMap.tilesets)
    console.log("----------------")
    let response
    try {
        response = await api.updateMap(store.currentMap);
        if (response.status === 200) {
            console.log("aaaaaaaaaaa")
            console.log(response.data.map)
            console.log("aaaaaaaaaaa")
            storeReducer({
            type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                currentMap: response.data.map,
                mapInfo: store.currentMapInfo,
                currentLayer: store.currentLayer,       
                currentTileSet: store.currentTileSet
            }});
            // storeReducer({
            // type: GlobalStoreActionType.SET_THE_CURRENT_TILESET,
            //     payload: {
            //         currentTileSet: response.data.map.tilesets
            // }})
        }
    }
    catch(error){
        //if the map cannot be found, don't set any data
        console.error(error)
    }

}

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

//Opens the map editor and sets the currentMap
//Used by: map-card.component(edit button press)
store.loadMapEditor= async function (mapId, mapInfo) {
    try {


        mapInfo.editActive = true;
        const response1 = await api.updateMapInfo(mapInfo);
        if(response1.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response1.data.mapInfo
                }
            })
        }

        const response = await api.getMap(mapId);
        if (response.status === 200) {
            console.log(response.data)
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: mapInfo,
                    currentLayer: response.data.map.layers[0],//edited back by burcu 
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
                // console.log(response.data.mapInfo)
                console.log(response2.data)
                storeReducer({
                    type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                    payload: {
                        mapInfo: response.data.mapInfo,
                        currentMap: response2.data.map,
                        currentLayer: response2.data.map.layers[0],
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
            console.log(response.data.map)
            storeReducer({
                type: GlobalStoreActionType.SET_THE_CURRENT_MAP,
                payload: {
                    currentMap: response.data.map,
                    mapInfo: mapInfo,
                    currentLayer: response.data.map.layers[0],//edited back by burcu 
                    currentTileSet: response.data.map.tilesets[0] 
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

//Set edit active
store.setEditActive= async function (_id,editActive) {
    const response = await api.getMapInfo(_id)
    response.data.mapInfo.editActive = editActive;
    const response1 = await api.updateMapInfo(response.data.mapInfo);
    if(response1.status === 200) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_MAP_INFO,
            payload: {
                mapInfo: response1.data.mapInfo
            }
        })
    }
}



//Removes the editing permission(for currentMap) from the selected user
//Used by: manage-team.component
store.removeTeamMember = async function (username) {
    try {
        const response = await api.removeCreator({username:username, _id:store.currentMapInfo._id});
        if(response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
        }
    }catch(err) {
    console.log(err)
    }
}

//Adds the editing permission(for currentMap) for the user
//Used by: manage-team.component
store.addTeamMember = async function (username) {
    try { 
        const response = await api.addCreator({username:username, _id:store.currentMapInfo._id});
        
        if(response.status === 200) {
            console.log(response.data.mapInfo)
            storeReducer({
                type: GlobalStoreActionType.UPDATE_MAP_INFO,
                payload: {
                    mapInfo: response.data.mapInfo
                }
            })
        }
    } catch(err) {
        storeReducer({
            type: GlobalStoreActionType.ERROR,
            payload: {
                error: err.response.data.errorMessage
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