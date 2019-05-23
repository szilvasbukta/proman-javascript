import {dom} from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    newBoard();
}

init();

function newBoard() {
    let newBoardButton = document.querySelector(".board-add");
    newBoardButton.addEventListener("click", function () {
        $.ajax({
            type: "POST",
            data: {'name': 'Board'},
            url: '/ge',
            success: dom.loadBoards()
        });
    })
}
