
const LocalStragety = require("passport-local").Strategy
const bcrypt        = require("bcrypt")
const User          = require("../app/models/user")

module.exports=(passport)=>{
    //!step (3) => write cookie user.id to browser
    passport.serializeUser((user, done)=>{
        done(null, user.id) //* set user.id to session.passport.user
    })

    //!when user autheticated passport call this function
    //!user have cookie and browser send it too
    //!this function take this cookie 
    //!step (4)
    passport.deserializeUser((id, done)=>{
        User.findById(id) //* check session user id
        .then(user=>{
            done(null, user)
        })
        .catch(err=>console.log(err))
    })
    //!define local stragety
    //!step (2)
    passport.use('local-signup', new LocalStragety({passReqToCallback :true},
        (req, username, password, done)=>{        
            process.nextTick(()=>{ //!like async await
                User.findOne({'username':username},(err, user)=>{
                    if (err) 
                        return done(err)
                    if (user) 
                        return done(null, false, req.flash('message',"This username has already exist"))
                    else {
                        if (password.length<6) 
                            return done(null, false, req.flash('message', "Password is at least 6 characters"))
                        if (req.body.confirmpassword !== password) 
                            return done(null, false, req.flash('message', "Confirm password is not match"))

                        let newUser = new User()

                        newUser.name     = req.body.fullname
                        newUser.username = username
                        newUser.password = newUser.genHashPassword(password)
                        newUser.Type     = req.body.type
                        newUser.save(err => {
                            if (err) console.log("err")
                            else{
                                console.log("New user is saved in database")
                                return done(null, newUser)
                            }
                        })
                    }
                    
                })
            })
        }
    ))
    //!step (2)
    passport.use('local-login', new LocalStragety({passReqToCallback: true},
        (req, username, password, done)=>{
            process.nextTick(()=>{
                User.findOne({'username': username},
                (err, user)=>{
                    if (err) 
                        return done(err) //!find username throw error
                    if (!user) 
                        return done(null, false, req.flash('message',"Username is not exist")) //!not found
                    else //!compare 2 password
                    if (bcrypt.compareSync(password, user.password))
                        return done(null, user) 
                    else  
                        return done(null, false, req.flash('message', "Incorrect password")) 
                    
                })
            })
        }
    ))
}