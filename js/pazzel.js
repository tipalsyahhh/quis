$(document).ready(function() {
    const imageContainer = $("#imageContainer");
    const papan = $("#papan");
    const puzzleCanvas = document.getElementById("puzzleCanvas");
    const ctx = puzzleCanvas.getContext('2d');

    for (let i = 1; i <= 45; i++) {
        const img = new Image();
        img.src = `img/puzzel/${i}.jpeg`;
        img.onload = function() {
            imageContainer.append(img);
            $(img).draggable({
                containment: papan,
                stack: ".image-container img"
            });
            positionImage(img);
        }
    }

    function positionImage(img) {
        const papanWidth = papan.width();
        const papanHeight = papan.height();
        const imgWidth = img.width;
        const imgHeight = img.height;
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const maxXPos = viewportWidth - imgWidth;
        const maxYPos = viewportHeight - imgHeight;

        const xPos = Math.random() * (papanWidth - imgWidth);
        const yPos = Math.random() * (papanHeight - imgHeight);
        const finalXPos = Math.min(xPos, maxXPos);
        const finalYPos = Math.min(yPos, maxYPos);

        img.style.position = "absolute";
        img.style.top = finalYPos + "px";
        img.style.left = finalXPos + "px";
    }

    $("#puzzleCanvas").droppable({
        drop: function(event, ui) {
            const droppedElement = ui.draggable[0];
            if (droppedElement.parentNode === imageContainer[0]) {
                const xPos = ui.offset.left - papan.offset().left;
                const yPos = ui.offset.top - papan.offset().top;
                droppedElement.style.position = "absolute";
                droppedElement.style.top = yPos + "px";
                droppedElement.style.left = xPos + "px";
            }
        }
    });
});