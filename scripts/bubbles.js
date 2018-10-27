(function IIFE() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let maxX = 2000;
    let maxY = 1500;
    canvas.height = maxY;
    canvas.width = maxX;

    bubbles = [];

    function bubbleGenerator(n) {
        for (let i = 0; i < n; i++) {
            let bubbleSize = getRandomInRange(2, 4);
            let bubbleLocation = {
                x: canvas.width * Math.random(),
                y: canvas.height * Math.random(),
            };
            let bubbleDirection = getNewBubbleDirection();
            let initialOpacity = Math.random() / 200;
            let opacity = initialOpacity;
            bubbles.push({
                'bubbleDirection': bubbleDirection,
                'bubbleLocation': bubbleLocation,
                'bubbleSize': bubbleSize,
                'initialOpacity': initialOpacity,
                'opacity': opacity
            })
        }
    }

    function getNewBubbleDirection() {
        let xPositive = Math.random() > 0.5 ? 1 : -1;
        let yPositive = Math.random() > 0.5 ? 1 : -1;
        return {
            x: xPositive * Math.random() * 0.5,
            y: yPositive * Math.random() * 0.5
        }
    }

    function moveBubble(bubble) {
        bubble.bubbleLocation.x += bubble.bubbleDirection.x;
        bubble.bubbleLocation.y += bubble.bubbleDirection.y;
        bubble.opacity += bubble.initialOpacity;
        if (bubble.bubbleLocation.x > canvas.width || bubble.bubbleLocation.y > canvas.height || bubble.bubbleLocation.x < 0 || bubble.bubbleLocation.y < 0) {
            bubble.bubbleLocation = {
                x: canvas.width * Math.random(),
                y: canvas.height * Math.random(),
            };
            bubble.bubbleDirection = getNewBubbleDirection();
            bubble.bubbleSize = getRandomInRange(2, 4);;
            bubble.initialOpacity =  Math.random() / 200;
            bubble.opacity = bubble.initialOpacity;
        }
        else if (bubble.opacity > 1) {
            bubble.opacity = 1;
            bubble.initialOpacity *= -1;
        }
        else if (bubble.opacity < 0) {
            bubble.opacity = 0;
            bubble.initialOpacity *= -1;
        }
    }

    function letThemFloat() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let bubble of bubbles) {
            ctx.beginPath();
            ctx.arc(bubble.bubbleLocation.x, bubble.bubbleLocation.y, bubble.bubbleSize, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = bubble.opacity;
            ctx.fill();
            moveBubble(bubble);
        }
        window.requestAnimationFrame(letThemFloat);
    }

    function getRandomInRange(x, y) {
        let randomNo = Math.random() * y;
        if (randomNo < x) {
            randomNo += (y - x);
        }
        return randomNo;
    }

    bubbleGenerator(110);
    window.requestAnimationFrame(letThemFloat);
})();