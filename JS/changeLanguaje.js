
let botonUSA = document.getElementById("changelangUSA");
botonUSA.addEventListener("click", function(){
    localStorage.locale = "en";
    window.location.reload();
});

let botonMEX = document.getElementById("changelangMEX");
botonMEX.addEventListener("click", function(){
    localStorage.locale = "es";
    window.location.reload();
});

