const request = require("supertest");
const app = require("../app");
const fs = require("fs");
jest.mock("fs");
//spyOn -> classes ,
// const fsread=jest.spyOn(fs,"readFileSync");
// fsread.mockReturnValueOnce(JSON.stringify([{id:1, name:"User1"}]))();
// const myMock1 = jest.fn(); //ud
// const mockCallback = jest.fn(x => 42 + x);
// const num=mockCallback(28);
// console.log(num);

describe("get all user data", () => {
  it("should return all the users", async () => {
    fs.readFileSync.mockReturnValueOnce(
      JSON.stringify([{ id: 1, name: "User1" }])
    );
    const response = await request(app).get("/api/user");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toEqual([{ id: 1, name: "User1" }]);
  });

  it("should return [] if no users", async () => {
    fs.readFileSync.mockReturnValueOnce(JSON.stringify([]));
    const response = await request(app).get("/api/user");
    expect(response.status).toBe(404);
    expect(response.body.status).toBe("fail");
    expect(response.body.message).toBe("no users found");
  });

  it("should handle file error", async () => {
    fs.readFileSync.mockImplementationOnce(() => {
    throw new Error("file not found");
    });
    const response = await request(app).get("/api/user");
    console.log(response.status);
    console.log(response.body);
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Error: file not found");
  });
});

// 1. should return user daya
// 2. it should handle file error
// 3. it user found
