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
        localStorage.removeItem("game-" +game.key);
    }

    mutationUpdateGame = (game) => {
        // AND FLOW THOSE CHANGES TO LOCAL STORAGE
        let listString = JSON.stringify(game);
        console.log(listString);
        localStorage.setItem("game-1", listString);
    }
    
    mutationUpdateSessionData = (sessionData) => {
        let sessionDataString = JSON.stringify(sessionData);
        localStorage.setItem("game-data", sessionDataString);
    }
}