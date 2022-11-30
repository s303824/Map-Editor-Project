import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class DeleteTile_Transaction extends jsTPS_Transaction {
    constructor(initStore, initMapPos, oldTileId) {
        super();
        this.store = initStore;
        this.mapPos = initMapPos;
        this.oldTileId = oldTileId
    }

    doTransaction() {
        this.store.deleteTileHelper(this.mapPos);
    }
    
    undoTransaction() {
        this.store.deleteTileUndo(this.mapPos, this.oldTileId);
    }
}