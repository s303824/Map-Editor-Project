import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DBManager from '../db/DBManager';

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    CHANGE_CURRENT_GAME: "CHANGE_CURRENT_GAME",
}

function GlobalStoreContextProvider(props) {

    const storeReducer = (action) => {
        const {type, payload} = action

        switch(type) {
            case GlobalStoreActionType.CHANGE_CURRENT_GAME: {
                return setStore({
                    currentGame: payload.currentGame,
                })
            }

            default:
                return store;
        }
    }


    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentGame: null,
    });

    let db = new DBManager();

    store.saveGame = function(game) {
        db.mutationCreateGame(game);
    }

    store.getGames = function() {
        return db.mutationGetAllGames();
    }

    store.getGameByKey = function(key) {
        return db.queryGetGame(key);
    }

    store.getCurrentGame = function() {
        return store.currentGame;
    }

    store.setCurrentGame = function(newGame) {
        storeReducer({
            type:GlobalStoreActionType.CHANGE_CURRENT_GAME,
            payload: {currentGame: newGame}
        })
    }

    store.deleteGame = function(gameTitle) {
        return db.mutationDeleteGame(gameTitle);
    }


    
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