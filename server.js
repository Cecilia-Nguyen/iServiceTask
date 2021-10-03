const express = require('express');
const path = require('path');
const https = require("https")
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors")
const User = require('./model/User');
const Task = require('./model/Task');

// passport 
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

//cookies Sessions
const cookieSession = require("cookie-session");
//Stripe 
const Stripe = require('stripe');
const stripe = Stripe(keys.stripe.apiSecret);
//Mongoose
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const url = 'mongodb+srv://admin-Cecilia:Cr020199@cluster0.nazzt.mongodb.net/iService?retryWrites=true&w=majority';
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((p) => {
		console.log(p);
	});
  




// app.use((req, res, next) => {
// 	res.redirect('/auth/login');
// });

/*  Google AUTH  */
passport.use(
  new GoogleStrategy({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: 'https://blooming-anchorage-84894.herokuapp.com/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
      // passport callback function
      //check if user already exists in our db with the given profile ID
      User.findOne({email:profile.emails[0].value}).then((currentUser)=>{
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
             //if not, create a new user 
            new User({
              firstName: profile.name.givenName,
              lastName:profile.name.familyName,
              email:profile.emails[0].value
            }).save().then((newUser) =>{
              done(null, newUser);
            });
         } 
      })
    })
);

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));
app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("auth/google/redirect",passport.authenticate("google"),(req,res)=>{
  res.send(req.user);
  res.send("you reached the redirect URI");
});
// app.get("/auth/google/redirect",passport.authenticate('google'));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    // res.render('home', { name: req.user.firstName });
    res.render('payment',{
      spk:keys.stripe.apiKey, name:req.user.firstName,
  });
  });
app.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});




//Stripe Implementation
//charge route
app.post('/charge',(req,res)=>{
  const amount=250;
  stripe.customers.create({
      email:req.body.stripeEmail,
      source:req.body.stripeToken
  })
  .then(customer=>stripe.charges.create({
      amount,
      description:'iService Payment',
      currency:'Aud',
      customer:customer.id
  })).then(charge=>res.render('success'));

});

const regRouter = require('./routes/Route');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/taskRoute');
app.set('view engine', 'ejs');
app.get('/',function(req, res){
	res.redirect('/auth/login');
});

app.use('/experts', regRouter);
app.use('/auth', authRouter);
app.use('/', taskRouter);


let port=process.env.PORT;
if(port==null||port==""){
	port=8000;
}
app.listen(port, (req,res) => {
	console.log('Server is running');
});
