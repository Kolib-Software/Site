const translations = {};

async function getTranslation(locale = null) {
    locale ??= localStorage.locale;
    let translation = translations[locale];
    if (translation) return translation;
    let path = location.pathname.replace(".html", "");
    let source = `/Locales${path == "/" ? "/Index" : path}.${locale}.json`;
    let response = await fetch(source);
    translation = await response.json();
    translation[locale] = translation;
    return translation
}

async function setLocale(locale = null) {
    locale ??= localStorage.locale;
    localStorage.locale = locale;

    let translation = await getTranslation(locale);

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
            if (options.text && translation[options.text])
                element.innerText = translation[options.text];
            if (options.html && translation[options.html])
                element.innerHTML = translation[options.html];
            if (options.value && translation[options.value])
                element.value = translation[options.value];
            if (options.placeholder && translation[options.placeholder])
                element.placeholder = translation[options.placeholder];
            if (options.title && translation[options.title])
                element.title = translation[options.title];
        }
    }
}

export {
    getTranslation,
    setLocale
}

if (!localStorage.locale)
    localStorage.locale = navigator.language.split("-")[0];

setLocale();
