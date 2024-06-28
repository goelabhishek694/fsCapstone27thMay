1. launch ec2 instance 
log in management console 
go to ec2 dashboard 
click on launc instance 
chose ubuntu 
instance type(free tier ) and congigure other settings
launch the instance 

2. associate your static ip address to your machine -> go to actions click on associate elastic ip address , default options click associate 

3. click on ec2 instance , and click connect or open terminal in your pc , go to folder where rsa keys was downloaded paste the commands as metioned in ssh client column . you would be able to connect to ec2 instance locally 

4. updte Ubuntu
    sudo apt update
    sudo apt upgrade

5. install node js 
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    sudo apt-get install -y nodejs

6. create your express application 

nano api.js
const express = require("express");
const app = express();

app.get("/",(req,res)=>{
  res.send("Hello World")
})

const port=process.env.PORT || 3000;
app.listen(port, function (req, res) =>{
  console.log(`app is listening on port ${PORT}`);
});

cat api.js-> to see the data of file 




challenges in deployment 
1. static public address 
2. reliable - SLA should be near to 100% , replica instances -> 1 master 4 slave -> 1 master from slave , 3 slave + 1 instance would get booted automatically . 
3. low latency -> 
4. scalability -> scaler morning and night , fewer instances in daytime. 
5. backup -> 
6. cost -> 