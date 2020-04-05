
const LocalStragety = require("passport-local").Strategy

const bcrypt=require("bcrypt")
const User = require("../app/models/user")

module.exports=(passport)=>{
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser((id, done)=>{
        User.findById(id)
        .then(user=>{
            done(null, user)
        })
        .catch(err=>console.log(err))
    })
    passport.use('local-signup', new LocalStragety({passReqToCallback :true},
        (req, username, password, done)=>{        
            
            process.nextTick(()=>{
                User.findOne({'username':username},(err, user)=>{
                    if (err) return done(err)
                    if (user) return done(null, false, req.flash('message',"This username has already exist"))
                    else {
                        if (password.length<6) return done(null, false, req.flash('message', "Password is at least 6 characters"))
                        if (req.body.confirmpassword !== password) return done(null, false, req.flash('message', "Confirm password is not match"))
                        let newUser= new User()
                        newUser.name=req.body.fullname
                        newUser.username=username
                        newUser.password=newUser.genHashPassword(password)
                        newUser.save(err=>{
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
    passport.use('local-login', new LocalStragety({passReqToCallback: true},
        (req, username, password, done)=>{
            process.nextTick(()=>{
                User.findOne({'username': username},(err, user)=>{
                    if (err) return done(err)
                    if (!user) return done(null, false, req.flash('message',"Username is not exist"))

                    else    if (bcrypt.compareSync(password, user.password))
                                return done(null, user)
                            else  return done(null, false, req.flash('message', "Incorrect password"))
                    
                })
            })
        }
    ))
}