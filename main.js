function bindArticle(element, item, index) {
    if (element == null) {
        let article = document.createElement("article");
        let header = document.createElement("h2");
        let paragraph = document.createElement("p");
        article.append(header);
        article.append(paragraph);
        element = article;
    }

    element.children[0].innerText = item.title;
    element.children[1].innerText = item.description;

    return element;
}

async function getArticles() {
    let url = import.meta.url;
    url = url.substring(0, url.lastIndexOf("/"));
    url += "/articles.json";
    let response = await fetch(url);
    let articles = await response.json();
    return articles;
}

async function updateArticleList() {
    let articleList = document.getElementById("article-list");
    if (articleList) {
        let articles = await getArticles();
        for (let i in articles) {
            let article = articles[i];
            if (i < articleList.childElementCount) {
                let element = articleList.children[i];
                bindArticle(element, article, i);
            }
            else {
                let element = bindArticle(null, article, i);
                articleList.append(element);
            }
        }
        while (articleList.childElementCount > articles.length)
            articleList.lastElementChild.remove();
    }
}

updateArticleList();