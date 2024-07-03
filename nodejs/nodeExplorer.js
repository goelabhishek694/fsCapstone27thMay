// console.log(global);
// console.log("dir name",__dirname,"file name",__filename);

//is a global object , provides information about the current nodejs process. core modules and i availabke w/o needing to import
console.log(process);
// console.log(process.cwd());
const fs=require("fs");
console.log(process.argv);

let args=process.argv.slice(2);
console.log(args);

if(args[0]=="touch"){
    let res=fs.writeFileSync(args[1],"");
    console.log(res);
}
if(args[0]=="cd"){
    if(args[1]==".."){
        //go one dir up 
        

    }
    else{
        // go to this particular dir 

    }
}
// path of that folder -> recusrively read contendts of all the files and return it 
