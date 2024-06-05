const sanityMiddleware=(req,res,next)=>{
    try{
        console.log("in sanityMiddleware");
        let user=req.body;
        let isEmpty=Object.keys(user).length==0;
        if(isEmpty){
            res.status(400).json({
                status:"fail",
                message:"user is not present"
            })
        }else next()
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports={
    sanityMiddleware
}