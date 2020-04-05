const needLogin=require("../config/authenticate").forwardAuthenticated
const  isLogedin= require("../config/authenticate").ensureAuthenticated
module.exports=(app, passport)=>{

    app.get('/profile', isLogedin, (req, res)=>{
        res.render('profile.ejs', {user: req.user.name })
    } )
    app.get('/',(req, res)=>{
        res.render('index.ejs')
    })
    //form đăng nhập
    app.get('/login', needLogin, (req, res)=>{
        res.render('login.ejs', {
            message:req.flash('message')        
        })
    })
    // xác thực đăng nhập: xịt thì login lại, ok thì cho redirect sang home('/')
    app.post('/login', 
        passport.authenticate('local-login',{
            successRedirect:'/profile',
            failureRedirect: '/login',
            failureFlash: true
        }
    ))
    app.get('/signup', needLogin,  (req, res)=>{
        res.render('signup.ejs',{
            message: req.flash('message'),
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email
        })
    })
    app.post('/signup',
        passport.authenticate('local-signup',{
            successRedirect:'/profile',
            failureRedirect:'/signup',
            failureFlash:true
        }
    ))

    app.get('/logout', (req, res)=>{
        req.logout()
        res.redirect('/')
    })
    
}