// distribs
// Last modified September 26, 2019

const UPDATE_RATE = 1000/60;
const BGCOLOR = "#111111";
const TXTCOLOR = "#ffffff";

var fontSize = 30;

// Grab the canvas from the html document and set things for it
var canvas = document.getElementById("main_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.font = "" + fontSize + "px Verdana";
ctx.fillStyle = BGCOLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);

var lmousedown = false;
var lmouselastx = 0;
var lmouselasty = 0;
var lmousecurx = 0;
var lmousecury = 0;

var keys = new Array(1000).fill(0);

var uniMin = 0;
var uniMax = 1;
var uniBins = 60;
var uniHisto = new Array(uniBins).fill(0);
var uniMaxVal = 0;

var gMin = -5;
var gMax = 5;
var gBins = 60;
var gHisto = new Array(gBins).fill(0);
var gMaxVal = 0;

var counterMax = 1;
var counter = counterMax;

setInterval(update, UPDATE_RATE);

canvas.addEventListener("mousedown", function(evt)
{
    lmousedown = true;
    lmouselastx = evt.x;
    lmouselasty = evt.y;
    lmousecurx = evt.x;
    lmousecury = evt.y;
}, false);

canvas.addEventListener("mousemove", function(evt)
{
    // If the user is "dragging".
    if (lmousedown)
    {
        lmousecurx = evt.x;
        lmousecury = evt.y;
    }
    else
    {
        lmouselastx = evt.x;
        lmouselasty = evt.y;
    }
}, false);

canvas.addEventListener("mouseup", function(evt)
{
    lmousedown = false;
}, false);

canvas.addEventListener("mousewheel", function(evt)
{
    var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));

    if (delta < 0)
    {
    }
    else
    {
    }
}, false);

document.body.onkeydown = function(e)
{
    keys[e.keyCode] = true;
}

document.body.onkeyup = function(e)
{
    keys[e.keyCode] = false;
}

function DrawRandomNumbers()
{
    let randVal = Math.random();
    let gIndex = (randVal - 0.5) * Math.PI;
    let gVal = Math.tan(gIndex);
    
    ctx.fillStyle = TXTCOLOR;
    ctx.fillText("Uniform:", 100, 170);
    ctx.fillText("" + randVal, 100, 200);
    
    ctx.fillText("Gaussian Index:", 100, 270);
    ctx.fillText("" + gIndex, 100, 300);
    
    ctx.fillText("Gaussian:", 100, 370);
    ctx.fillText("" + gVal, 100, 400);
    ctx.fillText("Gaussian Index = (Uniform - 0.5) * \u03D6", 100, 600);
    ctx.fillText("Gaussian = Tangent(Gaussian Index)", 100, 640);
    
    ctx.fillText("Uniform Distribution", 600, 70);
    ctx.fillText("Gaussian/Normal Distribution", 600, 370);
    
    // Add to Uniform Histogram
    let uniStep = (uniMax - uniMin)/uniBins;
    for (let i = 0; i < uniBins; i++)
    {
        if (randVal > (uniMin + uniStep*i) && randVal < (uniMin + uniStep*(i+1)))
        {
            uniHisto[i]++;
            
            if (uniHisto[i] > uniMaxVal)
            {
                uniMaxVal = uniHisto[i];
            }
        }
        
        ctx.fillStyle = TXTCOLOR;
        ctx.fillRect(600 + i*10, 200, 1, 2);
        ctx.fillStyle = "blue";
        ctx.fillRect(600 + i*10, 200, 10, -100*(uniHisto[i]/uniMaxVal));
    }
    
    ctx.strokeStyle = TXTCOLOR;
    ctx.setLineDash([5, 5]);/*dashes are 5px and spaces are 3px*/
    ctx.beginPath();
    ctx.moveTo(600, 100);
    ctx.lineTo(600 + uniBins*10, 100);
    ctx.stroke();
    ctx.fillStyle = TXTCOLOR;
    ctx.fillText("" + uniMaxVal, 600 - 60, 110);
    ctx.fillText("" + uniMin, 600 - 10, 230);
    ctx.fillText("" + uniMax, 600 + uniBins*10 - 20, 230);
    
    // Add to Gaussian Histogram
    let gStep = (gMax - gMin)/gBins;
    for (let i = 0; i < gBins; i++)
    {
        if (gVal > (gMin + gStep*i) && gVal < (gMin + gStep*(i+1)))
        {
            gHisto[i]++;
            
            if (gHisto[i] > gMaxVal)
            {
                gMaxVal = gHisto[i];
            }
        }
        
        ctx.fillStyle = TXTCOLOR;
        ctx.fillRect(600 + i*10, 500, 1, 2);
        ctx.fillStyle = "blue";
        ctx.fillRect(600 + i*10, 500, 10, -100*(gHisto[i]/gMaxVal));
    }
    
    ctx.strokeStyle = TXTCOLOR;
    ctx.setLineDash([5, 5]);/*dashes are 5px and spaces are 3px*/
    ctx.beginPath();
    ctx.moveTo(600, 400);
    ctx.lineTo(600 + gBins*10, 400);
    ctx.stroke();
    ctx.fillStyle = TXTCOLOR;
    ctx.fillText("" + gMaxVal, 600 - 60, 410);
    ctx.fillText("" + gMin, 600 - 10, 530);
    ctx.fillText("" + gMax, 600 + gBins*10 - 30, 530);
}

function update()
{
    if (counter == counterMax)
    {
        if (!keys[32])
        {
            ctx.fillStyle = BGCOLOR;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = TXTCOLOR;
            ctx.fillText("Hold Space Bar to pause", 80, 40);
            
            ctx.fillStyle = "green";
            ctx.fillRect(10, 10, 40, 40);
            
            DrawRandomNumbers();
        }
        else
        {
            ctx.fillStyle = "red";
            ctx.fillRect(10, 10, 40, 40);
        }
        
        counter = 0;
    }
    else
    {
        counter++;
    }
}
