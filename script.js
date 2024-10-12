// Initialize the event log from localStorage
const eventLogElement = document.getElementById("event-log");
let eventLog = JSON.parse(localStorage.getItem("eventLog")) || [];

// Function to save log to localStorage
function saveLog() {
    localStorage.setItem("eventLog", JSON.stringify(eventLog));
}

// Function to update the event log display
function updateLogDisplay() {
    eventLogElement.innerHTML = ""; // Clear current log display
    eventLog.forEach((event, index) => {
        const li = document.createElement("li");
        li.textContent = event; // Add event details to the log
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌"; // Delete button emoji
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => {
            if (confirm("Are you sure you want to delete this action?")) {
                eventLog.splice(index, 1); // Remove the event from the log
                saveLog();
                updateLogDisplay(); // Update display after deletion
            }
        };
        li.appendChild(deleteButton); // Add delete button to the list item
        eventLogElement.appendChild(li); // Add list item to log display
    });
}

// Function to log events
function logEvent(action, team) {
    const timestamp = new Date().toISOString().substr(11, 8); // Get current time as HH:MM:SS
    const eventDetail = `${timestamp} - ${action} (${team})`; // Format event detail
    eventLog.push(eventDetail); // Add event detail to the log
    saveLog(); // Save the log
    updateLogDisplay(); // Update the log display
}

// Set up event listeners for buttons
document.getElementById("goal-stranraer").addEventListener("click", () => logEvent("Goal ⚽", "Stranraer"));
document.getElementById("chance-stranraer").addEventListener("click", () => logEvent("Chance 🙏", "Stranraer"));
document.getElementById("incident-stranraer").addEventListener("click", () => logEvent("Incident 💥", "Stranraer"));
document.getElementById("yellow-card-stranraer").addEventListener("click", () => logEvent("Yellow Card 🟨", "Stranraer"));
document.getElementById("red-card-stranraer").addEventListener("click", () => logEvent("Red Card 🟥", "Stranraer"));
document.getElementById("funny-stranraer").addEventListener("click", () => logEvent("Funny 🤣", "Stranraer"));

document.getElementById("goal-opposition").addEventListener("click", () => logEvent("Goal ⚽", "Opposition"));
document.getElementById("chance-opposition").addEventListener("click", () => logEvent("Chance 🙏", "Opposition"));
document.getElementById("incident-opposition").addEventListener("click", () => logEvent("Incident 💥", "Opposition"));
document.getElementById("yellow-card-opposition").addEventListener("click", () => logEvent("Yellow Card 🟨", "Opposition"));
document.getElementById("red-card-opposition").addEventListener("click", () => logEvent("Red Card 🟥", "Opposition"));
document.getElementById("funny-opposition").addEventListener("click", () => logEvent("Funny 🤣", "Opposition"));

// Function to download the log
function downloadLog() {
    const blob = new Blob([eventLog.join("\n")], { type: "text/plain" }); // Create a text blob
    const url = URL.createObjectURL(blob); // Create a download URL
    const a = document.createElement("a");
    a.href = url;
    a.download = "event-log.txt"; // Set the filename for download
    document.body.appendChild(a); // Append link to body
    a.click(); // Trigger the download
    document.body.removeChild(a); // Remove link after download
}

// Function to clear the log
function clearLog() {
    if (confirm("Are you sure you want to clear the log?")) {
        eventLog = []; // Reset the log array
        saveLog(); // Save the cleared log
        updateLogDisplay(); // Update the log display
    }
}

// Event listeners for Download and Clear buttons
document.getElementById("download-log").addEventListener("click", downloadLog);
document.getElementById("clear-log").addEventListener("click", clearLog);

// Update the log display on page load
updateLogDisplay();
