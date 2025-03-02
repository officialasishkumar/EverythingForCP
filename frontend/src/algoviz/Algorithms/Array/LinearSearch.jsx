import { useState, useEffect, useRef } from "react";
import "../../Styles/Array/LinearSearch.css";

// Generates a new array if none is provided, or returns the provided array (and random target if none given)
export function createArray(size = 15, inputArray = [], target = null) {
    resetArrayStyles();

    if (inputArray.length > 0) {
        target = target === null ? inputArray[Math.floor(Math.random() * inputArray.length)] : target;
        return [inputArray, target];
    }

    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 10));
    }
    const idx = Math.floor(Math.random() * size);
    return [array, array[idx]];
}

async function linearSearch(arr, target, cancelToken) {
    let last = -1;
    for (let i = 0; i < arr.length; i++) {
        if (cancelToken.cancelled) break;
        if (arr[i] === target) {
            visualizeLinearSearch(i, true, last++);
        } else {
            visualizeLinearSearch(i, false, last++);
        }
        await delayIt();
    }
    if (!cancelToken.cancelled) {
        visualizeLinearSearch(-1, false, last++);
    }
    return -1;
}

export function delayIt() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

function visualizeLinearSearch(index, found = false, last) {
    const boxes = document.querySelectorAll(".array-box");
    if (last !== -1 && boxes[last] && !boxes[last].classList.contains("found"))
        boxes[last].classList.add("visited");
    for (let i = 0; i < boxes.length; i++) {
        if (!boxes[i].classList.contains("found"))
            boxes[i].classList.remove("selected");
    }
    if (found && index !== -1) boxes[index].classList.add("found");
    else if (index !== -1) boxes[index].classList.add("selected");
}

function resetArrayStyles() {
    const boxes = document.querySelectorAll(".array-box");
    boxes.forEach((box) => {
        box.className = "array-box";
    });
}

function animateArrayChange() {
    const boxes = document.querySelectorAll(".array-box");
    boxes.forEach((box) => {
        box.classList.add("boom");
        setTimeout(() => {
            box.classList.remove("boom");
        }, 500);
    });
}

const LinearSearch = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [arrayInput, setArrayInput] = useState("");
    const [targetInput, setTargetInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const cancelTokenRef = useRef({ cancelled: false });

    // On mount, generate an initial random array
    useEffect(() => {
        const [newArray, newTarget] = createArray();
        setArray([...newArray]);
        setTarget(newTarget);
    }, []);

    // Realtime update when the array input changes (after validation)
    useEffect(() => {
        if (arrayInput.trim() !== "") {
            const parsed = parseArrayInput(arrayInput);
            if (parsed) {
                setArray(parsed);
                animateArrayChange();
            }
        }
    }, [arrayInput]);

    function parseArrayInput(input) {
        // Remove any brackets and split by commas
        input = input.replace(/[\[\]{}()]/g, "");
        const parts = input.split(",").map((item) => item.trim()).filter((item) => item !== "");
        const parsedArray = parts.map((item) => Number(item));
        if (parsedArray.some(isNaN)) {
            return null;
        }
        return parsedArray;
    }

    // Gracefully cancel the ongoing search.
    function cancelSearching() {
        if (isSearching) {
            cancelTokenRef.current.cancelled = true;
            setIsSearching(false);
            resetArrayStyles();
            const searchBtn = document.querySelector("#start-search-btn");
            if (searchBtn) searchBtn.innerText = "Start Searching";
        }
    }

    async function startSearching() {
        // If search is already running, cancel it.
        if (isSearching) {
            cancelTokenRef.current.cancelled = true;
            await delayIt();
            setIsSearching(false);
            resetArrayStyles();
            return;
        } else {
            resetArrayStyles();
        }

        // Use user-provided array if available
        let currentArray = array;
        if (arrayInput.trim() !== "") {
            const parsed = parseArrayInput(arrayInput);
            if (!parsed) {
                alert("Invalid Array Input");
                return;
            }
            currentArray = parsed;
            setArray([...parsed]);
        }

        // Use user-provided target if available
        let currentTarget = target;
        if (targetInput.trim() !== "") {
            const parsedTarget = Number(targetInput);
            if (isNaN(parsedTarget)) {
                alert("Invalid Target Input");
                return;
            }
            currentTarget = parsedTarget;
            setTarget(parsedTarget);
        } else {
            // If no target provided, choose one randomly from the current array
            currentTarget = currentArray[Math.floor(Math.random() * currentArray.length)];
            setTarget(currentTarget);
        }

        // Prepare for new search
        cancelTokenRef.current = { cancelled: false };
        setIsSearching(true);
        const searchBtn = document.querySelector("#start-search-btn");
        if (searchBtn) searchBtn.innerText = "Stop";

        await linearSearch(currentArray, currentTarget, cancelTokenRef.current);

        setIsSearching(false);
        if (searchBtn) searchBtn.innerText = "Start Searching";
    }

    // Input change handlers cancel any ongoing search before updating state.
    const handleArrayInputChange = (e) => {
        if (isSearching) {
            cancelSearching();
        }
        setArrayInput(e.target.value);
    };

    const handleTargetInputChange = (e) => {
        if (isSearching) {
            cancelSearching();
        }
        setTargetInput(e.target.value);
    };

    return (
        <div id="linear-search-parent">
            <h1 className="animated-heading">Linear Search</h1>
            <div id="array-parent">
                {array.map((value, index) => (
                    <div className="array-box" key={index}>
                        {value}
                    </div>
                ))}
            </div>
            <div id="options">
                <input
                    type="text"
                    id="array-input"
                    placeholder="Enter Array (comma separated)"
                    value={arrayInput}
                    onChange={handleArrayInputChange}
                />
                <input
                    type="number"
                    id="target-input"
                    placeholder="Enter Target"
                    value={targetInput}
                    onChange={handleTargetInputChange}
                />
                <button
                    id="start-search-btn"
                    onClick={startSearching}
                    style={isSearching ? { backgroundColor: "red", color: "white" } : {}}
                >
                    {isSearching ? "Stop" : "Start Searching"}
                </button>
            </div>
        </div>
    );
};

export default LinearSearch;
