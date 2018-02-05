var isPerfectSquare = function(input){   
    
        if (input < 0) {
            return false;
        }
        var root = Math.floor(Math.sqrt(input));     
        return (root * root == input);
};
 