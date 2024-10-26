function getState(){
    var puzzleGrid = document.getElementById("puzzle-grid");
    var g = puzzleGrid.querySelector(".puzzle-grid-content");
    var grid = g.puzzleGrid;
    var stateArray = [];
    var hasState = false;

    grid.container.querySelectorAll(".puzzle-grid-content .inner-cell").forEach(td => {
        var fillIndex = 0;
        if (grid.puzzleEntry.fillClasses && !td.classList.contains("given-fill")) { fillIndex = grid.puzzleEntry.fillClasses.indexOf(grid.puzzleEntry.findClassInList(td, grid.puzzleEntry.fillClasses)); }

        var edgeCode = td.getAttribute("data-edge-code");
        var givenEdgeCode = td.getAttribute("data-given-edge-code");
        if (!edgeCode) edgeCode = 0;
        if (!givenEdgeCode) givenEdgeCode = 0;
        var edgeCodeDelta = edgeCode ^ givenEdgeCode;

        var pathCode = td.getAttribute("data-path-code");
        var givenPathCode = td.getAttribute("data-given-path-code");
        if (!pathCode) pathCode = 0;
        if (!givenPathCode) givenPathCode = 0;
        var pathCodeDelta = pathCode ^ givenPathCode;

        var spokeCode = td.getAttribute("data-spoke-code");
        var givenSpokeCode = td.getAttribute("data-given-spoke-code");
        if (!spokeCode) spokeCode = 0;
        if (!givenSpokeCode) givenSpokeCode = 0;
        var spokeCodeDelta = spokeCode ^ givenSpokeCode;

        var text = td.classList.contains("given-text") ? "" : td.querySelector(".text").innerText.trim();

        var cellState = "";
        if (fillIndex || edgeCodeDelta || pathCodeDelta || spokeCodeDelta || text) {
            hasState = true;
            // cellState = fillIndex.toString(36) + edgeCodeDelta.toString(16) + pathCodeDelta.toString(16) + (spokeCodeDelta >> 4).toString(16) + (spokeCodeDelta % 16).toString(16);
            // if (text) { cellState += "," + text; }
            cellState = pathCodeDelta.toString(36);
        }

        stateArray.push(cellState);
    });
    while (stateArray.length % 4 !== 0) {
        stateArray.unshift("0");
    }
    return stateArray;
}
function copyState(){
    var state = getState();
    // navigator.clipboard.writeText(JSON.stringify(state));
    navigator.clipboard.writeText(state);
    document.getElementById("text").textContent = `Copied at ${(Date()).toLocaleString()}`;
}