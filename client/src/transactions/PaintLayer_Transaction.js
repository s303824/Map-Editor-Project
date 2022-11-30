import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class PaintLayer_Transaction extends jsTPS_Transaction {
    constructor(initStore, oldLayerData, newTile) {
        super();
        this.store = initStore;
        this.layerData = oldLayerData;
        this.newTile = newTile;
    }

    doTransaction() {
        this.store.paintLayerHelper(this.newTile);
    }
    
    undoTransaction() {
        this.store.paintLayerUndo(this.layerData);
    }
}