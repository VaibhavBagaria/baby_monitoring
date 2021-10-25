img = ""
status = ""
objects = []
alarm = ""
function preload() {
    alarm = loadSound("alarm_r.mp3")
}

function setup() {
    canvas = createCanvas(500, 450)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    object_detector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(video, 0, 0, 500, 450)
    object_detector.detect(video, gotResults)
    document.getElementById("number_of_objects").innerHTML = "IS BABY THERE!!!: Yes";
    if (status != "") {

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            textSize(20);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y - 5)
            noFill()
            stroke("red")
            rect(objects[i].x - 100, objects[i].y, objects[i].width - 50, objects[i].height)
            if (objects[i].label == "person") {
                console.log("found")
                document.getElementById("number_of_objects").innerHTML = "IS BABY THERE!!!: Yes";
                alarm.stop()
            } else if(objects[i].label != "person"){
                console.log("not found")
                alarm.setVolume(0.5)
                alarm.play()
                document.getElementById("number_of_objects").innerHTML = "IS BABY THERE!!!: No";
            }
        }
    }
}

function modelLoaded() {
    console.log("model Loaded")
    status = true;

}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}