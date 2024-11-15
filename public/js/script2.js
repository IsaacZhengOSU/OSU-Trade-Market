function outWeb() {
    console.log("reach outWeb");
    var itemName = document.getElementsByTagName("h1")[1].textContent;
    if (itemName) {
        console.log(itemName);
    } else {
        console.log("no h1");
    }
    res.render("http://wwww.google.com/search?q=" + itemName);
}

var outSource = document.getElementById("searchOut");
if (outSource) {
    outSource.addEventListener('click', outWeb);
}