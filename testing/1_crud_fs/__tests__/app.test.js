const request =require("supertest");
const app=require("../app");
const fs=require("fs");
jest.mock("fs");
//spyOn -> classes , 
fs.readFileSync.mockReturnValueOnce(JSON.stringify([{id:1, name:"User1"}]))();
// const myMock1 = jest.fn(); //ud
// const mockCallback = jest.fn(x => 42 + x);
// const num=mockCallback(28);
// console.log(num);

describe("get all user data", ()=>{
    it("should return all the users",async ()=>{
        fs.readFileSync.mockReturnValueOnce(JSON.stringify([{id:1, name:"User1"}]));
        const response = await request(app).get("/api/user");
        console.log(response.status, response.body);
    })
})

// 1. should return user daya 
// 2. it should handle file error 
// 3. it user found 