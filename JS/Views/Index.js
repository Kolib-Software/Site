
async function esloganTecleada(texto, elemento, cursor, velocidad = 200) {
    let i = 0;
    cursor.style.visibility = "";
    while (i < texto.length) {
        elemento.textContent += texto.charAt(i);
        i++;
        await new Promise(resolve => setTimeout(resolve, velocidad));
    }

    if (elemento.id !== 'fourthH2') {
        cursor.style.visibility = "hidden";
        if (elemento.nextElementSibling) {
            elemento.nextElementSibling.style.visibility = "visible";
        }
    } else {
        setInterval(function() {
            cursor.style.visibility = (cursor.style.visibility === 'hidden' ? '' : 'hidden');
        }, 500);
    }
}

const FirstH2 = document.getElementById('FirstH2');
const Cursor1 = document.getElementById('Cursor1');
const SecondH2 = document.getElementById('SecondH2');
const Cursor2 = document.getElementById('Cursor2');
const ThirdH2 = document.getElementById('ThirdH2');
const Cursor3 = document.getElementById('Cursor3');
const fourthH2 = document.getElementById('fourthH2');
const Cursor4 = document.getElementById('Cursor4');

Cursor2.style.visibility = "hidden";
Cursor3.style.visibility = "hidden";
Cursor4.style.visibility = "hidden";

const text1 = " // Building your ideas,";
const text2 = " // web and software to";
const text3 = " // elevate your business...";
const text4 = " // :)";

const texto1 = " // Construyendo tus ideas,";
const texto2 = " // web y software para";
const texto3 =  " // elevar tu negocio…";
const texto4 = " // :)";

async function escribirEslogans() {

    if(localStorage.locale == "en"){
        await esloganTecleada(text1, FirstH2, Cursor1);
        Cursor1.style.visibility = "hidden";
        await esloganTecleada(text2, SecondH2, Cursor2);
        Cursor2.style.visibility = "hidden";
        await esloganTecleada(text3, ThirdH2, Cursor3);
        Cursor3.style.visibility = "hidden";
        await esloganTecleada(text4, fourthH2, Cursor4);
    }
    else if (localStorage.locale == "es"){
        await esloganTecleada(texto1, FirstH2, Cursor1);
        Cursor1.style.visibility = "hidden";
        await esloganTecleada(texto2, SecondH2, Cursor2);
        Cursor2.style.visibility = "hidden";
        await esloganTecleada(texto3, ThirdH2, Cursor3);
        Cursor3.style.visibility = "hidden";
        await esloganTecleada(texto4, fourthH2, Cursor4);
    }
    else{
        await esloganTecleada(text1, FirstH2, Cursor1);
        Cursor1.style.visibility = "hidden";
        await esloganTecleada(text2, SecondH2, Cursor2);
        Cursor2.style.visibility = "hidden";
        await esloganTecleada(text3, ThirdH2, Cursor3);
        Cursor3.style.visibility = "hidden";
        await esloganTecleada(text4, fourthH2, Cursor4);
    }

    
}

escribirEslogans();


function WichAnimation() {
    var width = window.innerWidth;

    if (width > 1024) {
        var template = document.getElementById("AnimacionEscritorio");
        var animacionAnimada = document.importNode(template.content, true);
        var ArticuloIndex = document.getElementById("article-list").children[0];
        
        if(ArticuloIndex.children.length == 3){
           ArticuloIndex.insertBefore(animacionAnimada, ArticuloIndex.children[2]);
           console.log("Escritorio1");
        }
    }
    else{
        var template = document.getElementById("animacionMovil");
        var animacionDetenida = document.importNode(template.content, true);
        var ArticuloIndex = document.getElementById("article-list").children[0];

        if(ArticuloIndex.children.length == 3){
            ArticuloIndex.insertBefore(animacionDetenida, ArticuloIndex.children[2]);
            console.log("Movil1");
         }
    }
}

WichAnimation();

window.onresize = WichAnimation;
