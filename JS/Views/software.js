const sectionCategories = document.getElementById("sectionCategories");
const searchSoftware = document.getElementById("searchSoftware");
const moduleLatestReleases = document.getElementById("moduleLatestReleases");
const moduleSoftware = document.getElementById("moduleSoftware");
const moduleListsoftware = document.getElementById("moduleListsoftware");

let LatestReleaseProject = "Ranchito";

countCategories();
ViewLatestReleases();

// =============================
// JSON / Data
// =============================

async function fetchData() {
    try {
        const response = await fetch("../../../data.json", {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data.software || !Array.isArray(data.software)) {
            console.error('Expected data.software to be an array but got:', data);
            return;
        }
        else{
            return data;
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        //Mostrar pagina de error
    }
}

// =============================
// Categories Count and events
// =============================

async function countCategories() {
    const dataArray = await fetchData();
    
    let total = dataArray.software.length;

    let All = total;
    let released = 0;
    let notReleased = 0;
    let free = 0;
    let pay = 0;
    let windows = 0;
    let android = 0;
    let web = 0;

    dataArray.software.forEach((soft) => {
        var categories = soft.categories;
        
        if(categories.state === "Released"){
            released++;
        }
        if(categories.state === "Not Released"){
            notReleased++;
        }
        if(categories.price === "Free"){
            free++;
        }
        if(categories.price === "Pay"){
            pay++;
        }
        if(categories.platform === "Android"){
            android++;
        }
        if(categories.platform === "Web"){
            web++;
        }
        if(categories.platform === "Windows"){
            windows++;
        }
    });

    let categorieAll = document.getElementById("categorieAll");
    categorieAll.children[1].innerText = "[" + All + "]"

    let categorieaReleased = document.getElementById("categorieaReleased");
    categorieaReleased.children[1].innerText = "[" + released + "]"
    
    let categorieNotReleased = document.getElementById("categorieNotReleased");
    categorieNotReleased.children[1].innerText = "[" + notReleased + "]"

    let categorieFree = document.getElementById("categorieFree");
    categorieFree.children[1].innerText = "[" + free + "]"

    let categoriePay = document.getElementById("categoriePay");
    categoriePay.children[1].innerText = "[" + pay + "]"

    let categorieWindows = document.getElementById("categorieWindows");
    categorieWindows.children[1].innerText = "[" + windows + "]"

    let categorieAndroid = document.getElementById("categorieAndroid");
    categorieAndroid.children[1].innerText = "[" + android + "]"

    let categorieWeb = document.getElementById("categorieWeb");
    categorieWeb.children[1].innerText = "[" + web + "]"
}

const categories = document.querySelectorAll('.categorieNumbers');

categories.forEach(category => {
    category.addEventListener('click', () => {
        const categorieType = category.dataset.categorie;

        CategorieSoftware(categorieType);
        
        /*
        switch(categorieType) {
            case 'All':
                console.log('Has clicado en All');
                // Acción para 'All'
                break;
            case 'Released':
                console.log('Has clicado en Released');
                // Acción para 'Released'
                break;
            case 'Not Released':
                console.log('Has clicado en Not Released');
                // Acción para 'Not Released'
                break;
            case 'Free':
                console.log('Has clicado en Free');
                // Acción para 'Free'
                break;
            case 'Pay':
                console.log('Has clicado en Pay');
                // Acción para 'Pay'
                break;
            case 'Windows':
                console.log('Has clicado en Windows');
                // Acción para 'Windows'
                break;
            case 'Android':
                console.log('Has clicado en Android');
                // Acción para 'Android'
                break;
            case 'Web':
                console.log('Has clicado en Web');
                // Acción para 'Web'
                break;
            default:
                console.log('Categoría desconocida');
                // Acción para categorías desconocidas
        }

        */
    });
});

// =============================
// LatestReleases
// =============================

function ViewLatestReleases(){
    moduleListsoftware.style.display = "none";
    moduleSoftware.style.display = "none";
    moduleLatestReleases.style.display = "flex";

    FirstLatestRelease(LatestReleaseProject);
}

async function FirstLatestRelease(software) {

    const dataArray = await fetchData();

    const softwareArray = await dataArray.software;
    let first = await softwareArray.find((project) => project.name === software);

    const LatestRelease01 = document.getElementById("LatestRelease01");

    if(first.images.banner){
        LatestRelease01.children[0].srcset = first.images.banner;
        LatestRelease01.children[0].dataset.software = software;
    }
    else{
        // Mostrar imagen de no disponible o algo asi
    }

    LatestRelease01.children[1].children[0].innerText = first.name;
    LatestRelease01.children[1].children[0].dataset.software = software;

    LatestRelease01.children[0].addEventListener("click", function(){
        var dato = this.dataset.software;   
        ViewSoftware(dato);
    });
    LatestRelease01.children[1].children[0].addEventListener("click", function(){
        var dato = this.dataset.software;   
        ViewSoftware(dato);
    });

    if (localStorage.locale === "en") {
        LatestRelease01.children[1].children[1].innerText = first.descriptionShort_en;
    } 
    else if (localStorage.locale === "es") {
        LatestRelease01.children[1].children[1].innerText = first.descriptionShort_es;
    } 
    else {
        LatestRelease01.children[1].children[1].innerText = first.descriptionShort_en;
    }


    let PlayStoreLink = first.version.latest_version.playstore;
    let PlayStoreButton = LatestRelease01.children[1].children[2].children[0];
    let ApkLink = first.version.latest_version.apk;
    let ApkButton = LatestRelease01.children[1].children[2].children[1];

    if(PlayStoreLink){
        PlayStoreButton.href = PlayStoreLink;
    }
    else{
        PlayStoreButton.style.display = "none";
    }
    
    if(ApkLink){
        ApkButton.href = ApkLink;
    }
    else{
        ApkButton.style.display = "none";
    }
    
}

// =============================
// Software details
// =============================

let h2Software = document.getElementById("h2Software");

async function ViewSoftware(software){
    if(software === ""){
        // Mostrar modulo de no encontrado
    }

    searchSoftware.style.display= "none";
    sectionCategories.style.display = "none";
    moduleLatestReleases.style.display = "none";
    moduleListsoftware.style.display = "none";
    moduleSoftware.style.display = "grid";


    const dataArray = await fetchData();

    const softwareArray = await dataArray.software;
    let project = await softwareArray.find((project) => project.name === software);

    h2Software.innerText = "// " + project.name;

    bannerSoftware.srcset = project.images.banner;

    dataSoftware.children[0].children[1].innerText = project.release_date;
    dataSoftware.children[1].children[1].innerText = project.platform;
    dataSoftware.children[2].children[1].innerText = project.architecture;



    let downloadSoftware = document.getElementById("downloadSoftware");

    let PlayStoreLink = project.version.latest_version.playstore;
    let PlayStoreButton = downloadSoftware.children[2].children[0];
    let ApkLink = project.version.latest_version.apk;
    let ApkButton = downloadSoftware.children[2].children[1];

    if(PlayStoreLink){
        PlayStoreButton.href = PlayStoreLink;
    }
    else{
        PlayStoreButton.style.display = "none";
    }
    
    if(ApkLink){
        ApkButton.href = ApkLink;
    }
    else{
        ApkButton.style.display = "none";
    }



    if (localStorage.locale === "en") {
        descriptionSoftware.innerText = project.descriptionLong_en;
    } 
    else if (localStorage.locale === "es") {
        descriptionSoftware.innerText = project.descriptionLong_es;
    } 
    else {
        descriptionSoftware.innerText = project.descriptionLong_en;
    }


    let changelogSoftware = document.getElementById("changelogSoftware");
    let changeLogVersionTemplate = document.getElementById("changeLogVersion");

    project.changelog.forEach((change) => {
        const clon = changeLogVersionTemplate.content.cloneNode(true);
        clon.children[0].innerText = "Version " + change.version;
        if (localStorage.locale === "en") {
            clon.children[1].innerText = change.info_en;
        } else if (localStorage.locale === "es") {
            clon.children[1].innerText = change.info_es;
        } else {
            clon.children[1].innerText = change.info_en;
        }
        changelogSoftware.appendChild(clon);
    });
    


}

// =============================
// Search Software
// =============================

searchSoftware.addEventListener("keyup", function(){
    const search = this.value;
    if(search.trim() || search == ""){
        SearchSoftware(search);
    }
});

async function SearchSoftware(searchValue){

    moduleLatestReleases.style.display = "none";
    moduleSoftware.style.display = "none";
    moduleListsoftware.style.display = "flex";
    let datasSoftware = await fetchData();
    let listaSoftware;

    if(searchValue === ""){
        listaSoftware = datasSoftware.software;
        moduleListsoftware.children[0].innerText = "All";
    }
    else{
        listaSoftware = datasSoftware.software.filter(software =>
            software.name.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
    
        moduleListsoftware.children[0].innerText = "Search " + searchValue;
    }

    ListGenerator(listaSoftware);
}

// =============================
// Looking from Categories
// =============================

const SoftwareListTemplate = document.getElementById("SoftwareListTemplate");

async function CategorieSoftware(categorie){
    if(categorie === ""){
        // Mostrar modulo de error
    }

    moduleLatestReleases.style.display = "none";
    moduleSoftware.style.display = "none";
    moduleListsoftware.style.display = "flex";
    let datasSoftware = await fetchData();

    let listaSoftware;

    if(categorie === "All"){
        listaSoftware = datasSoftware.software;
    }
    else if(categorie === "Released" || categorie === "Not Released"){
        listaSoftware = datasSoftware.software.filter(item => item.categories.state === categorie);
    }
    else if(categorie === "Free" || categorie === "Pay"){
        listaSoftware = datasSoftware.software.filter(item => item.categories.price === categorie);
    }
    else if(categorie === "Windows" || categorie === "Android" || categorie === "Web"){
        listaSoftware = datasSoftware.software.filter(item => item.categories.platform === categorie);
    }
    else{
        // Error, mostrar lista vacia o algun modulo de no encontrado o error, or something
    }

    moduleListsoftware.children[0].innerText = categorie;

    ListGenerator(listaSoftware);
}

// =============================
// List generation
// =============================

function ListGenerator(listaSoftware){

    while (moduleListsoftware.childNodes.length > 2) {
        moduleListsoftware.removeChild(moduleListsoftware.lastChild);
    }

    listaSoftware.forEach((software) => {
        const clon = SoftwareListTemplate.content.cloneNode(true);

        clon.children[0].dataset.software = software.name;

        clon.children[0].children[0].srcset = software.images.banner;

        var dataMini = clon.children[0].children[1];

        dataMini.children[0].innerText = software.name;
        if (localStorage.locale === "en") {
            dataMini.children[1].innerText = software.descriptionShort_en;
        } else if (localStorage.locale === "es") {
            dataMini.children[1].innerText = software.descriptionShort_es;
        } else {
            dataMini.children[1].innerText = software.descriptionShort_en;
        }

        if(localStorage.locale === "es"){

            if(software.categories.state == "Released")
            {
                dataMini.children[2].children[0].innerText = "[Publicado]";
            }
            if(software.categories.state == "Not Released")
            {
                dataMini.children[2].children[0].innerText = "[No disponible]";
            }

            if(software.categories.price == "Free")
            {
                dataMini.children[2].children[1].innerText = "[Gratis]";
            }
            if(software.categories.price == "Pay")
            {
                dataMini.children[2].children[1].innerText = "[Paga]";
            }
        }
        else{
            dataMini.children[2].children[0].innerText = "[" + software.categories.state + "]";
            dataMini.children[2].children[1].innerText = "[" + software.categories.price + "]";
        }

        var acortadorxd = software.categories.platform;
            if(acortadorxd == "Windows" || acortadorxd == "Android" || acortadorxd == "Web"){
                dataMini.children[2].children[2].innerText = "[" + acortadorxd + "]";
            }

        moduleListsoftware.appendChild(clon);
    });
    asignEventforSoftware();
}

function asignEventforSoftware(){
    const softwares = document.querySelectorAll('.softwareMini');
    softwares.forEach(soft => {
        soft.addEventListener('click', () => {
            const softwareName = soft.dataset.software;
    
            ViewSoftware(softwareName);
        });
    });
}

// =============================
// || Mobile
// =============================

const headCategories = document.getElementById("headCategories");

let categorieAll = document.getElementById("categorieAll");
let groupState = document.getElementById("groupState");
let categorieaReleased = document.getElementById("categorieaReleased");
let categorieNotReleased = document.getElementById("categorieNotReleased");
let groupPrice = document.getElementById("groupPrice");
let categorieFree = document.getElementById("categorieFree");
let categoriePay = document.getElementById("categoriePay");
let groupPlatform = document.getElementById("groupPlatform");
let categorieWindows = document.getElementById("categorieWindows");
let categorieAndroid = document.getElementById("categorieAndroid");
let categorieWeb = document.getElementById("categorieWeb");

let isHidden = false;

headCategories.addEventListener("click", () => {
    categoriaMovil();
});

function categoriaMovil(){
    if(isHidden === false) {
        categorieAll.style.display = "none";
        groupState.style.display = "none";
        categorieaReleased.style.display = "none";
        categorieNotReleased.style.display = "none";
        groupPrice.style.display = "none";
        categorieFree.style.display = "none";
        categoriePay.style.display = "none";
        groupPlatform.style.display = "none";
        categorieWindows.style.display = "none";
        categorieAndroid.style.display = "none";
        categorieWeb.style.display = "none";

        sectionCategories.style.borderRight = "none";
        isHidden = true;

    }
    else{
        categorieAll.style.display = "flex";
        groupState.style.display = "block";
        categorieaReleased.style.display = "flex";
        categorieNotReleased.style.display = "flex";
        groupPrice.style.display = "block";
        categorieFree.style.display = "flex";
        categoriePay.style.display = "flex";
        groupPlatform.style.display = "block";
        categorieWindows.style.display = "flex";
        categorieAndroid.style.display = "flex";
        categorieWeb.style.display = "flex"; 

        sectionCategories.style.borderRight = "5px solid #6AA84F";
        isHidden = false;
    }
}

let widthDispositivo = window.innerWidth;

if(widthDispositivo == "980"){
    categoriaMovil();
}