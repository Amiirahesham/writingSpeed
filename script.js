function changeText() {
    // Create input box dynamically
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.placeholder = "Enter new text";
    inputBox.id = "userTextInput";

    const okButton = document.createElement("button");
    okButton.textContent = "OK";

    // Container for input and button
    const container = document.createElement("div");
    container.id = "inputContainer";
    container.appendChild(inputBox);
    container.appendChild(okButton);

    // Add to body (or a specific container)
    document.body.appendChild(container);

    okButton.onclick = function () {
        const userText = inputBox.value;
        if (userText.trim() !== "") {
            const input = document.getElementById("targetText");
            input.textContent = userText;
        }
        document.body.removeChild(container);
    };
}
let startTime = null;
let timerInterval = null;

function updateTimer() {
    const elapsed = (Date.now() - startTime) / 1000;
    const minutes = Math.floor(elapsed / 60);
    const seconds = (elapsed % 60).toFixed(1).padStart(4, '0');
    document.getElementById("timer").textContent = `Time: ${minutes}:${seconds} (mm:ss.s)`;
}

function startTimer() {
    if (!timerInterval) {
        if (!startTime) startTime = Date.now(); // set start time if not already set
        timerInterval = setInterval(updateTimer, 100);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    startTime = null;
    hasTyped = false;
    document.getElementById("timer").textContent = "Time: 0:00.0 (mm:ss.s)";
}

let hasTyped = false;

document.getElementById("inputText").addEventListener("input", function () {
    if (!hasTyped) {
        startTimer();
        hasTyped = true;
    }
});

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;

    if (hasTyped) {
        showResults();
        hasTyped = false; // reset for next round
    }
}

function showResults() {
    const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
    const userText = document.getElementById("inputText").value.trim();
    const targetText = document.getElementById("targetText").textContent.trim();

    const wordCount = userText.split(/\s+/).length;
    const letterCount = userText.replace(/\s+/g, "").length;
    const speed = (wordCount / elapsed).toFixed(2); // WPM

    // Calculate accuracy
    let correctChars = 0;
    const minLen = Math.min(userText.length, targetText.length);
    for (let i = 0; i < minLen; i++) {
        if (userText[i] === targetText[i]) correctChars++;
    }
    const accuracy = ((correctChars / targetText.length) * 100).toFixed(2);

    alert(
        ` Your writing statistics:\n\n` +
        ` Time: ${(elapsed * 60).toFixed(1)} seconds\n` +
        ` Speed: ${speed} WPM\n` +
        ` Letters typed: ${letterCount}\n` +
        ` Words typed: ${wordCount}\n` +
        ` Accuracy: ${accuracy}%`
    );
}
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        stopTimer();
    }
});
function randomtxt(){
    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "In the middle of difficulty lies opportunity."
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    document.getElementById("targetText").textContent = texts[randomIndex];
}