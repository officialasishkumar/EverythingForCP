import { useState, useEffect, useRef } from "react";
import "../../Styles/Array/BinarySearch.css";
import { createArray, delayIt } from "./LinearSearch";

// Updated binary search function with cancellation token support and realtime visualization.
async function binarySearch(arr, target, cancelToken) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        if (cancelToken.cancelled) break;
        let mid = Math.floor((low + high) / 2);
        visualizeBinarySearch(arr, low, high, mid, false);
        await delayIt();
        if (cancelToken.cancelled) break;
        if (arr[mid] === target) {
            visualizeBinarySearch(arr, low, high, mid, true);
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
        await delayIt();
    }
    return -1;
}

// Visualization function that highlights the low, mid, and high indices,
// and then marks the found element if applicable.
function visualizeBinarySearch(arr, low, high, mid, found = false) {
    const boxes = document.querySelectorAll(".array-box");
    // Reset classes for all boxes.
    boxes.forEach((box) => {
        box.classList.remove("low-box", "high-box", "mid-box", "visited", "found");
    });
    if (found) {
        boxes[mid].classList.add("found");
        // Optionally mark the remaining search range as visited.
        for (let i = low; i <= high; i++) {
            if (i !== mid) boxes[i].classList.add("visited");
        }
    } else {
        boxes[low] && boxes[low].classList.add("low-box");
        boxes[high] && boxes[high].classList.add("high-box");
        boxes[mid] && boxes[mid].classList.add("mid-box");
    }
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

const BinarySearch = () => {
    const [array, setArray] = useState([]);
    const [target, setTarget] = useState(null);
    const [arrayInput, setArrayInput] = useState("");
    const [targetInput, setTargetInput] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const cancelTokenRef = useRef({ cancelled: false });

    // On mount, generate an initial sorted array.
    useEffect(() => {
        generateNewArray();
    }, []);

    // Update the array display in realtime as the user types (with validation and animation)
    useEffect(() => {
        if (arrayInput.trim() !== "") {
            const parsed = parseArrayInput(arrayInput);
            if (parsed) {
                const sorted = parsed.sort((a, b) => a - b);
                setArray(sorted);
                animateArrayChange();
            }
        }
    }, [arrayInput]);

    function parseArrayInput(input) {
        input = input.replace(/[\[\]{}()]/g, "");
        const parts = input.split(",").map((item) => item.trim()).filter((item) => item !== "");
        const parsedArray = parts.map((item) => Number(item));
        if (parsedArray.some(isNaN)) {
            return null;
        }
        return parsedArray;
    }

    // Generates a new array using the helper from LinearSearch.
    function generateNewArray() {
        const [newArray, newTarget] = createArray(20, [], null);
        const sorted = newArray.sort((a, b) => a - b);
        setArray([...sorted]);
        setTarget(newTarget);
    }

    // Gracefully cancel an ongoing search.
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
        // If a search is already running, cancel it.
        if (isSearching) {
            cancelSearching();
            return;
        } else {
            resetArrayStyles();
        }

        // Use user-provided array if available.
        let currentArray = array;
        if (arrayInput.trim() !== "") {
            const parsed = parseArrayInput(arrayInput);
            if (!parsed) {
                alert("Invalid Array Input");
                return;
            }
            currentArray = parsed.sort((a, b) => a - b);
            setArray([...currentArray]);
        }

        // Use user-provided target if available.
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
            currentTarget = currentArray[Math.floor(Math.random() * currentArray.length)];
            setTarget(currentTarget);
        }

        cancelTokenRef.current = { cancelled: false };
        setIsSearching(true);
        const searchBtn = document.querySelector("#start-search-btn");
        if (searchBtn) searchBtn.innerText = "Stop";

        await binarySearch(currentArray, currentTarget, cancelTokenRef.current);

        setIsSearching(false);
        if (searchBtn) searchBtn.innerText = "Start Searching";
    }

    // Input change handlers that cancel any ongoing search.
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
        <div id="binary-search-parent">
            <h1 className="animated-heading">Binary Search</h1>
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

export default BinarySearch;
