(function () {
    "use strict";
    
    var words = 4,
        word = 0;
    
    function advanceWord() {
        var id = "w" + word,
            element = document.getElementById(id);
        element.className = "";
        word = (word + 1) % words;
        id = "w" + word;
        element = document.getElementById(id);
        element.className = "active";
    }
    
    window.onload = function (e) {
        console.log("window.onload", e, Date.now());
        var goButton = document.getElementById("go");
        
        goButton.addEventListener("mousedown", advanceWord, true);
        goButton.addEventListener("touchstart", advanceWord, true);
    };
}());
