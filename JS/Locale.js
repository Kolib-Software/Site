if (!localStorage.locale)
    localStorage.locale = navigator.language.split("-")[0];

async function setLocale(locale = null) {
    locale ??= localStorage.locale;
    localStorage.locale = locale;

    let source;
    let currentPath = location.pathname;
    if(currentPath === "/"){
        source = `/Locales/index.${locale}.json`;
    }
    else{
        source = `/Locales${location.pathname.split(".")[0]}.${locale}.json`;
    }

    
    let response = await fetch(source);
    let json = await response.json();

    let elements = document.querySelectorAll("[data-locale]");
    for (let element of elements) {
        let options = element.dataset.locale;
        if (options) {
            options = element.dataset.locale
                .split(";")
                .map(x => x.split("="))
                .reduce((obj, entry) => {
                    obj[entry[0]] = entry[1];
                    return obj;
                }, {});
            if (options.text && json[options.text])
                element.innerText = json[options.text];
            if (options.html && json[options.html])
                element.innerHTML = json[options.html];
            if (options.value && json[options.value])
                element.value = json[options.value];
            if (options.placeholder && json[options.placeholder])
                element.placeholder = json[options.placeholder];
            if (options.title && json[options.title])
                element.title = json[options.title];
        }
    }
}

setLocale();

export {
    setLocale
}