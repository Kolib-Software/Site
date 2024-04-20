function esloganTecleada(texto, elemento, cursor, velocidad = 275) {
    let i = 0;
    const intervalo = setInterval(function() {
        elemento.textContent += texto.charAt(i);
        i++;

        if (i === texto.length) {
            clearInterval(intervalo);
            if (elemento.id === 'FirstH2') {
                cursor.style.visibility = "hidden";
                document.getElementById('Cursor2').style.visibility = "visible";
            }
        }
    }, velocidad);

    const parpadearCursor = setInterval(function() {
        cursor.style.visibility = (cursor.style.visibility === 'hidden' ? '' : 'hidden');
    }, 500);
    
    if (elemento.id === 'FirstH2') {
        setTimeout(function() {
            clearInterval(parpadearCursor);
        }, velocidad * texto.length);
    }
}

const FirstH2 = document.getElementById('FirstH2');
const Cursor1 = document.getElementById('Cursor1');
const SecondH2 = document.getElementById('SecondH2');
const Cursor2 = document.getElementById('Cursor2');

Cursor2.style.visibility = "hidden";

const texto1 = " // Building your ideas,";
const texto2 = " // web and software to elevate your business...";

setTimeout(esloganTecleada, 600, texto1, FirstH2, Cursor1);
setTimeout(esloganTecleada, 7500, texto2, SecondH2, Cursor2);
