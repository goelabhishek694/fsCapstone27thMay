const bcrypt=require("bcrypt");
const password="12345678";

async function hashPassword(password){
    console.time();
    //work factor -> 0 to 12
    const randomSalt=await bcrypt.genSalt(12);
    console.log("randomSalt ",randomSalt);
    const hashedPassword=await bcrypt.hash(password,randomSalt);
    console.log("hashedPassword ", hashedPassword);
                                            //password entred by user while logging in , hashedPassword we get from db
    const isTheSameOrNot=await bcrypt.compare(password,hashedPassword);
    console.log("result",isTheSameOrNot);
    console.timeEnd();
}

hashPassword(password).then(()=>{
    console.log("password hashing done");
}).catch(err=>console.log(err))