function calculate(){
    var N_star = document.getElementById("N_star").value;
    var f_p = document.getElementById("f_p").value;
    var n_e = document.getElementById("n_e").value;
    var f_l = document.getElementById("f_l").value;
    var f_i = document.getElementById("f_i").value;
    var f_c = document.getElementById("f_c").value;
    var L = document.getElementById("L").value;
    document.getElementById("N").value = N_star * f_p * n_e * f_l * f_i * f_c * L;
}
