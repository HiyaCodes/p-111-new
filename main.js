Webcam.set({
    height:300,
    width:300,
    image_format:'png',
     png_quality:90
 });
 
 camera=document.getElementById("camera");
 Webcam.attach("#camera");
 
 function take_snapshot(){
 Webcam.snap(function(data_uri){
     document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
 }
 )
 }

 console.log("ml5.version",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ubdU5VMTo/model.json",modelLoaded)

function modelLoaded(){
console.log("model loaded!!")

}

function speak(){
    var synth=window.SpeechSynthesis
    speak_data_1="the first prediction is"+ prediction_1
    speak_data_2="and the second prediction is"+ prediction_2
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2 )
synth.speak(utterThis);
}




function check() {
    var img = document.getElementById("captured_image")
    classifier.classify(img, gotResults)
}
function gotResults(error,results){
if (error){
    console.log(error)
}
else{
    console.log(results)
    document.getElementById("result_hand_gesture_name").innerHTML=results[0].label; 
    document.getElementById("result_hand_gesture_name2").innerHTML=results[1].label; 

    prediction_1=results[0].label
    prediction_2=results[1].label

    speak();
    if (results[0].label=="Victory"){
        document.getElementById("update_hand_gesture").innerHTML ="&#9996;"
    }
    if (results[0].label=="Thum's down"){
        document.getElementById("update_hand_gesture").innerHTML ="&#128078;"
    }
    if (results[0].label=="Thum's up!!"){
        document.getElementById("update_hand_gesture").innerHTML ="&#128077;"
    }

    if (results[1].label=="Victory"){
        document.getElementById("update_hand_gesture2").innerHTML ="&#9996;"
    }
    if (results[1].label=="Thum's down"){
        document.getElementById("update_hand_gesture2").innerHTML ="&#128078;"
    }
    if (results[1].label=="Thum's up!!"){
        document.getElementById("update_hand_gesture2").innerHTML ="&#128077;"
    }
}

}