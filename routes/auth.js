const needLogin=require("../config/authenticate").forwardAuthenticated
const  isLogedin= require("../config/authenticate").ensureAuthenticated
const User = require("../app/models/user")
module.exports=(app, passport)=>{

    app.get('/',(req, res)=>{        
        res.render('index')   
    })

    app.get('/change_profile',(req, res)=>{        
        res.render('fill_info', {user: req.user })   
    })
    
    app.get('/profile', isLogedin,(req, res)=>{

        User.findOne({_id : req.session.passport.user}, (err, obj) =>{
            console.log("hello")
            if (err) 
                return done(err)
            if (obj) {
                if(obj.other.email !== ''){
                    res.render('profile', {user: req.user })
                    console.log('oke your infor is fill, you have email')
                }else{
                    res.render('fill_info')
                    console.log('fill infor before next')
                }
            }
            
        })
    } )
    app.post('/profile' ,(req, res) => {
        console.log(req.body.email)
        console.log('start update')
        User.findByIdAndUpdate({_id : req.session.passport.user},
            {
                other: {
                    email          : req.body.email,
                    skill          : req.body.skill,
                    education_level: req.body.edu_level,
                    expericene     : req.body.exp,
                    back_account   : req.body.bank_acc,
                    deal           : req.body.deal
                }

            },
            err => console.log(err)
        )
        console.log(req.user)
        res.redirect('/profile')
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