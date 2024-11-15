console.log("version final");
var fs = require("fs");
var express = require("express");

var app = express();
var hbs = require("express-handlebars").create({ defaultLayout: "main" });
var session = require("express-session");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ secret: 'SuperSecretPassword' }));

app.use(express.static("./public"));
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("port", 8080);

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/home", function (req, res) {
    res.render("home");
});

app.post("/home", function (req, res) {
    var context = {}
    if (req.body["download"]) {
        var jsonToFile = "";
        for (prop in req.body) {
            if (prop !== "download") { jsonToFile += prop + ": $" + req.body[prop] + "\n"; }
        }
        fs.writeFile("./test.txt", jsonToFile, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.setHeader('Content-disposition', 'attachment; filename=text.txt');
                res.download("./test.txt", "item list.txt", function (err) {
                    if (err) { console.log(err); }
                })
            }
        });
    }
    if (req.body["New List"]) {
        if (!req.body.name) {
            res.render("login");
            return;
        }
        context.name = req.body.name;
        context.id = req.body.ID;
        res.render("home", context);
    }
});

app.get("/pccase", function (req, res) {
    res.render("pccase");
});

app.get("/smartphone", function (req, res) {
    res.render("smartphone");
});

app.get("/desk", function (req, res) {
    res.render("desk");
});

app.post("/tradeReq", function (req, res) {
    var context = {};
    var from = req.body.from
    if (!req.body.purchase && !req.body.trade) {
        res.render(from);
    } else {
        context.purchase=req.body.purchase;
        context.trade=req.body.trade;
        res.render("tradeReq", context);
    };

});

app.post("/report", function (req, res) {
    var context = {}
    context.name = req.body.name;
    res.render("report", context)
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:8080:' + app.get('port') + '; press Ctrl-C to terminate.');
});