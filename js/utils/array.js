export class Array {
    static create(num, rows, cols) {
        var array = [];    
        for (var i = 0; i < rows; i++) { 
            array.push([]);      
            for (var j = 0; j < cols; j++) {  
                array[i].push(num);      
            }    
        }    
        return array;
    }
}