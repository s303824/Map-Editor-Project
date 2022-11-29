import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class PlaceTile_Transaction extends jsTPS_Transaction {
    constructor(initStore, initTileId, initMapPos, tileId) {
        super();
        this.store = initStore;
        this.newTileId = initTileId;
        this.mapPos = initMapPos;
        this.oldTileId = tileId
    }

    doTransaction() {
        this.store.paintHelper(this.mapPos);
    }
    
    undoTransaction() {
        this.store.paintHelperUndo(this.mapPos, this.oldTileId-1);
    }
}