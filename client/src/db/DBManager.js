export default class DBManager {
    // QUERY AND MUTATION FUNCTIONS GET/SET DATA FROM/TO
    // AN EXTERNAL SOURCE, WHICH FOR THIS APPLICATION
    // MEANS THE BROWSER'S LOCAL STORAGE
    queryGetSessionData = () => {
        let sessionDataString = localStorage.getItem("game-data");
        return JSON.parse(sessionDataString);
    }

    queryIsGame = (key) => {
        let list = localStorage.getItem("game-" + key);
        return list != null;
    }

    /**
     * This query asks local storage for a list with a particular key,
     * which is then returned by this function.
     */
    queryGetGame = (key) => {
        let listString = localStorage.getItem("game-" + key);
        return JSON.parse(listString);
    }

    mutationCreateGame = (game) => {
        this.mutationUpdateGame(game);
    }

    mutationDeleteGame = (game) => {
        localStorage.removeItem("game-" +game);
    }

    mutationGetAllGames = () => {
        let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }

        if(values.length===0) {
            return "";
        }
        let games = [];

        for(let i=0; i<values.length; i++) {
            games[i] = JSON.parse(values[i]);
        }
        return (games);
    }

    mutationUpdateGame = (game) => {
        // AND FLOW THOSE CHANGES TO LOCAL STORAGE
        let listString = JSON.stringify(game);
        localStorage.setItem("game-"+game.title, listString);
    }
    
    mutationUpdateSessionData = (sessionData) => {
        let sessionDataString = JSON.stringify(sessionData);
        localStorage.setItem("game-data", sessionDataString);
    }
}