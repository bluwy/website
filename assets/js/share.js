const pageUrl = encodeURIComponent(document.URL)
const pageTitle = encodeURIComponent(document.querySelector("script[data-title]").getAttribute("data-title"))

console.log(pageUrl)
document.querySelector("a.share-facebook").setAttribute("href", "https://www.facebook.com/sharer.php?u=" + pageUrl)
document.querySelector("a.share-twitter").setAttribute("href", "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + pageTitle)
document.querySelector("a.share-reddit").setAttribute("href", "https://www.reddit.com/submit?url=" + pageUrl + "&title=" + pageTitle)