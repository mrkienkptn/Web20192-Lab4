var cr=require("bcrypt")
 let salt=10
 let myplaint="kiendeptrai"
 let other="kiendeptrai"
 const hash=cr.hashSync(myplaint, salt)
 console.log(hash)
 const compare=cr.compareSync(other, hash)
 console.log(compare)