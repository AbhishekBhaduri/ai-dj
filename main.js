sound = ""
leftWristX = ""
leftWristY = ""
rightWristX = ""
rightWristY = ""
leftWristscore = ""
rightWristscore = ""

function preload() {
    sound = loadSound("unstopable.mp3")

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 500);
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses)
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#0eedd7")
    stroke("#068a7d")

    circle(leftWristX, leftWristY, 40)
    InnumberleftWristY = Number(leftWristY);
    revove_decimals = floor(InnumberleftWristY)
    volume = revove_decimals / 500
    document.getElementById("volume").innerHTML = "Volume = " + volume
    sound.setVolume(volume);

    circle(rightWristX, rightWristY, 40)
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x "
        sound.rate(0.5);
    }

    if (rightWristY > 100 && rightWristY <=200){
         document.getElementById("speed").innerHTML="Speed = 1x"
         sound.rate(1);
    }

    if (rightWristY> 200 && rightWristY <=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x"
        sound.rate(1.5);
    }

    if (rightWristY> 300 && rightWristY <=400){
        document.getElementById("speed").innerHTML="Speed = 2x"
        sound.rate(2);
    }

    if (rightWristY> 400 && rightWristY <=500){
        document.getElementById("speed").innerHTML="Speed = 2.5x"
        sound.rate(2.5);
    }
    
}


function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1)
}

function modelloaded() {
    console.log("Pose net is initatialized")
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX = " + leftWristX + "leftWrstY = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)

        leftWristscore = results[0].pose.keypoints[9].score
        console.log("scoreleftwrist = " + leftWristscore);

        rightWristscore = results[0] .pose.keypoints[10].score
        console.log("sorerightwrist = " + rightWristscore);
    }

    
}

function stop() {
    sound.stop()
}



