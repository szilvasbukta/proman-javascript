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
            data: {'planet_id': planetID, 'planet_name': planetName},
            url: '/save_vote',
            success: alert('done')
        });
    })
}