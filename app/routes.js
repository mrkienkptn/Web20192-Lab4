module.exports=(app, passport)=>{
    const checkLoggedIn=(req, res, next)=>{
        // if (req.isAuthenticated())
        // return next()
        // res.redirect('/')
    }
    app.get('/',(req, res)=>{
        res.render('index.ejs')
    })
    //form đăng nhập
    app.get('/login',(req, res)=>{
        res.render('login.ejs', {message:req.flash('loginMessage')})
    })
    // xác thực đăng nhập: xịt thì login lại, ok thì cho redirect sang home('/')
    app.post('/login', 
        passport.authenticate('local',{
            successRedirect:'/',
            failureRedirect: '/login',
            failureFlash: true
        }
    ))
    app.get('/signup', (req, res)=>{
        res.render('signup.ejs',{message: req.flash('signupMessage')})
    })
    app.post('/signup',
        passport.authenticate('local',{
            successRedirect:'/profile',
            failureRedirect:'/signup',
            failureFlash:true
        }
    ))
    app.get('/profile', checkLoggedIn, (req, res)=>{
        res.render('profile.ejs',{
            user:req.user
        })
    })
    app.get('/logout', (req, res)=>{
        req.logout()
        res.redirect('/')
    })
    
}