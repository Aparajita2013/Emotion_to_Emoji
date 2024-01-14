//https://teachablemachine.withgoogle.com/models/A0tshfuuo/

prediction_1 = ""
prediction_2 = "";

Webcam.set({
    width: 350,
    heigth: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    })
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/A0tshfuuo/model.json", modelloaded);

function modelloaded() {
    console.log("modelloaded")
}


function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "prediction 1 is " + prediction_1;
    speak_data_2 = "and prediction 2 is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1
        document.getElementById("result_emotion_name2").innerHTML = prediction_2
        speak();

        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128512;";

        }
        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
            
        }
        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
            
        }

        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";

        }
        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
            
        }
        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
            
        }
    }
}