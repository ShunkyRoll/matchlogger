// script.js

document.addEventListener('DOMContentLoaded', () => {
    const eventLog = document.getElementById('eventLog');
    const downloadLogButton = document.getElementById('downloadLog');
    const clearLogButton = document.getElementById('clearLog');

    // Function to save the log to localStorage
    const saveLog = () => {
        const logEntries = eventLog.innerHTML;
        localStorage.setItem('eventLog', logEntries);
    };

    // Load log from localStorage on page load
    const loadLog = () => {
        const savedLog = localStorage.getItem('eventLog');
        if (savedLog) {
            eventLog.innerHTML = savedLog;
        }
    };

    // Add event listeners to buttons
    document.querySelectorAll('.event-btn').forEach(button => {
        button.addEventListener('click', () => {
            const eventText = button.getAttribute('data-event');
            const timestamp = new Date().toLocaleTimeString(); // Get current time as timestamp
            const newEvent = document.createElement('div');
            newEvent.innerHTML = `${timestamp} - ${eventText} <button class="delete-btn" onclick="deleteEvent(this)">❌</button>`;
            eventLog.appendChild(newEvent);
            saveLog();
        });
    });

    // Delete event function
    window.deleteEvent = (button) => {
        if (confirm('Are you sure you want to delete this event?')) {
            button.parentElement.remove();
            saveLog(); // Save the log after deletion
        }
    };

    // Download log as a .txt file
    downloadLogButton.addEventListener('click', () => {
        const blob = new Blob([eventLog.innerText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'event_log.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Clear log with confirmation
    clearLogButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the log?')) {
            eventLog.innerHTML = '';
            localStorage.removeItem('eventLog');
        }
    });

    // Load the log when the page loads
    loadLog();
});
