// astrobits
// Created March 22, 2019

/* ***************************************************************************/
/* BEGIN CONSTANTS ***********************************************************/
/* ***************************************************************************/
/**
Constants are values that will NEVER change during execution of a program. They
are declared here at the top so that we can quickly and easily change program
variables. 
*/

// Update rate in milliseconds (denominator is frames per second (fps)).
const UPDATE_RATE = 1000/30; // 30 fps

// Keyboard input codes for easy reference.
const CODE_A = 65;
const CODE_D = 68;
const CODE_F = 70;
const CODE_J = 74;
const CODE_K = 75;
const CODE_L = 76;
const CODE_M = 77;
const CODE_S = 83;
const CODE_W = 87;
const CODE_Z = 90;
const CODE_SPACE = 32;

// Constant values that affect program behavior.
const G = 0.0006; // Simliar to gravitational constant G, but not equivalent
const SUN_MASS = 100000; // Mass of initial Sun - similar to Sol (Sun)
const METEOR_MASS = 1; // Similar to the mass of Pluto
const PLANET_MASS = 100; // Similar to the mass of Earth
const GASGIANT_MASS = 1000; // Similar to the mass of Jupiter
const CLICKVELFACTOR = 1/1000; // Controls how much velocity when spawning

const METEOR_MAXPTS = 150;
const METEOR_STARTDISTANCE = 200;
const METEOR_STARTXVEL = -0.07;
const METEOR_STARTYVEL = 0.0;

const METEOR_COLOR = "#8B4513";
const PLANET_COLOR = "#0066cc";
const GASGIANT_COLOR = "#66cc00";
const SUN_COLOR = "#E6DF52";

const ACTIVE_COLOR = "#666666";
const INACTIVE_COLOR = "#444444";

const PADDINGX = 10;
const PADDINGY = 10;

const MIN_ZOOM = 0.05;
const MAX_ZOOM = 12.0;

/* ***************************************************************************/
/* END CONSTANTS *************************************************************/
/* ***************************************************************************/

/* ***************************************************************************/
/* BEGIN CLASSES *************************************************************/
/* ***************************************************************************/

/**
Body is the base class for objects in this Star System. All Stars, Planets, and
Meteors will be "bodies". 
*/
class Body
{
    constructor(x, y, m, c, d, vx, vy, id)
    {
        this.x = x;
        this.y = y;
        this.velx = vx;
        this.vely = vy;
        this.mass = 0;
        this.radius = 0;
        this.color = c;
        this.dynamic = d; // Should this body be affected by gravity?
        this.id = id; // Equivalent to address in "bodies" array.

        this.eat(m); // Calculate radius based on mass.
    }
    
    /**
    Function to draw this body to the canvas.
    
    @param ct: canvas context
    */
    draw(ct)
    {
        // Don't draw if it is too small. You won't see it!
        if (this.radius >= 1){
            ct.beginPath();
            ct.fillStyle = this.color;
            ct.arc(center_x + (this.x + offset.x - center_x) * zoom,
                   center_y + (this.y + offset.y - center_y) * zoom,
                   this.radius * zoom, 0, 2*Math.PI);
            ct.fill();
            ct.closePath();
        }
    }

    /**
    Called once per frame.
    
    @param dur: Duration of last frame.
    @param bds: Bodies in the Star System.
    */
    tick(dur, bds)
    {
        // If dynamic, this body will be affected by gravity and have velocity.
        if (this.dynamic)
        {
            this.gravity(bds);

            // Modify velocity as a factor of duration. If some frames are
            // short, don't apply to much speed.
            this.x += this.velx * dur;
            this.y += this.vely * dur;

            // TODO: Add planet-planet collision!

            // Make sure this object is not the Sun -- it would eat itself!
            if (this.id != sun_id)
            {
                // If this body is inside of the Sun.
                if (distance_to(this.x, this.y, bds[sun_id].x, bds[sun_id].y)
                    < bds[sun_id].radius)
                {
                    // The Sun will eat it.
                    bds[sun_id].eat(this.mass);
                    // We also basically "destroy" the body.
                    // This keeps it in the array for posterity.
                    this.mass = 0;
                    this.radius = 0;
                    this.dynamic = false;
                }
            }
        }
    }

    /**
    Apply gravity from other bodies.
    
    @param bds: Array of Star System bodies.
    */
    gravity(bds)
    {
        for (var i = 0; i < bds.length; i++) {
            // If this body is now being looked at, skip.
            if (i === this.id) { continue; }

            // This equation is the gravitational force equation!
            // force = G * mass1 * mass2 / distance^2
            // But since
            // force = mass * acceleration
            // We find that:
            // mass1 * acceleration = G * mass1 * mass2 / distance^2 =>
            // acceleration = G * mass2 / distance^2
            var dist = distance_to(this.x, this.y, bds[i].x, bds[i].y);
            var denom = Math.pow(dist, 2);
            var accel = G * bds[i].mass / denom;

            // Now that we have acceleration, apply it to velocity vectors.
            var angle = Math.atan2(this.y - bds[i].y, this.x - bds[i].x);
            this.velx -= accel * Math.cos(angle);
            this.vely -= accel * Math.sin(angle);
        }
    }

    /**
    Eats a given mass m by adding to the mass. Also adjusts radius.

    @param m: mass to be eaten.
    */
    eat(m){
        this.mass += m;

        // Radius is found using the density relationship:
        // density = mass / volume
        // For a sphere,
        // volume ~= radius^3
        // Substituting, we find that
        // mass ~= radius^3
        // Solve for radius and you have
        // radius ~= mass^(1/3)
        // +1 included to show the smallest objects as 1 pixel.
        this.radius = Math.pow(this.mass, 1/3) + 1;
    }
}

/**
Meteor is a subclass of body. It uses members of Body, but has some of
its own features. Also, we can use constants and call the super-class
constructor. See below. 
*/
class Meteor extends Body
{
    constructor(x, y, vx, vy)
    {
        // Call the super-class constructor with constants.
        super(x, y, METEOR_MASS, METEOR_COLOR, true, vx, vy, met_id);

        // pts is an array of the past locations of this body.
        this.pts = [ [x, y] ];
        // pts_freq is how many ticks pass before saving a point.
        this.pts_freq = 2;
        this.pts_trck = 0;
        // pts_maxn is the max number of points to hold.
        this.pts_maxn = METEOR_MAXPTS;
    }

    /**
    tick is called once per frame.
    
    @param dur: duration of previous frame.
    @param bds: array of bodies.
    */
    tick(dur, bds)
    {
        // Call the super-class tick function
        super.tick(dur, bds);

        // Determine if we need to handle points.
        this.pts_trck++;
        if (this.pts_trck >= this.pts_freq)
        {
            this.pts_trck = 0;

            // Remove old entries if the array is too long.
            if (this.pts.length > this.pts_maxn)
            {
                this.pts.shift();
            }

            // Push the newest point.
            this.pts.push( [this.x, this.y] );
        }
    }

    /**
    Draw this meteor.

    @param ct: canvas context.
    */
    draw(ct)
    {
        // Make the pts trail the same color as the object.
        ct.strokeStyle = this.color;
               center_x + (this.x + offset.x - center_x) * zoom
               center_y + (this.y + offset.y - center_y) * zoom
        ct.moveTo(center_x + (this.pts[0][0] + offset.x - center_x) * zoom,
                  center_y + (this.pts[0][1] + offset.y - center_y) * zoom);
        ct.beginPath();

        // Loop through all points, drawing short lines.
        for (var i = 0; i < this.pts.length; i++){
            ct.lineTo(center_x + (this.pts[i][0] + offset.x - center_x) * zoom,
                      center_y + (this.pts[i][1] + offset.y - center_y) * zoom);
            ct.moveTo(center_x + (this.pts[i][0] + offset.x - center_x) * zoom,
                      center_y + (this.pts[i][1] + offset.y - center_y) * zoom);
        }
        ct.lineTo(center_x + (this.x + offset.x - center_x) * zoom,
                  center_y + (this.y + offset.y - center_y) * zoom);
        ct.stroke();
        ct.closePath();
        
        // Finally, use the super-class draw function.
        super.draw(ct);
    }
}

/**
Button is a class used for controlling on-screen buttons. 
*/
class Button
{
    constructor(x, y, w, h, txt, c, fnt)
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.text = txt;
        this.color = c;
        this.padx = 4;
        this.font = fnt;
    }

    /**
    Draw this button.

    @param ct: canvas context.
    */
    draw(ct)
    {
        // Fill the background of this button.
        // TODO: Add rounded edges... because they are cool.
        ct.fillStyle = this.color;
        ct.fillRect(this.x - this.width/2, this.y - this.height/2, 
                    this.width, this.height);
        ct.fillStyle = "white";

        // Handle the text this object contains. Split by space characters
        var strs = this.text.split(" ");
        ct.font = this.font;

        // Handle based on number of words.
        if (strs.length == 1)
        {
            ct.fillText(this.text, this.x - this.width/2 + this.padx, this.y + 4,
                        this.width - this.padx*2);
        }
        else if (strs.length == 2)
        {
            ct.fillText(strs[0], this.x - this.width/2 + this.padx, 
                        this.y - 4, this.width - this.padx*2);
            ct.fillText(strs[1], this.x - this.width/2 + this.padx,
                        this.y + 12, this.width - this.padx*2);
        }
    }

    /**
    Handle a click.

    @param x: x location of click on canvas.
    @param y: y location of click on canvas.
    @return: bool for if click was on this button.
    */
    click(x, y)
    {
        return (Math.abs(this.x - x) < this.width/2 && Math.abs(this.y -  y)
                < this.height/2);
    }

    /**
    Action to be taken if this button is clicked.
    NOTE: Instances of this object will need to define this behavior.
    */
    action()
    {
        console.log("No Action For Button.");
    }

    /**
    Actions to be taken on every tick.
    NOTE: Instances of this object will need to define this behavior.
    */
    tick()
    {
        console.log("Button with no defined tick.");
    }
}

/* ***************************************************************************/
/* END CLASSES ***************************************************************/
/* ***************************************************************************/

/* ***************************************************************************/
/* BEGIN GLOBALS *************************************************************/
/* ***************************************************************************/

// Grab the canvas from the html document and set things for it
var canvas = document.getElementById("main_canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var ctx = canvas.getContext("2d");

// Controls how to handle a click.
var click_mode = "move"; // One of: spawn, move, zoom

// Controls the mass of a spawned planet.
var spawn_mass = PLANET_MASS;
var spawn_color = PLANET_COLOR;

var lmousedown = false;
var lmouselastx = 0;
var lmouselasty = 0;
var lmousecurx = 0;
var lmousecury = 0;

// Variables to control screen movement.
var offset = {"x": 0, "y": 0};
var zoom = 1.0;
var center_x = canvas.width/2;
var center_y = canvas.height/2;

var last_time = new Date().getTime();

var bodies = [];
var buttons = [];

// Set up initial configuration of this Star System.
// Add a Sun directly in the center.
var sun_id = 0;
bodies.push(new Body(canvas.width/2, canvas.height/2, SUN_MASS, SUN_COLOR,
                     false, 0, 0, sun_id));
// Add a meteor above the Sun.
var met_id = 1;
bodies.push(new Meteor(canvas.width/2, canvas.height/2 - METEOR_STARTDISTANCE,
                       METEOR_STARTXVEL, METEOR_STARTYVEL));

// Create the "Dynamic Sun" Button.
var btn = new Button(44, 34, 60, 40, "Dynamic Sun", ACTIVE_COLOR, "14px Verdana");
btn.action = function()
{
    // When clicked, toggle the status of the dynamic Sun.
    bodies[sun_id].dynamic = !bodies[sun_id].dynamic;
}
btn.tick = function()
{
    // Control the highlight color based on status of Sun.
    if (bodies[sun_id].dynamic)
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
// Push to the buttons array.
buttons.push(btn);

// Similar to above procedure. Add "Move" Button.
btn = new Button(44, 78, 60, 40, "Move", ACTIVE_COLOR, "14px Verdana");
btn.action = function()
{
    click_mode = "move";
}
btn.tick = function()
{
    if (click_mode == "move")
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// Similar to above procedure. Add "Zoom" Button.
btn = new Button(44, 122, 60, 40, "Zoom", ACTIVE_COLOR, "14px Verdana");
btn.action = function()
{
    click_mode = "zoom";
}
btn.tick = function()
{
    if (click_mode == "zoom")
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// Again, similar. Add "Spawn" Button.
btn = new Button(44, 166, 60, 40, "Spawn", ACTIVE_COLOR, "14px Verdana");
btn.action = function()
{
    click_mode = "spawn";
}
btn.tick = function()
{
    if (click_mode == "spawn")
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// Add a "S" button for small spawn planet size.
btn = new Button(23, 210, 18, 40, "S", INACTIVE_COLOR, "12px Verdana");
btn.action = function()
{
    spawn_mass = METEOR_MASS;
    spawn_color = METEOR_COLOR;
}
btn.tick = function()
{
    if (spawn_mass == METEOR_MASS)
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// Add a "M" button for medium spawn planet size.
btn = new Button(44, 210, 18, 40, "M", ACTIVE_COLOR, "12px Verdana");
btn.action = function()
{
    spawn_mass = PLANET_MASS;
    spawn_color = PLANET_COLOR;
}
btn.tick = function()
{
    if (spawn_mass == PLANET_MASS)
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// Add a "L" button for large spawn planet size.
btn = new Button(65, 210, 18, 40, "L", INACTIVE_COLOR, "12px Verdana");
btn.action = function()
{
    spawn_mass = GASGIANT_MASS;
    spawn_color = GASGIANT_COLOR;
}
btn.tick = function()
{
    if (spawn_mass == GASGIANT_MASS)
    {
        this.color = ACTIVE_COLOR;
    }
    else
    {
        this.color = INACTIVE_COLOR;
    }
}
buttons.push(btn);

// IMPORTANT! Call to set up our main function!
// This will call the function "update" every UPDATE_RATE milliseconds.
setInterval(update, UPDATE_RATE);

canvas.addEventListener("mousedown", function(evt)
{
    lmousedown = true;
    lmouselastx = evt.x - PADDINGX;
    lmouselasty = evt.y - PADDINGY;
    lmousecurx = evt.x - PADDINGX;
    lmousecury = evt.y - PADDINGY;

    // Check if this click was on a button and handle if so.
    for (var i = 0; i < buttons.length; i++)
    {
        if (buttons[i].click(lmousecurx, lmousecury))
        {
            buttons[i].action();
        }
    }
}, false);

canvas.addEventListener("mousemove", function(evt)
{
    // If the user is "dragging".
    if (lmousedown)
    {
        // Are we in "move" mode.
        if (click_mode == "move")
        {
            offset.x += ((evt.x - PADDINGX) - lmousecurx)/2 / zoom;
            offset.y += ((evt.y - PADDINGY) - lmousecury)/2 / zoom;
        }
        else if (click_mode == "zoom")
        {
            zoom += ((evt.y - PADDINGY) - lmousecury) / 400;
            if (zoom > MAX_ZOOM)
            {
                zoom = MAX_ZOOM;
            }
            else if (zoom < MIN_ZOOM)
            {
                zoom = MIN_ZOOM;
            }
        }

        lmousecurx = evt.x - PADDINGX;
        lmousecury = evt.y - PADDINGY;
    }
    else
    {
        lmouselastx = evt.x - PADDINGX;
        lmouselasty = evt.y - PADDINGY;
    }
}, false);

canvas.addEventListener("mouseup", function(evt)
{
    lmousedown = false;

    // If the release was in the button zone.
    if (evt.x < 100 && evt.y < 260)
    {
        return;
    }
    if (click_mode == "spawn")
    {
        // Locations are complicated by zoom factor.
        bodies.push(new Body(
            center_x + (lmouselastx - (offset.x*zoom) - center_x) / zoom,
            center_y + (lmouselasty - (offset.y*zoom) - center_y) / zoom,
            spawn_mass, spawn_color, true,
            ((evt.x - PADDINGX) - lmouselastx)*CLICKVELFACTOR / zoom,
            ((evt.y - PADDINGY) - lmouselasty)*CLICKVELFACTOR / zoom,
            bodies.length));
    }
}, false);

canvas.addEventListener("mousewheel", function(evt)
{
    var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));

    if (delta < 0)
    {
        zoom = zoom > MIN_ZOOM ? zoom * 0.9 : MIN_ZOOM;
    }
    else
    {
        zoom = zoom < MAX_ZOOM ? zoom * 1.1 : MAX_ZOOM;
    }
}, false);

document.body.onkeydown = function(e)
{
    var key = e.keyCode;
}

document.body.onkeyup = function(e)
{
    var key = e.keyCode;

    // Handle keys with this switch statement.
    switch (key)
    {
        case CODE_M:
            click_mode = "move";
            break;
        case CODE_S:
            click_mode = "spawn";
            break;
        case CODE_D:
            bodies[sun_id].dynamic = !bodies[sun_id].dynamic;
            break;
        case CODE_Z:
            click_mode = "zoom";
            break;
        case CODE_J:
            buttons[4].action();
            break;
        case CODE_K:
            buttons[5].action();
            break;
        case CODE_L:
            buttons[6].action();
            break;
        default:
            //console.log("Unused key.");
            break;
    }
}

/* ***************************************************************************/
/* END GLOBALS ***************************************************************/
/* ***************************************************************************/

/**
Main update function! This is called once every UPDATE_RATE milliseconds. 
*/
function update()
{
    // If the screen size was changed, adjust!
    // Oooooh, responsive!
    if (document.body.clientWidth != canvas.width 
        || document.body.clientHeight != canvas.height)
    {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        center_x = canvas.width/2;
        center_y = canvas.height/2;
    }

    // Clear the screen by drawing the background.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Find how long this update took.
    var this_time = new Date().getTime();
    var dur = this_time - last_time;
    last_time = this_time;

    // If the user left this window/tab, don't jump too far
    if (dur > UPDATE_RATE * 1.1)
    {
        dur = UPDATE_RATE;
    }
    
    handle_bodies(bodies, dur);

    handle_buttons(buttons);

    draw_spawn_path();
}

/**
Handle the bodies array with a given duration.
 
@param bds: Array of Star System Bodies.
@param dur: Duration of previous step.
*/
function handle_bodies(bds, dur)
{
    for (var i = 0; i < bds.length; i++)
    {
        bds[i].tick(dur, bds);
        bds[i].draw(ctx);
    }
}

/**
Handle the buttons array.
Frequency of calling this could be reduced.
 
@param btns: Array of buttons to be handled.
*/
function handle_buttons(btns)
{
    for (var i = 0; i < btns.length; i++)
    {
        btns[i].tick();
        btns[i].draw(ctx);
    }
}

/**
Draw paths for user's convenience.
*/
function draw_spawn_path()
{
    if (lmousedown && click_mode == "spawn")
    {
        // This represents the velocity vector of a new planet.
        ctx.strokeStyle = "white";
        ctx.moveTo(lmouselastx, lmouselasty);
        ctx.lineTo(lmousecurx, lmousecury);
        ctx.stroke();
        ctx.closePath();

        // This is the intended trajectory of the newly spawned planet.
        var mpts = [ [lmouselastx, lmouselasty] ];
        // TODO - why does this factor need to be here? -->\/ and here ->\/
        var vx = (lmousecurx - lmouselastx)*CLICKVELFACTOR*5.75 / zoom**(1.5);
        var vy = (lmousecury - lmouselasty)*CLICKVELFACTOR*5.75 / zoom**(1.5);
        var mx = lmouselastx;
        var my = lmouselasty;

        // Generate a bunch of points to anticipate movement.
        for (var i = 0; i < 2000; i++)
        {
            // Add velocity
            mx += vx;
            my += vy;
            mpts.push( [mx, my] );

            var sun = bodies[sun_id];
            // Explanation in the "Body" class.
            var dist = distance_to(mx, my, center_x + (sun.x + offset.x - center_x) * zoom, center_y + (sun.y + offset.y - center_y) * zoom);
            var denom = Math.pow(dist, 2);
            var accel = G * sun.mass / denom;
            var angle = Math.atan2(my - (center_y + (sun.y + offset.y - center_y) * zoom), mx - (center_x + (sun.x + offset.x - center_x) * zoom));
            vx -= accel * Math.cos(angle);
            vy -= accel * Math.sin(angle);
        }

        // Now, loop through the points and draw the path.
        ctx.strokeStyle = spawn_color;
        ctx.moveTo(mpts[0][0], mpts[0][1]);
        ctx.beginPath();
        for (var i = 0; i < mpts.length; i++)
        {
            ctx.lineTo(mpts[i][0], mpts[i][1]);
            ctx.moveTo(mpts[i][0], mpts[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

/**
Calculate the distance between two pairs of points.

@param {x1, y1}: location of first point.
@param {x2, y2}: location of second point.
*/
function distance_to(x1, y1, x2, y2)
{
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}
