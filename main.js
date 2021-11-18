previous_result="";

function preload(){}
function setup() {
  canvas = createCanvas(400, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier("MobileNet",modelLoaded);
}
function draw(){
  image(video,0,0,400,300);
  classifier.classify(video,gotResult);
}
function modelLoaded(){
  console.log("Model Is Loaded");
}
function gotResult(error,results){
  if(error){
    console.log(error);
  }
  else{
    if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
      console.log(results);
      previous_result=results[0].label;
      var synth=window.speechSynthesis;
      speakData="object detected is " + results[0].label;
      var utterThis=new SpeechSynthesisUtterance(speakData);
      synth.speak(utterThis);

      accuracy=results[0].confidence.toFixed(2);
      console.log(accuracy);
      document.getElementById("accuracy").innerHTML=accuracy;
      label=results[0].label;
      document.getElementById("label").innerHTML=label;
    }
  }
}

