// Create Array populated with value
export function createArray(num, rows, cols) {
    var array = [];    
    for (var i = 0; i < rows; i++) { 
        array.push([]);      
        for (var j = 0; j < cols; j++) {  
            array[i].push(num);      
        }    
    }    
    return array;
}

// Get Random in Range
export function getRandomInRange(min, max) {
    return Math.round(Math.random() * (max-min) + min);
}