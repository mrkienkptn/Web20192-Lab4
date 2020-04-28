User = require('../app/models/user')

module.exports=(req, res, next)=>{
    let username = req.params.username
    User.findOne({'username':username},(err, user)=>{
        if (err) return res.redirect('/login')
        else{
            let type = user.type
            res.locals.type = type
            next()
        }
    })
}