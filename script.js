var startWindow = document.getElementById("startWindow");
var newTestWindow = document.getElementById("newTestWindow");
var timer = document.getElementById("timer");
var startButton = document.getElementById("startButton");
var newTestButton = document.getElementById("newTestButton");
var textArea = document.getElementById("textArea");
var testPara = document.getElementById("testPara");

var timeRemaining = 60; // 60 seconds for the timer
var countdown;
var isTestStarted = false;

// Passages for the typing test
var passages = [
    "In 1492, Christopher Columbus set sail from Spain to find a new route to Asia. Instead, he discovered the Americas. His journey marked the beginning of centuries of exploration and colonization of the American continents. Columbus's voyages had a profound impact on the history of the world, leading to the exchange of goods, cultures, and ideas between the Old World and the New World. Despite the controversies surrounding his expeditions, Columbus remains a significant figure in history.",
    "The Industrial Revolution began in the late 18th century and transformed the world. It started in Britain and spread to other parts of the world. This period saw the rise of factories, mass production, and technological advancements. The steam engine, invented by James Watt, played a crucial role in this transformation. The Industrial Revolution brought about significant changes in society, economy, and culture, leading to urbanization and the growth of cities.",
    "The American Civil War, fought from 1861 to 1865, was a pivotal event in United States history. It was a conflict between the Northern states (the Union) and the Southern states (the Confederacy) over issues such as slavery and states' rights. The war resulted in the abolition of slavery and the preservation of the Union. Key figures during this period included President Abraham Lincoln and General Robert E. Lee. The Civil War had a lasting impact on American society and politics.",
    "The Renaissance was a cultural movement that began in Italy in the 14th century and spread throughout Europe. It was characterized by a renewed interest in classical art, literature, and learning. Prominent figures of the Renaissance include Leonardo da Vinci, Michelangelo, and William Shakespeare. This period saw significant advancements in art, science, and philosophy, and it laid the foundation for the modern world. The Renaissance marked the transition from the Middle Ages to the early modern period.",
    "The French Revolution, which began in 1789, was a period of radical social and political change in France. It led to the overthrow of the monarchy and the establishment of a republic. The revolution was driven by Enlightenment ideas and economic hardships faced by the common people. Key events included the storming of the Bastille, the Reign of Terror, and the rise of Napoleon Bonaparte. The French Revolution had a profound impact on the course of world history, influencing future revolutions and shaping modern political ideologies."
];

// Generate a random passage for the test
function generatePassage() {
    var randomIndex = Math.floor(Math.random() * passages.length);
    testPara.innerText = passages[randomIndex];
}

// Function to calculate score (words per minute)
function calculateScore() {
    var typedText = textArea.value.trim();
    var wordCount = typedText.split(" ").length;
    var wpm = Math.round((wordCount / (60 - timeRemaining)) * 60); // Words per minute
    return wpm;
}

// Function to handle the countdown and update the timer
function displayTime() {
    if (!isTestStarted) {
        isTestStarted = true;

        countdown = setInterval(function () {
            timeRemaining--;
            timer.innerHTML = "Time Remaining: " + timeRemaining + "s";

            if (timeRemaining === 0) {
                clearInterval(countdown);

                // Display the "Time's Up" screen
                var wrapper = document.getElementById("wrapper");
                wrapper.remove();
                timer.remove();

                document.body.appendChild(newTestWindow);
                document.getElementById("finalScore").innerHTML =
                    "Your speed: " + calculateScore() + " words per minute.";
                newTestWindow.style.display = "block";
            }
        }, 1000);

        // Remove the event listener to prevent multiple timers
        textArea.removeEventListener("input", displayTime);
    }
}

// Function to initialize the test
function test() {
    startWindow.style.display = "none";

    timer.innerHTML = "Time Remaining: 60s";
    timer.style.display = "block";

    generatePassage(); // Generate a random passage

    // Attach the event listener to start the timer on typing
    textArea.style.display = "block";
    textArea.addEventListener("input", displayTime);
}

// Event listener for the "Start Test" button
startButton.addEventListener("click", test);

// Event listener for the "Try Again" button
newTestButton.addEventListener("click", function () {
    window.location.reload(); // Reload the page to restart the test
});

// Initially hide the newTestWindow
newTestWindow.style.display = "none";