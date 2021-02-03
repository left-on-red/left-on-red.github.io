$(async function() {
    async function read(file) {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', file, false);
            request.overrideMimeType("text/plain");
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    if (request.status === 200 || request.status === 0) {
                        resolve(request.responseText);
                    }
    
                    else {
                        reject();
                    }
                }
    
                else {
                    reject();
                }
            }
    
            request.send(null);
        });
    }

    function shuffle(array) {
        let index = array.length;
        let temp;
        let rand;
    
        while (0 !== index) {
            rand = Math.floor(Math.random() * index);
            index -= 1;
    
            temp = array[index];
            array[index] = array[rand];
            array[rand] = temp;
        }
    
        return array;
    }

    // reads from json and initializes typewriter.js
    let json = await read('quotes.json');
    let quotes = shuffle(JSON.parse(json));
    let quoteElement = document.getElementById('quote');
    
    let typewriter = new Typewriter(quoteElement, { loop: true });

    for (let i = 0; i < quotes.length; i++) {
        typewriter.deleteAll();
        typewriter.pauseFor(2000);
        typewriter.typeString(quotes[i]);
        typewriter.pauseFor(2500);
    }

    typewriter.start();
});