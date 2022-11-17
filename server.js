const app=require("./app");
const mongoose=require("mongoose");

function connectToDB(){
    try{
    mongoose.connect(process.env.DB_CONNECTION.replace("<password>",process.env.DB_PASSWORD).replace("myFirstDatabase",process.env.DB_NAME),
    {
        useNewUrlParser: true
    });
    console.log("Connected to database successfully");
    console.log("Listening to requests on port 5000")
    }catch(err){
        console.error("Unable to connect to database");
        console.log(err);
    }
}



app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is UP and RUNNING!!!");
    connectToDB();
})