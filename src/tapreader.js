(function () {
    "use strict";
    
    var words = 0,
        word = 0,
        FADE_COUNT = 20,
        MIN_OPACITY = 0.25,
        whitespace = /([ \t\n\r])+/g,
        notWhitespace = /[^ \t\n\r]/;
    
    function advanceWord(e) {
        e.preventDefault();
        var id = "w" + word,
            element = document.getElementById(id);
        element.className = "inactive";
        word = (word + 1) % words;
        id = "w" + word;
        element = document.getElementById(id);
        element.className = "active";
        element.style.opacity = 1;
        if (word === 0) {
            for (var w = 0; w < words; ++w) {
                document.getElementById("w" + w).style.opacity = 1;
            }
        }
        for (var back = word - 1; back >= 0 && (word - back) < FADE_COUNT + 1; --back) {
            var opacity = 1.0 - (word-back) * (1.0 - MIN_OPACITY) / FADE_COUNT;
            document.getElementById("w" + back).style.opacity = opacity;
        }
    }
    
    function traverseChildren(node) {
        var child = node.firstChild;
        while (child) {
            if (child.nodeType === Node.TEXT_NODE) {
                if (!child.isElementContentWhitespace) {
                    if (child.textContent.match(notWhitespace)) {
                        var text = child.textContent.split(whitespace),
                            span = document.createElement("span");
                        for (var w = 0; w < text.length; ++w) {
                            var nextWord = text[w];
                            if (nextWord.match(notWhitespace)) {
                                var wordSpan = document.createElement("span");
                                wordSpan.id = "w" + words;
                                wordSpan.className = words === 0 ? "active" : "inactive";
                                wordSpan.appendChild(new Text(nextWord));
                                words += 1;
                                span.appendChild(wordSpan);
                             } else {
                                span.appendChild(new Text(nextWord));
                            }
                        }
                        child = node.replaceChild(span, child);
                    }
                }
            } else {
                traverseChildren(child);
            }
            child = child.nextSibling;
        }
    }
    
    window.onload = function (e) {
        console.log("window.onload", e, Date.now());
        var goButton = document.getElementById("go");
        
        traverseChildren(document.getElementById("content"));
        
        goButton.addEventListener("mousedown", advanceWord, true);
        goButton.addEventListener("touchstart", advanceWord, true);
    };
}());
