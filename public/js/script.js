function generateDownloadForm() {
    var homeForm = document.getElementById("homeForm");
    while (homeForm.firstChild) {
        homeForm.removeChild(homeForm.firstChild);
    }
    var items = document.getElementsByClassName("items");
    for (var i = 0; i < items.length; i++) {
        var newInput = document.createElement("input");
        newInput.setAttribute("type", "hidden");
        newInput.setAttribute("name", items[i].getAttribute("name"));
        newInput.setAttribute("value", items[i].getAttribute("price"));
        homeForm.appendChild(newInput);
    }
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "submit");
    newInput.setAttribute("name", "download");
    newInput.setAttribute("value", "download");
    document.getElementById("homeForm").appendChild(newInput);
}

generateDownloadForm()

var originList = document.getElementsByClassName("items")
var oriCopy = [];
for (var i = 0; i < originList.length; i++) {
    oriCopy[i] = originList[i].cloneNode(true);
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

function restoreAllItems() {
    while (originList.firstChild) {
        originList.removeChild(originList.firstChild);
    }
    for (var i = 0; i < oriCopy.length; i++) {
        originList[i] = oriCopy[i].cloneNode(true);
    }
    generateDownloadForm()
}

function displaysorted(sortedList) {
    var list = document.getElementById("display");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    for (var i = 0; i < sortedList.length; i++) {
        var newDiv = document.createElement("div");
        newDiv = sortedList[i].cloneNode(true);
        list.appendChild(newDiv);
    }
    generateDownloadForm()
}

function nameFilter(searchName) {
    searchName = searchName.toLowerCase();
    var nameFilterList = [];
    var nameList = document.getElementsByClassName("items");
    for (var i = 0; i < nameList.length; i++) {
        var name = nameList[i].getAttribute("name").toLowerCase();
        if (name.includes(searchName)) {
            nameFilterList.push(nameList[i])
        }
    }
    document.getElementById("searchName").value = "";
    return nameFilterList;
}

function priceFilter(min, max) {
    var priceFilterList = [];
    var priceList = document.getElementsByClassName("items");

    for (var i = 0; i < priceList.length; i++) {
        var price = Number(priceList[i].getAttribute("price"));
        if (min) {
            if (price >= min) {
                if (max) {
                    if (price <= max) { priceFilterList.push(priceList[i]); }
                } else {
                    priceFilterList.push(priceList[i]);
                }
            }
        } else {
            if (price <= max) { priceFilterList.push(priceList[i]); }
        }
    }
    document.getElementById("searchMin").value = "";
    document.getElementById("searchMax").value = "";
    return priceFilterList;
}

function filterToFilters(list1, list2) {
    var filterToFiltersList = [];
    for (var i = 0; i < list1.length; i++) {
        for (var j = 0; j < list2.length; j++) {
            if (list1[i].getAttribute("name") === list2[j].getAttribute("name")) {
                filterToFiltersList.push(list1[i]);
            }
        }
    }
    return filterToFiltersList;
}

function checkMinBox(min) {
    if (!isNaN(min)) {
        return 1;
    } else {
        alert("please enter a number to min box");
        return 0; //is not a number
    }
}

function checkMaxBox(max) {
    if (!isNaN(max)) {
        return 1;
    } else {
        alert("please enter a number to max box");
        return 0; //is not a number
    }
}

function filter() {
    var outputList = [];
    var min = document.getElementById("searchMin").value;
    if (!checkMinBox(min)) { return; }
    var max = document.getElementById("searchMax").value;
    if (!checkMaxBox(max)) { return; }
    var name = document.getElementById("searchName").value;
    if ((!min && !max) && name) {
        restoreAllItems()
        outputList = nameFilter(name);
        displaysorted(outputList);
    } else {
        if ((min || max) && !name) {
            restoreAllItems()
            outputList = priceFilter(min, max);
            displaysorted(outputList);
        } else {
            if ((min || max) && name) {
                restoreAllItems()
                outputList = filterToFilters(priceFilter(min, max), nameFilter(name));
                displaysorted(outputList);
            } else {
                if ((!min && !max) && !name) {
                    displaysorted(oriCopy);
                }
            }
        }
    }
}

var searching = document.getElementById('searchButton');
if (searching) {
    searching.addEventListener('click', filter);
}