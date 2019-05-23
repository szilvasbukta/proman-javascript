// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        for(let board of boards){
            let boardHtml = `
                <section class="board">
                    <div class="board-header"><span class="board-title">${board['title']}</span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </section>
            `;
            const boardInDocument = this._appendToElement(document.querySelector('.board-container'), boardHtml);
            dom.loadCardsAsync(board['id'], boardInDocument)
        }
    },


    loadCardsAsync: function (boardId, boardHtml) {
        // retrieves cards and makes loadCardsToBoard called
        dataHandler.getCardsByBoardId(boardId, function(cards) {
            dom.loadCardsToBoard(cards, boardHtml)
        });
    },


    loadCardsToBoard: function (statuses, boardHtml) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let columnTitles = ['New', '"In progress"', 'Testing', 'Done' ];
        let cards;
        let column = '';
        let columnContent = '';
        for (let status of Object.keys(statuses)) {
            cards = '';
            for (let card of statuses[status]) {
                cards += `
                        <div class="card">
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${card['title']}</div>
                        </div>
                `;
            }
            columnContent += `<div class="board-column-title">${columnTitles[status]}</div>
                       <div class="board-column-content">${cards}</div>
            `;
        column += `<div class="board-column">${columnContent}</div>`;
        columnContent = '';
        }
        let outerHtml = `<div class="board-columns">${column}</div>`;
        this._appendToElement(boardHtml, outerHtml);
        let allColumns = document.querySelectorAll(".board-column");
        dragula([allColumns[0],allColumns[1], allColumns[2], allColumns[3]])
    }

    // here comes more features
};
