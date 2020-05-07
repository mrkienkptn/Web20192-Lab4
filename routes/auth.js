
const needLogin = require("../config/authenticate").forwardAuthenticated
// const isLogedin = require("../config/authenticate").ensureAuthenticated
// const User      = require("../app/models/user")

module.exports = (app, passport)=>{

    app.get('/',(req, res)=>{        
        res.render('index')   
    })
    
    app.get('/login', needLogin , (req, res)=>{
        res.render('login', { message:req.flash('message') })
    })
    
    app.post('/login', 
    passport.authenticate('local-login',{ //!first (1)
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash   : true
    }
    ))
    
    app.get('/signup', needLogin,  (req, res)=>{
        res.render('signup',{
            message : req.flash('message'),
            fullname: req.body.fullname,
            username: req.body.username,
            email   : req.body.email
        })
    })
    
    app.post('/signup',
    passport.authenticate('local-signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash   : true
    }
    ))

    app.get('/logout', (req, res)=>{
        req.logout()
        res.redirect('/')
    })
    app.get('/test_session' ,(req, res) =>{
        let sess = req.session;
        console.log(sess);
        
    })
    
    
}