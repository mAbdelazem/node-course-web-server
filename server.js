const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
var app=express();

hbs.registerPartials(__dirname +'/views/partials');
 app.set('view engine','hbs');
 app.use((req, res , next)=>{
   var now = new Date().toString();
   var log =`${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log +'\n',(err)=>{
     if(err) {
       console.log('unable to append file server log');
     }
   });
   next();
 });
 // app.use((req, res,next)=>{
 //   res.render('maintenance.hbs',{
 //     welcomeMesage:'This web page is under maintenance',
 //     pageTitle:'EveryThing is under Control'
 //   });
 // });
 app.use(express.static(__dirname + '/puplic'));
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req, res)=>{
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    welcomeMessage:'Welcome to My website',
    pageTitle: 'Home Page 007'
  });
});
app.get('/about',(req, res)=>{
res.render('about.hbs',{
  pageTitle: 'About Page'
});
});
app.get('/bad',(req,res)=>{
  res.send({
    errormessage:'unable to connect'
  });
});

app.listen(3000,()=>{
  console.log('server is up to port 3000');
});
