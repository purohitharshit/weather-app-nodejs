const express = require("express");
const path = require('path');
const hbs = require('hbs');  // to use partials,require hbs
const app = express();
const port = process.env.PORT || 8000; // enviornment variable
// when we host this project this needs a separate port number which is provided by process.env.PORT ...8000 is port number for localhost

// public static path

const static_path = path.join(__dirname,"../public");// __dirname gives you the path of "src"(which contains app.js) and with join - ".." gives you the path of expressWeb folder
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");


app.set('view engine', 'hbs'); /*Using hbs as the default view engine requires just one line of code in your app setup. This will render .hbs files when res.render is called.*/
app.set('views',template_path);  // replace by template path....tells express application that we are using partials
// earlier 'views' folder is now changed to -- tempalates > views (template_path)
hbs.registerPartials(partials_path);  // to use partials register it 

app.use(express.static(static_path));//This is a built-in middleware function in Express that serves static files from a specified directory

//with the help of 'app' wecan access all the methods and properties of express using 'get'
// **routing**
app.get("",(req,res) => {
    res.render('index');      // instead of this - res.send("Welcome to my page") now use res.render('page')
})

app.get("/about",(req,res) => {
    res.render('about'); // previously--  res.send("Welcome to about page") --- but now we are rendering a hbs file
})

app.get("/weather",(req,res) => {
    res.render('weather');
})

app.get("*",(req,res) => {   //if none of the above 'root' matches
    res.render("404error",{
        errorMsg:'oops! page not found'
    })
})

app.listen(port,(req,res) => {  //this ensures that the port is working
    console.log(`listening to the port no. ${port}`);
})