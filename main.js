var maça = "";

function setup() {
    var canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(cassifyCanvas);
    var synth=window.speechSynthesis;
}

function clearCanvas() {
    background("white")
}

function preload() {
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw() {
    srokeWeight(13);
    strokeColor(000000);
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    var result=results[0].label;
    document.getElementById('label').innerHTML='Nome:' + result.replace('_',' ');
    document.getElementById('confidence').innerHTML='Precisão' + Math.round(results[0].considence*100)+'%'
    var utterThis=new SpeechSynthesisUtterance(result.replace('_',' '));
    synth.speak(utterThis);
}
