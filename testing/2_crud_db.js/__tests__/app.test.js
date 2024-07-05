const request=require("supertest");
const app=require("../app");
const UserModel=require("../model");

jest.mock("../model");

//test suite 
describe("user sign up",()=>{
    beforeEach(()=>{
        console.log(" i was executed b4 eah test case");
        jest.clearAllMocks();
    })
    beforeAll(()=>{
        console.log("executed once before running al test cases");
    })
    // afterEach afterAll

    //test case
    it("should create user successfully",async()=>{
        const userData={
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            confirmPassword: "password123",
        };

        UserModel.create.mockResolvedValue(userData);
        const response=await request(app).post("/api/users").send(userData);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe("successful");
        expect(response.body.message).toEqual(userData);
        expect(response.body.message).toHaveProperty("password","password123");
        
    })

    it("should return an error for invalid registration data", async () => {
        const userData = {
            name: "Test User",
            email: "test@example.com",
        };

        UserModel.create.mockRejectedValue(new Error("Invalid registration data"));

        const response = await request(app)
        .post("/api/users")
        .send(userData);
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("message", "Internal server error");
        expect(response.body).toHaveProperty("status", "failure");
       
    });
})
