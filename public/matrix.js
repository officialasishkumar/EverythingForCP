(function () {
    const matrixContainer = document.querySelector('#matrix-parent');
    const width = matrixContainer.clientWidth;
    const height = matrixContainer.clientHeight;
    const rows = Math.floor(height / 50);
    const columns = Math.floor(width / 50);
    const matrixNode = [];
    let target = null;
    let source = null;
    let parent = [];
    let pathLength = 1;
    // Initialize parent array
    for (let i = 0; i < rows * columns; i++) {
        parent.push(-1);
    }

    // state variables for BFS
    let isBFSRunning = false;
    let abortBFS = false;

    // select button and path length node
    let startBfsBtn = document.querySelector('#bfs-start');
    let pathLengthNode = document.querySelector('#path-length');

    // initial button style class for start
    startBfsBtn.classList.add("btn-start");

    // update event listener to toggle between start and stop
    startBfsBtn.addEventListener('click', toggleBfs);

    // Create the grid
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('matrix-row');
        matrixContainer.appendChild(row);
        matrixNode.push([]);
        for (let j = 0; j < columns; j++) {
            const box = document.createElement('div');
            box.classList.add('matrix-box');
            row.appendChild(box);
            matrixNode[i].push(box);
            box.setAttribute('row', i);
            box.setAttribute('col', j);
            // Allow toggling obstacles on click
            box.addEventListener('click', toggleObstacle);
        }
    }

    // Toggle obstacles (ignores source/target)
    function toggleObstacle(e) {
        const node = e.target;
        if (node.classList.contains('source') || node.classList.contains('target')) return;
        node.classList.toggle('obstacle');
    }

    // Reset the grid’s dynamic state (visited/path markings, parent array, etc.)
    function resetMatrixState() {
        for (let i = 0; i < matrixNode.length; i++) {
            for (let j = 0; j < matrixNode[i].length; j++) {
                matrixNode[i][j].classList.remove("visited", "path");
            }
        }
        // Reinitialize parent and pathLength
        parent = Array(rows * columns).fill(-1);
        pathLength = 1;
        pathLengthNode.innerHTML = `Shortest Path : ${pathLength}`;
    }

    // Toggle button handler to either start or stop the BFS
    function toggleBfs(e) {
        if (isBFSRunning) {
            // If running, set abort flag and reset UI
            abortBFS = true;
            resetMatrixState();
            isBFSRunning = false;
            startBfsBtn.textContent = "Start BFS";
            startBfsBtn.classList.remove("btn-stop");
            startBfsBtn.classList.add("btn-start");
        } else {
            // Before starting, reset the grid (so multiple runs work)
            resetMatrixState();
            // Set state for BFS start
            isBFSRunning = true;
            abortBFS = false;
            startBfsBtn.textContent = "Stop BFS";
            startBfsBtn.classList.remove("btn-start");
            startBfsBtn.classList.add("btn-stop");
            bfs(source.row, source.col).then(() => {
                // After BFS completes (unless stopped) update UI
                if (!abortBFS) {
                    isBFSRunning = false;
                    startBfsBtn.textContent = "Start BFS";
                    startBfsBtn.classList.remove("btn-stop");
                    startBfsBtn.classList.add("btn-start");
                }
            });
        }
    }

    // Delay helper function
    function delayIt(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // BFS function with abort check
    async function bfs(startRow, startCol) {
        const queue = [{ row: startRow, col: startCol }];
        const visited = new Set();
        visited.add(`${startRow},${startCol}`);
        while (queue.length > 0) {
            if (abortBFS) break;
            let length = queue.length;
            for (let i = 0; i < length; i++) {
                const { row, col } = queue.shift();
                let currIdx = (row * columns) + col;
                // Directions: right, down, up, left
                const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
                for (let dir of dirs) {
                    const newRow = row + dir[0];
                    const newCol = col + dir[1];
                    if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns) continue;
                    if (matrixNode[newRow][newCol].classList.contains("obstacle")) continue;
                    if (visited.has(`${newRow},${newCol}`)) continue;
                    let newIdx = (newRow * columns) + newCol;
                    parent[newIdx] = currIdx;
                    visited.add(`${newRow},${newCol}`);
                    queue.push({ row: newRow, col: newCol });
                    if (!(newRow === target.row && newCol === target.col)) {
                        matrixNode[newRow][newCol].classList.add('visited');
                    }
                }
            }
            await delayIt(100);
        }
        if (!abortBFS) {
            await findParent();
        }
    }

    // Backtrack from target to source and highlight the path
    async function findParent(row = target.row, col = target.col) {
        while (true) {
            let idx = row * columns + col;
            let parentNode = parent[idx];
            if (parentNode === -1) break;
            row = Math.floor(parentNode / columns);
            col = parentNode % columns;
            if (row === source.row && col === source.col) break;
            matrixNode[row][col].classList.add("path");
            pathLength++;
            pathLengthNode.innerHTML = `Shortest Path : ${pathLength}`;
            await delayIt(100);
        }
        pathLengthNode.innerHTML = `Shortest Path : ${pathLength}`;
    }

    // Set random target and source positions (ensuring they don’t overlap)
    function setTarget() {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * columns);
        let node = matrixNode[row][col];
        target = { row, col };
        node.classList.add('target');
    }

    function setSource() {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * columns);
        let node = matrixNode[row][col];
        while (node.classList.contains('target')) {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * columns);
            node = matrixNode[row][col];
        }
        source = { row, col };
        node.classList.add('source');
    }

    setTarget();
    setSource();

    // Allow obstacle creation via drag
    matrixContainer.addEventListener('mousedown', (e) => {
        startSelecting(e);
        matrixContainer.addEventListener("mouseover", startSelecting);
        matrixContainer.addEventListener("mouseup", () => {
            matrixContainer.removeEventListener("mouseover", startSelecting);
        });
    });

    function startSelecting(e) {
        if (e.target.classList.contains('matrix-box')) {
            if (e.target.classList.contains('source') || e.target.classList.contains('target')) return;
            e.target.classList.toggle('obstacle');
        }
    }
})();
