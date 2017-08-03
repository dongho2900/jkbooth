const express = require('express')
const app = express()
const path = require('path');
var logger = require('morgan');




const index = require('./routes/index')
const categoryselect = require('./routes/categoryselect')
const auth = require('./routes/auth')
const addcategory = require('./addcategory')

const passport = require('passport')
const session = require('express-session')
var MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const autoIncrement = require('mongoose-auto-increment')

var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function(){
    console.log('mongodb connect');
});

var connect = mongoose.connect('mongodb://127.0.0.1:27017/JKBOOTH', {useMongoClient : true});
autoIncrement.initialize(connect);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// //session 관련 셋팅
// var sessionMiddleWare = session({
//     secret: 'JKBOOTH',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 2000 * 60 * 60 //지속시간 2시간
//     }
// });
// app.use(sessionMiddleWare);

//passport 적용
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    app.locals.isLogin = req.isAuthenticated();
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    app.locals.userData = req.user
    app.locals.onName = req.body.displayName
    next();
});


app.use('/', index);
app.use('/categoryselect', categoryselect)
app.use('/auth', auth)
app.use('/addcategory', addcategory)
app.get('/login_warning', function(req, res){
    res.render('login_warning')
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



app.listen(80, function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Server was started....")
    }
})
const category0 = require('./routes/categories/category0')
app.use('/category0', category0);const category1 = require('./routes/categories/category1')
app.use('/category1', category1);
const category2 = require('./routes/categories/category2')
app.use('/category2', category2);const category3 = require('./routes/categories/category3')
app.use('/category3', category3);const category4 = require('./routes/categories/category4')
app.use('/category4', category4);const category5 = require('./routes/categories/category5')
app.use('/category5', category5);const category6 = require('./routes/categories/category6')
app.use('/category6', category6);const category7 = require('./routes/categories/category7')
app.use('/category7', category7);const category8 = require('./routes/categories/category8')
app.use('/category8', category8);const category9 = require('./routes/categories/category9')
app.use('/category9', category9);const category10 = require('./routes/categories/category10')
app.use('/category10', category10);const category11 = require('./routes/categories/category11')
app.use('/category11', category11);const category12 = require('./routes/categories/category12')
app.use('/category12', category12);const category13 = require('./routes/categories/category13')
app.use('/category13', category13);const category14 = require('./routes/categories/category14')
app.use('/category14', category14);const category15 = require('./routes/categories/category15')
app.use('/category15', category15);const category16 = require('./routes/categories/category16')
app.use('/category16', category16);const category17 = require('./routes/categories/category17')
app.use('/category17', category17);const category18 = require('./routes/categories/category18')
app.use('/category18', category18);const category19 = require('./routes/categories/category19')
app.use('/category19', category19);const category20 = require('./routes/categories/category20')
app.use('/category20', category20);const category21 = require('./routes/categories/category21')
app.use('/category21', category21);const category22 = require('./routes/categories/category22')
app.use('/category22', category22);const category23 = require('./routes/categories/category23')
app.use('/category23', category23);const category24 = require('./routes/categories/category24')
app.use('/category24', category24);const category25 = require('./routes/categories/category25')
app.use('/category25', category25);const category26 = require('./routes/categories/category26')
app.use('/category26', category26);const category27 = require('./routes/categories/category27')
app.use('/category27', category27);const category29 = require('./routes/categories/category29')
app.use('/category29', category29);