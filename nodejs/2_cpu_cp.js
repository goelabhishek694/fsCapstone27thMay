const express = require('express');
const app = express();
const cors = require("cors");
const { fork } = require("child_process");
app.use(cors());


app.get('/fib', (req, res) => {
    const { target, requestNumber } = req.query;
    console.log("received req", requestNumber);
    // new nodejs process for fib helper is created 
    const fibWorker=fork("./fib_helper.js");
    fibWorker.send({target});
    fibWorker.on("message",function(answer){
        res.status(200).json({
            status: "success",
            message: answer,
            requestNumber: requestNumber
        })
        //prcoess will be destoyed
        fibWorker.kill();
    })

    fibWorker.on("error",(err)=>{
        res.status(500).json({error:"An error occured while processing the request"});
    })
    
});

app.listen(3000, function () {
    console.log("server is running at port 3000");
})