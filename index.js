const express = require('express')
const app = new express()
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');
const customMiddleWare = (req,res,next)=>{
    //console.log('aaron guapo')
    next()
    }
const validateMiddleware = require("./middleware/validationMiddleware");
const newUserController = require('./controllers/newUser')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const iniciocontroller= require('./controllers/inicio')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const IfAuthenticatedMiddleware = require('./middleware/IfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

const flash = require('connect-flash');


global.loggedIn = null;

mongoose.connect('mongodb://localhost/nosirve', {useNewUrlParser: true});

const bodyParser = require('body-parser')
const ejs = require('ejs')



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(fileUpload());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(customMiddleWare)
app.use('/posts/store',validateMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
    }))
app.use("*", (req, res, next) => {
        loggedIn = req.session.userId;
        next()
        });
        
app.use(flash());

app.listen(4000, ()=>{
console.log('App listening on port 4000')
//console.log(ROLE)
})



app.get('/',iniciocontroller)



app.get('/home',homeController)


app.get('/post/:id',getPostController)

        
app.get('/posts/new',authMiddleware, newPostController)

app.post('/posts/store', authMiddleware, storePostController)

//IfAuthenticatedMiddleware
//authRole(ROLE.ADMIN),
app.get('/auth/register', newUserController)

app.post('/users/register', IfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', IfAuthenticatedMiddleware, loginController)
app.post('/users/login',IfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
