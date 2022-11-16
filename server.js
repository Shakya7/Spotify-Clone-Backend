const app=require("./app");

app.listen(process.env.PORT || 5000,()=>{
    //connectToDB();
    console.log("Listening to requests");
})