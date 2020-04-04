var MongoClient = require("mongodb").MongoClient
var url="mongodb+srv://ngaiKien:ngaikien@crowd-jxkkr.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, (err, db)=>{
    if (err) console.log(err)
    else{
        console.log("Connect successfully to ", url)
        var database=db.db('divuvila')
        database.createCollection("works",(err, res)=>{
            if (err) throw err
            console.log("OK")
            db.close()
        })

    }
    
})
