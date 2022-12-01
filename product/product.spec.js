import { App } from "../app.js";
import request from "supertest";

describe("#Product", () => {

    let app, ver, id
    beforeAll(async () => {
        app = App()

        await request(app).post("/user/register").send({
            username: "admin",
            email: "adm@test.com",
            password: "root123"
        })
    
        ver = (await request(app).post("/user/loginu").send({
            username: "admin",
            password: "root123"
        })).body
    })

    

    describe("POST /product", () => {
        test("Create product correct", async () => {
            console.log(ver)
            const resp = await request(app).post("/product/register")
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "name": "sandia",
                "price": 10000,
                "category": "pepa"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("GET /product", () => {
        test("See products for user correct", async () => {
            const resp = await request(app).get("/product/user/:username")
            .set('Authorization', `Bearer ${ver.token}`)
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("GET /product", () => {
        test("See individual products correct", async () => {
            const resp = await request(app).get("/product/np")
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "name": "sandia"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
            id = resp.body
        })
    })

    describe("GET /product", () => {
        test("See products by category correct", async () => {
            const resp = await request(app).get("/product/category")
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "name": "pepa"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("GET /product", () => {
        test("See products by category correct", async () => {
            const resp = await request(app).get("/product/pc")
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "username": "admin",
                "name":"pepa"
            })
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
        })
    })

    describe("PUT /product", () => {
        test("Update product correct", async () => {
            const resp = await request(app).put(`/product/${id}`)
            .set('Authorization', `Bearer ${ver.token}`)
            .send({
                "name": "maracuya",
                "price": 10000,
                "category": "pepa"
            })
            expect(resp.statusCode).toBe(200)
        })
    })

    describe("DELETE /user", () => {
        test("Delete product correct", async () => {
            const resp = await request(app).delete(`/product/${id}`).set('Authorization', `Bearer ${ver.token}`)
            expect(resp.statusCode).toBe(200);
            expect(resp.body).toBe(resp.body)
            
        })
    })


})