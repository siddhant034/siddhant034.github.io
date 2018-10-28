(function IIFE() {
    var wrapperDiv = document.getElementById('wrapper');
    function loadImages() {
        let url = 'http://www.reddit.com/best/.json?limit=50';
        get(url, (x) => {
            let data = JSON.parse(x);
            let count = 0;
            for (let child of data.data.children) {
                if (child.data.post_hint == 'image') {
                    count++;
                    let imgElement = document.createElement('img');
                    imgElement.src = child.data.url;
                    imgElement.title = child.data.title;
                    wrapperDiv.appendChild(imgElement);
                    if (count == 10) {
                        break;
                    }
                }
            }
        })
    }

    function get(url, callback) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }

    loadImages();
}());
