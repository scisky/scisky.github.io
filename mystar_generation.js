// Sky Hoffert
// November 3, 2018

/* *************************************************************************************************************************************************************/
/* BEGIN CONSTANTS *********************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/

constants = {
    NUM_STARS: [[1,10], [2,9], [3,3], [4,1]],
    NUM_PLANETS: [[4,10], [5,10], [6,10], [7,9], [8,9], [9,9], [10,8], [11,8], [12,8], [13,7], [14,7], [15,6]],
    
    STAR_TYPES: [['Brown Dwarf',8], ['Red Dwarf', 30], ['Main Sequence Average Mass', 8], ['Main Sequence High Mass', 8], ['Giant', 4], ['Supergiant', 3], ['Hypergiant', 2], ['Neutron', 1]],
    PLANET_TYPES: [['Gas Giant', 4], ['Terrestrial', 4], ['Dwarf', 5]],
    
    // options for possible System Names
    // arbitrarily, I chose constellations and greek letters
    // this may make names seem like they have meaning, but they really don't
    SYSTEM_NAMES: [['Andromeda', 'Aquarius', 'Aquila', 'Ara', 'Argo', 'Aries', 'Auriga', 'Bootes', 'Cancer', 'Canis', 'Capricornus', 'Cassiopeia', 'Centaurus', 'Cepheus', 'Cetus', 'Corona', 'Corvus', 'Crater', 'Cygnus', 'Delphinus', 'Draco', 'Equuleus', 'Eridanus', 'Gemini', 'Hercules', 'Hydra', 'Leo', 'Lepus', 'Libra', 'Lupus', 'Lyra', 'Ophiuchus', 'Orion', 'Pegasus', 'Perseus', 'Pisces', 'Sagittarius', 'Scorpius', 'Serpens', 'Taurus', 'Triangulum', 'Ursa', 'Virgo'], ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega']],
    
    STAR_LIFETIMES: {'Brown Dwarf': 20.0e9, 'Red Dwarf': 1e12, 'Main Sequence Average Mass': 10e9, 'Main Sequence High Mass': 5e9, 'Giant': 1e9, 'Supergiant': 100e6, 'Hypergiant': 10e6, 'Neutron': 1e12},
    STAR_AVERAGE_MASSES: {'Brown Dwarf': 8.75e28, 'Red Dwarf': 5.72e29, 'Main Sequence Average Mass': 1.94e30, 'Main Sequence High Mass': 3.00e30, 'Giant': 1.00e31, 'Supergiant': 7.96e31, 'Hypergiant': 2.50e32, 'Neutron': 2.77e30},
    STAR_STDDEV_MASSES: {'Brown Dwarf': 1.5e28, 'Red Dwarf': 1.5e29, 'Main Sequence Average Mass': 1.2e29, 'Main Sequence High Mass': 8e29, 'Giant': 1.2e30, 'Supergiant': 1.5e31, 'Hypergiant': 2.0e31, 'Neutron': 1e29},
    STAR_AVERAGE_RADII: {'Brown Dwarf': 90.0e6, 'Red Dwarf': 400.0e6, 'Main Sequence Average Mass': 695.5e6, 'Main Sequence High Mass': 1.0e9, 'Giant': 20.0e9, 'Supergiant': 695.5e9, 'Hypergiant': 1.000e10, 'Neutron': 10e3},
    STAR_STDDEV_RADII: {'Brown Dwarf': 10.0e6, 'Red Dwarf': 80.0e6, 'Main Sequence Average Mass': 80.0e6, 'Main Sequence High Mass': 0.3e9, 'Giant': 2.0e9, 'Supergiant': 10.0e9, 'Hypergiant': 0.1e10, 'Neutron': 0.01e3},
    STAR_COLORS: {'Brown Dwarf': ['#8B4513'], 'Red Dwarf': ['maroon'], 'Main Sequence Average Mass': ['yellow'], 'Main Sequence High Mass': ['red', 'blue'], 'Giant': ['red', 'blue'], 'Supergiant': ['red', 'blue'], 'Hypergiant': ['red', 'blue'], 'Neutron': ['white']},
    STAR_AVERAGE_TEMPERATURE: {'Brown Dwarf': 800, 'Red Dwarf': 3100, 'Main Sequence Average Mass': 5750, 'Main Sequence High Mass': 8000, 'Giant': 12500, 'Supergiant': 20000, 'Hypergiant': 33000, 'Neutron': 600000},
    STAR_STDDEV_TEMPERATURE: {'Brown Dwarf': 200, 'Red Dwarf': 500, 'Main Sequence Average Mass': 800, 'Main Sequence High Mass': 1000, 'Giant': 3000, 'Supergiant': 4000, 'Hypergiant': 8000, 'Neutron': 60000},
    
    PLANET_AVERAGE_NUM_MOONS: {'Gas Giant':20, 'Terrestrial':2, 'Dwarf': 0.78},
    PLANET_AVERAGE_MASSES: {'Dwarf': 1.00e21, 'Terrestrial': 5.00e23, 'Gas Giant': 5.00e26},
    PLANET_STDDEV_MASSES: {'Dwarf': 0.2e21, 'Terrestrial': 1.0e23, 'Gas Giant': 1.0e26},
    PLANET_AVERAGE_RADII: {'Dwarf': 1188e3, 'Terrestrial': 6371e3, 'Gas Giant': 32000e3},
    PLANET_STDDEV_RADII: {'Dwarf': 200e3, 'Terrestrial': 1000e3, 'Gas Giant': 8000e3},
    PLANET_AVERAGE_ECCENTRICITY: {'Dwarf': 0.1, 'Terrestrial': 0.01, 'Gas Giant': 0.005},
    PLANET_STDDEV_ECCENTRICITY: {'Dwarf': 0.08, 'Terrestrial': 0.008, 'Gas Giant': 0.004},
    PLANET_AVERAGE_ROTATION_PERIOD: {'Dwarf': 86400, 'Terrestrial': 86400, 'Gas Giant': 40000},
    PLANET_STDDEV_ROTATION_PERIOD: {'Dwarf': 43200, 'Terrestrial': 10000, 'Gas Giant': 10000},
    PLANET_AVERAGE_AXIAL_TILT: {'Dwarf': 5.0, 'Terrestrial': 12.0, 'Gas Giant': 12.0},
    PLANET_STDDEV_AXIAL_TILT: {'Dwarf': 2.0, 'Terrestrial': 8.0, 'Gas Giant': 8.0},
    PLANET_AVERAGE_ALBEDO: {'Dwarf': 0.365, 'Terrestrial': 0.409, 'Gas Giant': 0.450},
    PLANET_STDDEV_ALBEDO: {'Dwarf': 0.05, 'Terrestrial': 0.05, 'Gas Giant': 0.05},
    PLANET_AVERAGE_PRESSURE: {'Dwarf': 0.00001, 'Terrestrial': 101.325, 'Gas Giant': 0.0},
    PLANET_STDDEV_PRESSURE: {'Dwarf': 0.00001, 'Terrestrial': 100.0, 'Gas Giant': 0.0},
    
    PLANET_AVERAGE_INCLINATION: 0.0,
    PLANET_STDDEV_INCLINATION: 3.0,
    
    PLANET_RETROGRADE_CHANCE: 0.01,
    PLANET_RETROGRADE_LENGTH_INCREASE: 10.0,
    
    PLANET_ALL_COLORS: ['gray', 'white', 'yellow', 'tan', 'blue', 'green', 'red', 'maroon', 'pink', 'orange'],
    PLANET_MIN_COLORS: 1,
    PLANET_MAX_COLORS: 4,
    
    ORBIT_CLEAR_FACTOR: 6.0,
    ORBIT_CLEAR_INCREASE_FACTOR: 5.0,
    ORBIT_CLEAR_INCREASE_LIMIT: 100e9,
    
    SEMI_MAJOR_AXIS_FACTOR: 100.0e9,
    SEMI_MAJOR_AXIS_OFFSET: 50.0e9,
    
    SOLAR_LUMINOSITY: 3.846e26,
    STEFAN_BOLTZMANN_CONSTANT: 5.67e-8
}

/* *************************************************************************************************************************************************************/
/* END CONSTANTS *********************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/

/* *************************************************************************************************************************************************************/
/* BEGIN GENERATE_SYSTEM ***************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/

/* CONSTANTS ***********************************************************************************************************/
const SEED_INIT = 1;

/* GLOBAL VARIABLES ****************************************************************************************************/
var seed = SEED_INIT;

/* FUNCTIONS ***********************************************************************************************************/
// Standard Normal variate using Box-Muller transform.
function random_bm(mean=0.5, sigma=0.125) {
    let u = 0, v = 0;
    while(u === 0) u = random(); //Converting [0,1) to (0,1)
    while(v === 0) v = random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    let diff_mean = mean - 0.5;
    let diff_stddev = sigma / 0.125;
    // bring value down to be around 0 and scale/translate
    num -= 0.5;
    num *= diff_stddev;
    num += diff_mean + 0.5;
    return num;
}

// Random uniform value between 0 and 1
function random(min=0, max=1) {
    let x = Math.sin(seed++) * 10000;
    x = x - Math.floor(x);
    let range = max - min;
    x *= range;
    x += min;
    return x;
}

/*
Returns the dict describing the parent star of a given planet in a given system
    @arg planet: dict; describes the target planet
    @arg system: dict; describes the target star
    @return: dict; describing the parent star
*/
function find_parent_star(planet, system){
    // search the system for the parent
    for (let i = 0; i < system['stars'].length; i++){
        if (planet['parent'] == system['stars'][i]['name']){
            return system['stars'][i];
        }
    }
    
    // if no parent is found, return None
    return null;
}

/*
Calculates orbital clearing given certain planet parameters
    @arg planet: dict; describes the target planet
    @arg system: dict; describes the target system
    @return: float; orbital clearing distance in m
*/
function calculate_orbital_clearing(planet, system){
    let a = planet['semi_major_axis'];
    let m = planet['mass'];
    let M = find_parent_star(planet, system)['mass'];

    let r_soi = a * (m / M)**(2/5);
    let clearing = r_soi * constants.ORBIT_CLEAR_FACTOR;

    if (clearing < constants.ORBIT_CLEAR_INCREASE_LIMIT){
        clearing *= constants.ORBIT_CLEAR_INCREASE_FACTOR;
    }

    return clearing;
}

// round a floating point value with given significant figures
function round_to_sigfigs(val, sigfigs){
    return Number.parseFloat(val.toPrecision(sigfigs));
}

// actual specific generation functions ****
/*
Main function for system generation. This will use all other functions to create a system.
    @return dict; describing the generated system
*/
function generate_system(){
    // create the dict
    let system = {};

    // generate a system name and Stars!
    system['name'] = generate_system_name();
    system['stars'] = generate_stars(system['name']);
    
    // at this point we generate an age in years
    let longest = 13.7e9;
    let i = 0;

    // check every Star given for longest possible age
    for (i = 0; i < system['stars'].length; i++){
        longest = constants.STAR_LIFETIMES[system['stars'][i]['type']] < longest ? constants.STAR_LIFETIMES[system['stars'][i]['type']] : longest;
    }

    system['age'] = Math.round(random(0, 1) * longest);

    // include some basic values in the system
    system['discovered_by'] = 'sky';
    system['date_discovered'] = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    system['planets'] = [];

    // generate the planets of this system
    let num_planets = generate_value_from_list(constants.NUM_PLANETS);
    for (i = 0; i < num_planets; i++){
        let type = generate_value_from_list(constants.PLANET_TYPES)
        system['planets'].push(generate_planet_details(type, system));
    }

    return system;
}

/* 
Returns a value from a predefined list meeting the proper format
    @arg list: list; holds values that match the format (value, weight)
    @return: variable; the "random" value generated
*/
function generate_value_from_list(list){
    // first, calculate the total value of all weights
    var total_dist = 0;
    var i = 0;
    for (i = 0; i < list.length; i++){
        total_dist += list[i][1];
    }
    
    // generate a random value
    var val = random(0,1) * total_dist;
    var total_running = 0;
    
    // now, find which type based on that random value
    for (i = 0; i < list.length; i++){
        total_running += list[i][1];
        if (val < total_running){
            return list[i][0];
        }
    }
    return list[0][0]
}

/* 
Generates a new, random system name!
    @return: string; name of a new system
*/
function generate_system_name(){
    let system_name  = String(Math.floor(1000 + random(0, 9000)));
    system_name += ' ' + String(constants.SYSTEM_NAMES[1][Math.floor(random(0, constants.SYSTEM_NAMES[1].length))]);
    system_name += '-' + String(constants.SYSTEM_NAMES[1][Math.floor(random(0, constants.SYSTEM_NAMES[1].length))]);
    system_name += ' ' + String(constants.SYSTEM_NAMES[0][Math.floor(random(0, constants.SYSTEM_NAMES[0].length))]);

    return system_name;
}

/*
Generates Stars for a given system and names them appropriately.
    @arg name: string; name of the system
    @return: array; of Stars
*/
function generate_stars(system_name){
    // generate number of Stars
    let num_stars = generate_value_from_list(constants.NUM_STARS);

    let stars = [];
    let star_types = [];
    let star_letter_int = 'A'.charCodeAt(0);
    let i = 0;
    for (i = 0; i < num_stars; i++){
        let star_type = generate_value_from_list(constants.STAR_TYPES);
        let details = generate_star_details(star_type);
        let name = system_name + ' ' + String.fromCharCode(star_letter_int);
        details['name'] = name;
        star_letter_int += 1;
        stars.push(details);
    }

    return stars;
}

/*
Generates a dictionary object that fully describes a new Star
    @arg s: string; describes the type of Star
    @return: dict; all details about the new Star
*/
function generate_star_details(s){
    let star = {};

    star['type'] = s;
    star['mass'] = round_to_sigfigs(random_bm(constants.STAR_AVERAGE_MASSES[s], constants.STAR_STDDEV_MASSES[s]), 4);
    star['radius'] = generate_star_radius(s, star['mass']);
    star['surface_temperature'] = generate_star_temperature(s, star['mass'], star['radius']);
    star['parent'] = '';
    star['colors'] = generate_star_colors(star);
    star['alternate_names'] = [];

    return star;
}

/* STAR GENERATION *****************************************************************************************************/
/*
Generates the radius of a given type of Star, depending on the Mass
    @arg s: string; the type of Star provided
    @arg mass: int; mass of the given Star in kg to correlate a radius to
    @return: int; radius of given Star in meters
*/
function generate_star_radius(s, mass){
    // use the difference in mass to calculate a correlated difference in radius
    let num_stddevs_away = (mass - constants.STAR_AVERAGE_MASSES[s]) / constants.STAR_STDDEV_MASSES[s];
    let radius = constants.STAR_AVERAGE_RADII[s]  + constants.STAR_STDDEV_RADII[s] * num_stddevs_away * random_bm(1,0.1);

    return round_to_sigfigs(radius, 4);
}

/*
Generate the temperature of a given type of Star, depending on Mass and Radius
    @arg s: string; the type of Star provided
    @arg mass: int; mass of the given Star in kg
    @arg radius: int; radius of the given Star in m
    @return: int; temperature of given star in Kelvin
*/
function generate_star_temperature(s, mass, radius){
    let num_stddevs_away = (mass - constants.STAR_AVERAGE_MASSES[s]) / constants.STAR_STDDEV_MASSES[s];
    let temp = constants.STAR_AVERAGE_TEMPERATURE[s] + constants.STAR_STDDEV_TEMPERATURE[s] * num_stddevs_away * random_bm(1,0.1);

    return Math.round(temp);
}

/*
Generates colors of a Star, given the type
    @arg star: dict; describes the Star
    @return: list; of colors describing the Star
*/
function generate_star_colors(star){
    // fetch the predefined possible colors and make a deep copy
    let temp = [];
    for (let i = 0; i < constants.STAR_COLORS[star['type']].length; i++){
        temp.push(constants.STAR_COLORS[star['type']][i]);
    }
    
    // remove wrong colors if giant type
    if (star['type'] === 'Main Sequence High Mass' || star['type'] === 'Giant' || star['type'] === 'Supergiant' || star['type'] === 'Hypergiant'){
        temp = temp.splice(Math.round(random(0, 1)), 1);
    }

    return temp;
}

/* PLANET GENERATION ***************************************************************************************************/
/*
Generates a dictionary object that fully describes a new planet
    @arg p: string; describes the type of planet
    @arg system: dict; describes the entire system
    @return: dict; all details about the new planet
*/
function generate_planet_details(p, system){
    let planet = {};

    // name is set first to a ? to indicate it is being modified
    planet['name'] = '?';

    planet['type'] = p;
    planet['parent'] = system['stars'][Math.round(random(0,system['stars'].length-1))]['name'];
    
    // now that the planet has a parent, it can be named properly
    planet['name'] = generate_planet_name(system, planet['parent']);
    
    planet['mass'] = round_to_sigfigs(random_bm(constants.PLANET_AVERAGE_MASSES[p], constants.PLANET_STDDEV_MASSES[p]), 4);
    planet['radius'] = generate_planet_radius(p, planet['mass']);
    planet['semi_major_axis'] = generate_planet_sma(planet, system);
    planet['eccentricity'] = Math.abs(round_to_sigfigs(random_bm(constants.PLANET_AVERAGE_ECCENTRICITY[p], constants.PLANET_STDDEV_ECCENTRICITY[p]), 4));

    // the first planet in any system will have 0 inclination, the rest will have relative
    if (planet['name'].substr(-1) == 'a'){
        planet['inclination'] = 0.0;
    } else {
        planet['inclination'] = round_to_sigfigs(random_bm(constants.PLANET_AVERAGE_INCLINATION, constants.PLANET_STDDEV_INCLINATION), 4);
    }
    
    planet['rotation_period'] = generate_planet_rotation_period(planet);
    planet['axial_tilt'] = round_to_sigfigs(random_bm(constants.PLANET_AVERAGE_AXIAL_TILT[p], constants.PLANET_STDDEV_AXIAL_TILT[p]), 4);
    planet['albedo'] = Math.abs(round_to_sigfigs(random_bm(constants.PLANET_AVERAGE_ALBEDO[p], constants.PLANET_STDDEV_ALBEDO[p]), 4));
    planet['surface_pressure'] = generate_planet_surface_pressure(planet);
    planet['surface_temperature'] = generate_planet_temp(planet, system);
    planet['colors'] = generate_planet_colors(planet);

    planet['rings'] = [];
    planet['moons'] = [];
    planet['alternate_names'] = [];
    
    // Moons:
    let avg = constants.PLANET_AVERAGE_NUM_MOONS[p];
    // use a normal curve with mean equal to average and a fitting stddev
    let num_moons = Math.abs(Math.floor(random_bm(avg,avg/2)));
    // special case, if gas giant, add minimum number of moons!
    if (planet['type'] === 'Gas Giant'){
        num_moons += constants.PLANET_AVERAGE_NUM_MOONS[planet['type']];
    }
    // TODO - Add moons!

    // Rings:
    // only applies to gas giants!
    if (planet['type'] == 'Gas Giant'){
        // TODO: add chance for rings to gas giants
    }

    return planet
}

/*
Generates a planet name given the system and parent
    @arg system: dict; describes the entire system
    @arg parent: dict; describes the parent object
    @return: string; name for the planet
*/
function generate_planet_name(system, parent){
    // keep track of how many children the parent has
    let num_parent_children = 0;
    let i = 0;

    // loop through all planets in the system
    for (i = 0; i < system['planets'].length; i++){
        // detect if this planet is the one we are naming
        if (system['planets'][i]['name'] === '?'){
            continue;
        }

        // otherwise, check if the parent has other children
        if (system['planets'][i]['parent'] === parent){
            num_parent_children += 1;
        }
    }

    // add a lowercase letter to indicate a planet
    return parent + String.fromCharCode('a'.charCodeAt(0) + num_parent_children);
}

/*
Generates a planet radius, given the type of planet and mass
    @arg p: string; indicates the type of planet
    @arg mass: int; mass of the given planet in kg
    @return: int; value for radius of given planet
*/
function generate_planet_radius(p, mass){
    // use the difference in mass to calculate a correlated difference in radius
    let num_stddevs_away = (mass - constants.PLANET_AVERAGE_MASSES[p]) / constants.PLANET_STDDEV_MASSES[p];
    let radius = constants.PLANET_AVERAGE_RADII[p] + constants.PLANET_STDDEV_RADII[p] * num_stddevs_away * random_bm(1,0.1);

    return Math.round(radius)
}

/*
Generates a planet orbital radius (semi-major-axis), given the planet and system
    @arg planet: dict; describes the given planet
    @arg system: dict; describes the entire system
    @return: int; orbital radius value in meters
*/
function generate_planet_sma(planet, system){
    // Loop until a good sma is found
    let passing = false;
    let sma = 0;
    while (!passing){
        sma = Math.abs(random_bm(0.5,1)*constants.SEMI_MAJOR_AXIS_FACTOR + constants.SEMI_MAJOR_AXIS_OFFSET);
        passing = true;
        for (let i = 0; i < system['planets'].length; i++){
            if (planet['parent'] === system['planets'][i]['parent']){
                let this_clearance = calculate_orbital_clearing(planet, system);
                let p_clearance = calculate_orbital_clearing(system['planets'][i], system);
                let max_sma = system['planets'][i]['semi_major_axis'] - p_clearance - this_clearance;
                let min_sma = system['planets'][i]['semi_major_axis'] + p_clearance + this_clearance;
                if (sma > max_sma && sma < min_sma){
                    passing = false;
                    break;
                }
            }
        }
    }

    return Math.round(sma);
}

/*
Generates a rotational period
    @arg planet: dict; describes the target planet
    @return: float; rotational period in seconds
*/
function generate_planet_rotation_period(planet){
    // first, find the average and stddev for each type
    let mean = constants.PLANET_AVERAGE_ROTATION_PERIOD[planet['type']];
    let stddev = constants.PLANET_STDDEV_ROTATION_PERIOD[planet['type']];
    let rot_per = Math.abs(random_bm(mean, stddev));

    // make some planets randomly have retrograde rotation, not gas giants though
    if (planet['type'] === 'Dwarf' || planet['type'] === 'Gas Giant'){
        if (random(0.0, 1.0) < constants.PLANET_RETROGRADE_CHANCE){
            // retrograde rotations probably have longer rotation rates as well
            rot_per *= -constants.PLANET_RETROGRADE_LENGTH_INCREASE;
        }
    }

    return Math.round(rot_per)
}

/*
Generates a surface pressure for the given planet
    @arg planet: dict; describes the target planet
    @return: float; surface pressure in kPa
*/
function generate_planet_surface_pressure(planet){
    let mean = constants.PLANET_AVERAGE_PRESSURE[planet['type']];
    let stddev = constants.PLANET_STDDEV_PRESSURE[planet['type']];

    let P = random_bm(mean, stddev);
    // if negative, approach 0 as the inverse
    if (P < 0){
        P = 1 / -P;
    }
    
    return round_to_sigfigs(P, 6);
}

/*
Generates a minimum surface temperature for the given planet
    @arg planet: dict; describes the target planet
    @return: float; minimum surface temperature in Kelvin
*/
// TODO - fix this function, temperatures are not correct
function generate_planet_temp(planet, system){
    // Use the properties of the parent star
    let R_star = find_parent_star(planet, system)['radius'];
    let T_star = find_parent_star(planet, system)['surface_temperature'];
    // Luminosity formula
    let L_star = 4 * 3.14159 * R_star**2 * constants.STEFAN_BOLTZMANN_CONSTANT * T_star**4;
    // Radiative Equilibrium Temperature formula
    let T = (L_star * (1 - planet['albedo']) / (16 * 3.14159 * planet['semi_major_axis']**2 * constants.STEFAN_BOLTZMANN_CONSTANT))**(1/4);

    return round_to_sigfigs(T, 3);
}

/*
Generates a list of colors to associate with the given planet
    @arg planet: dict; describes the planet
    @return: list; colors that should be attached to the planet
*/
function generate_planet_colors(planet){
    let colors = [];

    // randomly (uniformly) select a number of colors
    let num = random(constants.PLANET_MIN_COLORS, constants.PLANET_MAX_COLORS);

    // iterate through as many as was chosen
    for (let i=0; i < num; i++){
        let color = constants.PLANET_ALL_COLORS[Math.round(random(0, constants.PLANET_ALL_COLORS.length))];
        if (!colors.includes(color)){
            colors.push(color);
        }
    }

    return colors;
}

/* *************************************************************************************************************************************************************/
/* END GENERATE_SYSTEM *****************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/

/* *************************************************************************************************************************************************************/
/* BEGIN DRAWING ***********************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/

/*
Function that sets the seed and returns the generated system
    @arg: sd: int; (optional) sets the seed
    @return: void
*/
function new_system(sd=(new Date().getTime())){
    seed = sd;
    //document.getElementById('h_seed').innerHTML = 'Seed: ' + seed;
    return generate_system();
}

// grab the canvas from the html document and set things for it
var c = document.getElementById("main_canvas");
c.width = 1280;
c.height = 973;
var ctx = c.getContext("2d");

// keep track of the current system
var system = null;

// move around the screen with these variables
var zoom = 1.0;
var offset_x = 0;
var offset_y = 0;
var track_obj = null;
var mouse_down = false;
var mouse_down_pos = {x: 0, y: 0};
var camera_move_amt = {x: 0, y: 0};

const SPEED_STAR = 0.0001;
const SPEED_PLANET = 0.005;
const CLICK_DISTANCE = 20;
const HIGHLIGHT_RADIUS_PLANET = 1.3;
const HIGHLIGHT_RADIUS_STAR = 1.2;
const CAMERA_SPEED = 0.1;
const FILL_ALPHA = 0.4;

// set frame rate to 30 fps
setInterval(update, 1000/30);

c.addEventListener('mousedown', function(evt) {
    mouse_down = true;
    if (track_obj && track_obj != 'home'){
        track_obj['highlighted'] = false;
        clearinfo();
    }

    let rect = c.getBoundingClientRect();
    let scaleX = c.width / rect.width;    // relationship bitmap vs. element for X
    let scaleY = c.height / rect.height;  // relationship bitmap vs. element for Y
    mouse_down_pos.x = Number.parseInt((evt.clientX - rect.left) * scaleX);
    mouse_down_pos.y = Number.parseInt((evt.clientY - c.offsetTop) * scaleY);
}, false);

c.addEventListener('mousemove', function(evt){
    if (mouse_down){
        let rect = c.getBoundingClientRect();
        let scaleX = c.width / rect.width;    // relationship bitmap vs. element for X
        let scaleY = c.height / rect.height;  // relationship bitmap vs. element for Y
        newx = Number.parseInt((evt.clientX - rect.left) * scaleX);
        newy = Number.parseInt((evt.clientY - c.offsetTop) * scaleY);

        camera_move_amt.x = (newx - mouse_down_pos.x) / zoom;
        camera_move_amt.y = (newy - mouse_down_pos.y) / zoom;

        offset_x += camera_move_amt.x;
        offset_y += camera_move_amt.y;

        mouse_down_pos.x = newx;
        mouse_down_pos.y = newy;
    }
    
}, false);

c.addEventListener('mouseup', function(evt) {
    let rect = c.getBoundingClientRect();
    let scaleX = c.width / rect.width;    // relationship bitmap vs. element for X
    let scaleY = c.height / rect.height;  // relationship bitmap vs. element for Y
    let mousePos = {x: Number.parseInt((evt.clientX - rect.left) * scaleX), y: Number.parseInt((evt.clientY - c.offsetTop) * scaleY)};
    mouse_down = false;

    let obj = click_near_object(mousePos.x, mousePos.y);
    if (obj != null){
        document.getElementById('info_name').innerHTML = obj['name'];
        document.getElementById('info_type').innerHTML = obj['type'];
        //document.getElementById('info_parent').innerHTML = obj['parent'];
        document.getElementById('info_mass').innerHTML = obj['mass'].toExponential() + ' kilograms';
        document.getElementById('info_radius').innerHTML = obj['radius'].toExponential() + ' meters';
        document.getElementById('info_temperature').innerHTML = obj['surface_temperature'] + ' Kelvin';
        
        if (obj['type'] === 'Dwarf' || obj['type'] === 'Terrestrial' || obj['type'] === 'Gas Giant'){
            document.getElementById('info_eccentricity').innerHTML = obj['eccentricity'];
            document.getElementById('info_inclination').innerHTML = obj['inclination'] + '&deg;';
            document.getElementById('info_rotation_period').innerHTML = obj['rotation_period'] + ' seconds';
            document.getElementById('info_axial_tilt').innerHTML = obj['axial_tilt'] + '&deg;';
            document.getElementById('info_albedo').innerHTML = obj['albedo'];
            document.getElementById('info_pressure').innerHTML = obj['surface_pressure'].toExponential() + ' kPa';
        } else {
            document.getElementById('info_eccentricity').innerHTML = '';
            document.getElementById('info_inclination').innerHTML = '';
            document.getElementById('info_rotation_period').innerHTML = '';
            document.getElementById('info_axial_tilt').innerHTML = '';
            document.getElementById('info_albedo').innerHTML = '';
            document.getElementById('info_pressure').innerHTML = '';
        }
    } else {
        clearinfo();
    }

    // set the track object
    track_obj = obj;
}, false);

c.addEventListener('mousewheel', function(evt) {
    var delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
    if (delta < 0){
        zoom *= 0.9;
    } else {
        zoom *= 1.1;
    }
}, false);

document.body.onkeyup = function(e){
    if (e.keyCode == 32){
        if (track_obj && track_obj != 'home'){
            track_obj['highlighted'] = false;
            clearinfo();
        }

        track_obj = 'home';
    }
}

/*
Determines what happens when the mouse button is released (may happen anywhere)
    @return: void
*/
function mouseup(){
    mouse_down = false;
}

/*
Removes the tracked object so that the camera returns home
    @arg: sd: int; (optional) sets the seed
    @return: void
*/
function gohome(){
    mouseup();
    track_obj = 'home';
}

/*
Clears all fields in the righthand info pane
    @return: void
*/
function clearinfo(){
    document.getElementById('info_name').innerHTML = '';
    document.getElementById('info_type').innerHTML = '';
    //document.getElementById('info_parent').innerHTML = '';
    document.getElementById('info_mass').innerHTML = '';
    document.getElementById('info_radius').innerHTML = '';
    document.getElementById('info_temperature').innerHTML = '';
    document.getElementById('info_eccentricity').innerHTML = '';
    document.getElementById('info_inclination').innerHTML = '';
    document.getElementById('info_rotation_period').innerHTML = '';
    document.getElementById('info_axial_tilt').innerHTML = '';
    document.getElementById('info_albedo').innerHTML = '';
    document.getElementById('info_pressure').innerHTML = '';
}

/*
Main update function
    @return: void
*/
function update(){
    // clear the screen
    ctx.clearRect(0, 0, c.width, c.height);

    // handle the stars
    move_stars();
    draw_stars();

    // draw planets elsewhere
    move_planets();
    draw_planets();

    // move the camera
    move_camera();
}

/*
Move the camera towards the currently tracked object
    @return: void
*/
function move_camera(){
    if (!mouse_down){
        if (track_obj){
            if (track_obj === 'home'){
                // code that moves camera to center
                offset_x = Math.abs(offset_x) > 1 ? offset_x * (1-CAMERA_SPEED) : offset_x;
                offset_y = Math.abs(offset_y) > 1 ? offset_y * (1-CAMERA_SPEED) : offset_y;
            } else if (Math.abs(track_obj['x'] - c.width/2) > 1 || Math.abs(track_obj['y'] - c.height/2) > 1){
                offset_x -= (track_obj['x'] - c.width/2) * CAMERA_SPEED/zoom;
                offset_y -= (track_obj['y'] - c.height/2) * CAMERA_SPEED/zoom;
            }
        } else {
            // code that slowly stops moving camera
            camera_move_amt.x = Math.abs(camera_move_amt.x) > 0.1 ? camera_move_amt.x * CAMERA_SPEED*8 : 0;
            camera_move_amt.y = Math.abs(camera_move_amt.y) > 0.1 ? camera_move_amt.y * CAMERA_SPEED*8 : 0;
            offset_x = Math.abs(offset_x) > 1 ? offset_x + camera_move_amt.x : offset_x;
            offset_y = Math.abs(offset_y) > 1 ? offset_y + camera_move_amt.y : offset_y;
        }
    }
}

/*
Draw stars for the global system variable
    @return: void
*/
function draw_stars(){
    if (system){
        for (let i = 0; i < system['stars'].length; i++){
            draw_star(system['stars'][i]);
        }
    }
}

/*
Draw stars for the global system variable
    @arg star: dict; describes the target star
    @return: void
*/
function draw_star(star){
    // optionally draw highlight
    if (star['highlighted']){
        // draw orbital path with grayish color
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star['x'], star['y'], HIGHLIGHT_RADIUS_STAR*radius_of_star(star) * zoom, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(star['x'], star['y']);
        ctx.lineTo(star['x'], c.height/2);
        ctx.stroke();
        ctx.lineTo(c.width, c.height/2);
        ctx.stroke();
        ctx.closePath();
    }

    // draw the planet
    let img = new Image();
    // load image for different types
    if (star['type'] === 'Red Dwarf'){
        img.src = 'gfx/star_reddwarf.gif';
    } else if (star['type'] === 'Brown Dwarf'){
        img.src = 'gfx/star_browndwarf.gif';
    } else if (star['type'] === 'Neutron'){
        img.src = 'gfx/star_neutron.gif';
    } else if (star['colors'][0] === 'red'){
        img.src = 'gfx/star_redgiant.gif';
    } else if (star['colors'][0] === 'blue'){
        img.src = 'gfx/star_bluegiant.gif';
    } else if (star['colors'][0] === 'yellow'){
        img.src = 'gfx/star_yellow.gif';
    } else {
        console.log(star['colors']);
    }
    
    // draw the image
    let rad = radius_of_star(star)*zoom;
    ctx.drawImage(img, star['x'] - rad, star['y'] - rad, 2*rad, 2*rad);
}

/*
Move the Stars in the system by their velocity and positions
    @return: void
*/
function move_stars(){
    if (system){
        let curtime = -(new Date().getTime());
        let center_x = c.width/2 + offset_x*zoom;
        let center_y = c.height/2 + offset_y*zoom;
        if (system['stars'].length === 1){
            system['stars'][0]['x'] = center_x;
            system['stars'][0]['y'] = center_y;
        } else if (system['stars'].length === 2){
            system['stars'][0]['x'] = center_x + Math.sin(curtime * SPEED_STAR) * 50 * zoom;
            system['stars'][0]['y'] = center_y + Math.cos(curtime * SPEED_STAR) * 50 * zoom;
            system['stars'][1]['x'] = center_x - Math.sin(curtime * SPEED_STAR) * 50 * zoom;
            system['stars'][1]['y'] = center_y - Math.cos(curtime * SPEED_STAR) * 50 * zoom;
            
            // draw orbital path with grayish color
            ctx.strokeStyle = '#444444';
            ctx.beginPath();
            ctx.arc(center_x, center_y, 50 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        } else if (system['stars'].length === 3){
            system['stars'][0]['x'] = center_x + zoom * (70*Math.sin(curtime * SPEED_STAR) + 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][0]['y'] = center_y + zoom * (70*Math.cos(curtime * SPEED_STAR) + 25*Math.cos(curtime * SPEED_STAR * 4));
            system['stars'][1]['x'] = center_x + zoom * (70*Math.sin(curtime * SPEED_STAR) - 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][1]['y'] = center_y + zoom * (70*Math.cos(curtime * SPEED_STAR) - 25*Math.cos(curtime * SPEED_STAR * 4));
            system['stars'][2]['x'] = center_x - zoom * (70*Math.sin(curtime * SPEED_STAR));
            system['stars'][2]['y'] = center_y - zoom * (70*Math.cos(curtime * SPEED_STAR));

            // draw orbital path with grayish color
            ctx.strokeStyle = '#444444';
            ctx.beginPath();
            ctx.arc(center_x, center_y, 70 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(center_x + zoom * (70*Math.sin(curtime * SPEED_STAR)), center_y + zoom * (70*Math.cos(curtime * SPEED_STAR)), 25 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        } else if (system['stars'].length === 4){
            system['stars'][0]['x'] = center_x + zoom * (70*Math.sin(curtime * SPEED_STAR) + 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][0]['y'] = center_y + zoom * (70*Math.cos(curtime * SPEED_STAR) + 25*Math.cos(curtime * SPEED_STAR * 4));
            system['stars'][1]['x'] = center_x + zoom * (70*Math.sin(curtime * SPEED_STAR) - 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][1]['y'] = center_y + zoom * (70*Math.cos(curtime * SPEED_STAR) - 25*Math.cos(curtime * SPEED_STAR * 4));
            system['stars'][2]['x'] = center_x - zoom * (70*Math.sin(curtime * SPEED_STAR) + 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][2]['y'] = center_y - zoom * (70*Math.cos(curtime * SPEED_STAR) + 25*Math.cos(curtime * SPEED_STAR * 4));
            system['stars'][3]['x'] = center_x - zoom * (70*Math.sin(curtime * SPEED_STAR) - 25*Math.sin(curtime * SPEED_STAR * 4));
            system['stars'][3]['y'] = center_y - zoom * (70*Math.cos(curtime * SPEED_STAR) - 25*Math.cos(curtime * SPEED_STAR * 4));
            
            // draw orbital path with grayish color
            ctx.strokeStyle = '#444444';
            ctx.beginPath();
            ctx.arc(center_x, center_y, 70 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.arc(center_x + zoom * 70*Math.sin(curtime * SPEED_STAR), center_y + zoom * 70*Math.cos(curtime * SPEED_STAR), 25 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.arc(center_x - zoom * 70*Math.sin(curtime * SPEED_STAR), center_y - zoom * 70*Math.cos(curtime * SPEED_STAR), 25 * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

/*
Draw planets for the global system variable
    @return: void
*/
function draw_planets(){
    if (system){
        let center_x = c.width/2 + offset_x*zoom;
        let center_y = c.height/2 + offset_y*zoom;
        for (let i = 0; i < system['planets'].length; i++){
            // draw orbital path with grayish color
            ctx.strokeStyle = '#444444';
            ctx.beginPath();
            ctx.arc(center_x, center_y, Math.abs(planet_x_by_i(i) - c.width/2) * zoom, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();

            // optionally draw highlight
            if (system['planets'][i]['highlighted']){
                let radius = HIGHLIGHT_RADIUS_PLANET*radius_of_planet(system['planets'][i]);
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(system['planets'][i]['x'], system['planets'][i]['y'], radius * zoom, 0, 2*Math.PI);
                ctx.fill();
                ctx.closePath();
                
                ctx.strokeStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(system['planets'][i]['x'], system['planets'][i]['y']);
                ctx.lineTo(system['planets'][i]['x'], c.height/2);
                ctx.stroke();
                ctx.lineTo(c.width, c.height/2);
                ctx.stroke();
                ctx.closePath();
            }

            // draw the planet
            let img = new Image();
            // load image for different types
            if (system['planets'][i]['type'] === 'Dwarf'){
                img.src = 'gfx/planet_dwarf.gif';
            } else if (system['planets'][i]['type'] === 'Terrestrial'){
                img.src = 'gfx/planet_terrestrial.gif';
            } else {
                img.src = 'gfx/planet_gasgiant.gif';
            }
            // draw the image
            let rad = radius_of_planet(system['planets'][i])*zoom;
            ctx.drawImage(img, system['planets'][i]['x'] - rad, system['planets'][i]['y'] - rad, 2*rad, 2*rad);

            // to tint, draw a circle over the planet with lower fill alpha
            ctx.globalAlpha = FILL_ALPHA;
            ctx.fillStyle = system['planets'][i]['colors'][0];
            ctx.beginPath();
            ctx.arc(system['planets'][i]['x'], system['planets'][i]['y'], rad, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1.0;
        }
    }
}

/*
Return a position for planet at given index. This function is temporary TODO
    @arg i: int; index of the given planet
    @return: int; position of planet on screen in pixels
*/
function planet_x_by_i(i){
    // even numbers are on the right side
    return i % 2 === 0 ? c.width/2 + ((i)*25 + 200) : c.width/2 - ((i)*25 + 200);
}

/*
Move the planets in the system
    @return: void
*/
function move_planets(){
    if (system){
        let curtime = -(new Date().getTime());
        let center_x = c.width/2 + offset_x*zoom;
        let center_y = c.height/2 + offset_y*zoom;
        for (let i = 0; i < system['planets'].length; i++){
            let dist = planet_x_by_i(i) - c.width/2;
            system['planets'][i]['x'] = center_x + Math.sin(curtime * SPEED_PLANET * (1/Math.abs(dist))) * dist * zoom;
            system['planets'][i]['y'] = center_y + Math.cos(curtime * SPEED_PLANET * (1/Math.abs(dist))) * dist * zoom;
        }
    }
}

/*
Calculate and return radius for a given type of star
    @arg star: dict; describing the target star
    @return: int; radius of star in pixels
*/
function radius_of_star(star){
    if (star['type'] == 'Brown Dwarf'){
        return 8;
    } else if (star['type'] === 'Red Dwarf'){
        return 10;
    } else if (star['type'] === 'Main Sequence Average Mass'){
        return 12;
    } else if (star['type'] === 'Main Sequence High Mass'){
        return 14;
    } else if (star['type'] === 'Giant'){
        return 16;
    } else if (star['type'] === 'Supergiant'){
        return 18;
    } else if (star['type'] === 'Hypergiant'){
        return 20;
    } else /* Neutron Star */ {
        return 2;
    }
}

/*
Calculate and return radius for a given type of planet
    @arg planet: dict; describing the target planet
    @return: int; radius of planet in pixels
*/
function radius_of_planet(planet){
    if (planet['type'] == 'Dwarf'){
        return 2;
    } else if (planet['type'] === 'Terrestrial'){
        return 4;
    } else /* Gas Giant */ {
        return 6;
    }
}

/*
Load a new system! Should be linked to an onclick event.
    @return: void
*/
function load_system(){
    system = new_system();
    document.getElementById('system_name').innerHTML = system['name'];
    document.getElementById('system_name').style.color = system['stars'][0]['colors'][0];
    
    if (system){
        for (let i = 0; i < system['stars'].length; i++){
            system['stars'][i]['x'] = -100;
            system['stars'][i]['y'] = -100;
            system['stars'][i]['highlighted'] = false;
        }

        for (let i = 0; i < system['planets'].length; i++){
            system['planets'][i]['x'] = planet_x_by_i(i);
            system['planets'][i]['y'] = c.height/2;
            system['planets'][i]['highlighted'] = false;
        }
    }

    document.getElementById('info_name').innerHTML = '';
}

/*
Check if given click coordinates are near an object and return it
    @arg x: int; click x coordinate
    @arg y: int; click y coordinate
    @return: dict; describing the target object that was clicked
*/
function click_near_object(x, y){
    let obj = null;
    if (system){
        for (let i = 0; i < system['stars'].length; i++){
            system['stars'][i]['highlighted'] = false;
            if (!obj && distance_to(x, y, system['stars'][i]['x'], system['stars'][i]['y']) < CLICK_DISTANCE * zoom){
                system['stars'][i]['highlighted'] = true;
                obj = system['stars'][i];
            }
        }
        for (let i = 0; i < system['planets'].length; i++){
            system['planets'][i]['highlighted'] = false;
            if (!obj && distance_to(x, y, system['planets'][i]['x'], system['planets'][i]['y']) < CLICK_DISTANCE * zoom){
                system['planets'][i]['highlighted'] = true;
                obj = system['planets'][i];
            }
        }
    }

    return obj;
}

/*
Find the vector distance between 2 points
    @arg x1: int; point x1
    @arg y1: int; point y1
    @arg x2: int; point x2
    @arg y2: int; point y2
    @return: float; distance between the two points
*/
function distance_to(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

/* *************************************************************************************************************************************************************/
/* END DRAWING *************************************************************************************************************************************************/
/* *************************************************************************************************************************************************************/
