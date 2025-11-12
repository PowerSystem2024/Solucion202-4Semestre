// Use const for elements that won't be reassigned
let theCount; // Use let for variables that will change
const alarm = document.getElementById("alarm");
const alarm2 = document.getElementById("alarm2");
const panel = document.getElementById("panel");
const turnOff = document.getElementById("turn-off");
const turnOffHor = document.getElementById("closing");
const detonate = document.getElementById("detonate");
alarm.volume = 0.50; // Volume level for the main alarm sound

const time = document.getElementById("time");
const alarmStartTime = 10; // Consistent start time for the alarm sound

// Function to update the countdown timer
function showCountDown() {
    time.innerText = time.innerText - 1; // Decrement the time display
    if (time.innerText == 0) {
        clearInterval(theCount); // Stop the countdown
        time.classList.add("crono"); // Add a class for styling when time is up
        abort.classList.add("hide"); // Hide the abort button
        detonate.classList.add("show"); // Show the detonate option

        // After a delay, trigger the closing animation and play the explosion sound
        setTimeout(function () {
            turnOff.classList.add("close"); // Start closing animation
            turnOffHor.classList.add("close"); // Start horizontal closing animation
            reload.classList.add("show"); // Show the restart button
            alarm.pause(); // Stop the alarm sound
            alarm2.play(); // Play the explosion sound
        }, 1500);
    }
}

// Cover element toggle
const cover = document.getElementById("cover");

// Toggle the 'opened' class on the cover element on click
cover.addEventListener("click", function () {
    //this.classList.toggle("close");
    if (this.className == "box") {
        this.classList.add("opened");
    } else {
        this.classList.remove("opened");
    }
});

// Activate button functionality
const btn = document.getElementById("activate");

// Start the countdown and play alarm sound on activation
activate.addEventListener("click", function () {
    this.classList.add("pushed");
    try {
        alarm.load(); // load the alarm sound
        alarm.currentTime = alarmStartTime; // Start playing from the set time
        alarm.play(); // start the alarm

        setTimeout(function () {
            panel.classList.add("show"); // Show the countdown panel
            theCount = setInterval(showCountDown, 1000); // Start the countdown
        }, 500);
    } catch (error) {
        console.error("Error playing alarm sound:", error);
    }
});

// Abort button functionality
const abort = document.getElementById("abort");

// Reset the system when the abort button is clicked
abort.addEventListener("click", function () {
    btn.classList.remove("pushed"); // Remove the pushed animation
    panel.classList.remove("show"); // Hide the panel
    clearInterval(theCount); // Clear the interval
    time.innerText = 9; // Reset the timer to 9
    alarm.pause(); // Pause the alarm
    try {
        alarm.currentTime = alarmStartTime; // Reset the alarm start time
    } catch (error) {
        console.error("Error when resetting alarm sound:", error);
    }

});

// Reload button functionality
const reload = document.getElementById("restart");

// Reset the system when the reload button is clicked
reload.addEventListener("click", function () {
    panel.classList.remove("show"); // Hide the panel
    turnOff.classList.remove("close"); // Remove closing animation
    turnOffHor.classList.remove("close"); // Remove horizontal closing animation
    abort.classList.remove("hide"); // Show the abort button
    detonate.classList.remove("show"); // Hide the detonate option
    cover.classList.remove("opened"); // Close the cover
    btn.classList.remove("pushed"); // Remove pushed state from the button
    this.classList.remove("show"); // Hide this element
    time.classList.remove("crono"); // Remove the timer end class
    time.innerText = 9; // Reset time to 9
});

// Hide the cover initially after a short delay
setTimeout(function () {
    cover.classList.remove("opened");
}, 100);

// Mute button functionality
const mute = document.getElementById("mute");

// Toggle the muted state of the alarm sound on click
mute.addEventListener("click", function () {
    if (this.className == "muted") {
        alarm.muted = false;
        this.classList.remove("muted");
    } else {
        alarm.muted = true;
        this.classList.add("muted");
    }
});
