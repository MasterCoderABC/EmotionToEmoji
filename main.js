Webcam.set({
   width:350,
   height:300,
   image_format: 'png',
   png_quality: 90
});

var camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
   Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
   });
}

var classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RaFSxbER_/model.json', modelLoaded);

function modelLoaded(){
   console.log("Model Loaded!");
}

function check(){
   img = document.getElementById('captured_image');
   classifer.classify(img, gotResult);
}

function speak(){
   var synth = window.speechSynthesis;
   speak_data_1 = "The first prediction is"+prediction_1;
   speak_data_2 = "The second prediction is"+prediction_2;
   var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
   synth.speak(utterThis);
}

function gotResult(error, results){
   if (error){
      console.error(error);
   }else{
      console.log(results)
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;
      prediction_1 = results[0].label;
      prediction_2 = results[1].label;
      speak();
      if (results[0].label == "Happy"){
         document.getElementById("update_emoji").innerHTML = "😀";
      }else if (results[0].label == "Sad"){
         document.getElementById("update_emoji").innerHTML = "😔";
      }else if (results[0].label == "Angry"){
         document.getElementById("update_emoji").innerHTML = "😤";
      }

      if (results[1].label == "Happy"){
         document.getElementById("update_emoji2").innerHTML = "😀";
      }else if (results[1].label == "Sad"){
         document.getElementById("update_emoji2").innerHTML = "😔";
      }else if (results[1].label == "Angry"){
         document.getElementById("update_emoji2").innerHTML = "😤";
      }
   }
}