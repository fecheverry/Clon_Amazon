import { App } from "../app.js";
import request from "supertest";

describe("#User", () => {

    let app,ver,id
    beforeAll(async () => {
        app = App()
    })

    describe("GET /user", () => {
        test("See all users correct", async () => {
            const resp = await request(app).get("/user/")
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("POST /user", () => {
        test("Create User correct", async () => {
            const resp = await request(app).post("/user/register").send({
                "username": "admin",
                "email": "adm@test.com",
                "password": "root123"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("POST /user", () => {
        test("Login user with password user correct", async () => {
            const resp = await request(app).post("/user/loginu").send({
                "username": "admin",
                "password": "root123"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).not.toBe(undefined)
            ver = resp.body
            console.log(ver)
        })
    })

    describe("PUT /user", () => {
        test("Update User correct", async () => {
            const resp = await request(app).put("/user/")
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "username": "AngelRivera",
                "email": "rivera@test.com",
                "password": "root1234"
            })
            expect(resp.statusCode).toBe(200)
        })
    })

    describe("DELETE /user", () => {
        test("Delete user correct", async () => {
            const resp = await request(app).delete("/user/").set('Authorization', `Bearer ${ver.token}`)
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
            
        })
    })



})