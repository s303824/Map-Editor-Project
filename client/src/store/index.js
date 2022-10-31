import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
    DEFAULT: "DEFAULT",
}

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