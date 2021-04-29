const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
res.sendFile(`${__dirname}/signup.html`)
});

app.post('/', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };
    
    const jsondata = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/538391afae"
    
    const options = {
        method: "POST",
        auth: "rishabh1:df27d0a6cef2042f2bce91d02cb3c736-us17"
    };

    const reques = https.request(url, options, function(response){
        
        if (response.statusCode === 200){
            res.sendFile(`${__dirname}/success.html`);
        } else {
            res.sendFile(`${__dirname}/failure.html`);
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    reques.write(jsondata);
    reques.end();

});


app.post('/failure', function(req, res){
res.redirect('/');
});


app.listen(3000, function(){
    console.log("Server is running at port 3000");
});









//apikey
//f27d0a6cef2042f2bce91d02cb3c736-us17
//df27d0a6cef2042f2bce91d02cb3c736-us17

//listid
// 538391afae