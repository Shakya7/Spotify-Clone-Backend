exports.testFunct=async (req,res)=>{
    try{
        console.log("Interacted with the FE");
        //console.log(req.body);
        res.status(200).json({
            status:"test is successful",
        })
    }catch(err){
        console.log(err.message);
    }
}