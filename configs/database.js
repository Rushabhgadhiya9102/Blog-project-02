const { default: mongoose } = require("mongoose")

const database = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("database is connected"))
    .catch((err)=>console.log(err.message))
}

module.exports=database