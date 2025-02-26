let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    wishMe(); // Greet when the button is clicked
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Vivek Sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open chatgpt")) {
        speak("Opening ChatGPT...");
        window.open("https://chat.openai.com/", "_blank");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.location.href = "whatsapp://send";
    } else if (message.includes("open camera")) {
        speak("Opening Camera...");
        window.open("microsoft.windows.camera:");
    } else if (message.includes("set alarm")) {
        speak("Setting alarm for 7 AM...");
        alert("Alarm set for 7 AM! (In a real app, this would use a timer)");
    } else if (message.includes("play music")) {
        speak("Playing music...");
        window.open("file:///C:/Users/Public/Music/Sample Music");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.location.href = "calculator://";
    } else if (message.includes("restart system")) {
        speak("Restarting system...");
        window.open("shutdown -r -t 0");
    } else if (message.includes("shutdown system")) {
        speak("Shutting down system...");
        window.open("shutdown -s -t 0");
    } else if (message.includes("put system to sleep")) {
        speak("Putting system to sleep...");
        window.open("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");
    } else if (message.includes("weather update")) {
        speak("The weather is currently 30 degrees Celsius with a slight breeze.");
    } else if (message.includes("tell me a joke")) {
        let jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "What do you call fake spaghetti? An impasta!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}
