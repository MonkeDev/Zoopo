module.exports = class ExtendedMap extends Map {
    constructor(){
        super();
    }

    /**
     * 
     * @param {Function} filter 
     */
    filter(filter, returnArray){
        if(!filter) new Error("A filter is required");
        if(returnArray) {
            let array = [];
            for(const keys of this){
                if(filter({value: keys[1], key: keys[0]})) array.push(keys[1]);
            }
            return array;
        } else {
            let newMap = new ExtendedMap();
            for(const keys of this){
                if(filter({value: keys[1], key: keys[0]})) newMap.set(keys[0], keys[1]);
            }
            return newMap;
        };
        
    };

    /**
     * 
     * @param {Function} func 
     */
    map(func) {
        let array = [];
        for(const keys of this){
            if(filter({value: keys[1], key: keys[0]})) newMap.set(keys[0], keys[1]);
        }
    }

}