const express = require('express');
const mongoose = require('mongoose');
const app     = express();

// Connect application to your mongodb database with mongoose and your database name
mongoose.connect('mongodb://localhost/lscodeschool', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Setup all middlewares for the app to set and use
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// This is our data model and schema
const Schema = mongoose.Schema;
// This is our model
const ProfileSchema = new Schema({
  image: String,
  name: String,
  date: Date
});
const Profile = mongoose.model('Profile', ProfileSchema);

// This is our root route
app.get('/', (req, res)=>{
    Profile.find({}, (err, profile)=>{
        if(err){
            return console.log(err)
        }
        res.render('home', {
            profile
        });
    });
});

// This is our post route
app.post('/upload', (req, res)=>{
    const data = {
         image: req.body.image,
         name: req.body.name
        }
    Profile.create(data);
    res.redirect('/'); 
});


// We instruct our server to listen on port 3500
const port = 3500 || process.env.PORT;
app.listen(port, ()=>{
    console.log(`Server started on port ${3500} ..`);
});