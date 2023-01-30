quick_draw_data_set=["alarm_clock","rain","apple","envelope","tree","boat"];
randomno=Math.floor((Math.random()*quick_draw_data_set.length)+1);
sketch=quick_draw_data_set[randomno];
document.getElementById("sketch").innerHTML="Sketch to be drawn: "+sketch;
timer_counter=0;
timer_check="";
drawn_sketch="";
answer_holder="";
score=0;
function preload(){
    classifier=ml5.imageClassifier("DoodleNet",modelLoaded);
}
function modelLoaded(){
    console.log("Model Loaded!!!!");
}
function setup(){
canvas=createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
}
function clearCanvas(){
background("white");
}
function draw(){
    strokeWeight(13);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    checkSketch();
    if(drawn_sketch==sketch){
        answer_holder="set";
        score=score+1;
        document.getElementById("score").innerHTML="Score: "+score;
    }
}
function  checkSketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML="Timer: "+timer_counter;
    if(timer_counter>2000){
        timer_counter=0;
        timer_check="completed";
    }
    if(timer_check=="completed"||answer_holder=="set"){
        timer_check="";
        answer_holder="";
        updateCanvas();
    }
}
    function classifyCanvas(){
        classifier.classify(canvas,gotResults);
    }
    function gotResults(error,results){
        if(error){
            console.log(error);
        }
        console.log(results);
        drawn_sketch=results[0].label;
        document.getElementById("label").innerHTML="Drawn sketch: "+drawn_sketch;
        document.getElementById("confidence").innerHTML=(results[0].confidence*100).toFixed(3)+"%";
    }
function updateCanvas(){
    background("white");
    randomno=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch=quick_draw_data_set[randomno];
    document.getElementById("sketch").innerHTML="Sketch to be drawn: "+sketch;
}