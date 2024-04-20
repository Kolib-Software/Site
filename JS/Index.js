function esloganTecleada(texto, elemento, cursor, velocidad = 275) {
    let i = 0;
    const intervalo = setInterval(function() {
        elemento.textContent += texto.charAt(i);
        i++;

        if (i === texto.length) {
            clearInterval(intervalo);
            if (elemento.id !== 'fourthH2') {
                cursor.style.visibility = "hidden";
                if (elemento.nextElementSibling) {
                    elemento.nextElementSibling.style.visibility = "visible";
                }
            }
        }
    }, velocidad);

    const parpadearCursor = setInterval(function() {
        cursor.style.visibility = (cursor.style.visibility === 'hidden' ? '' : 'hidden');
    }, 500);
    
    setTimeout(function() {
        if (elemento.id !== 'fourthH2') {
            clearInterval(parpadearCursor);
            cursor.style.visibility = "hidden";
        }
    }, velocidad * texto.length);
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

const texto1 = " // Building your ideas,";
const texto2 = " // web and software to";
const texto3 = " // elevate your business...";
const texto4 = " // :)";

setTimeout(esloganTecleada, 600, texto1, FirstH2, Cursor1);
setTimeout(esloganTecleada, 7500, texto2, SecondH2, Cursor2);
setTimeout(esloganTecleada, 14500, texto3, ThirdH2, Cursor3);
setTimeout(esloganTecleada, 22500, texto4, fourthH2, Cursor4);
