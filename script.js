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
    document.getElementById("timer").textContent = "Time: 0:00.0 (mm:ss.s)";
}
