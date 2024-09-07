var express = require("express");
var cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());

app.get("/", function (req, res) {
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);
  console.log(typeof req.cookies);
  console.log(req.cookies.Cho);
  console.log(req.cookies.Greet);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
});

app.listen(8080);

// curl command that sends an HTTP request with two cookies
// curl http://127.0.0.1:8080 --cookie "Cho=Kim;Greet=Hello"
