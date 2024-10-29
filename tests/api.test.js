import pkg from "pactum";
const { spec } = pkg;
import { expect } from "chai";
import { baseURL, userID, isbn, password } from "../helpers/data.js";

let token;

describe("Api tests", () => {
  it("GET request", async () => {
    const response = await spec()
      .get(`${baseURL}/BookStore/v1/Books`)
    const r = JSON.stringify(response.body);
    expect(response.statusCode).to.eql(200);
    expect(r).to.include("Learning JavaScript Design Patterns");
  });

  it.skip("Create a user", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/User`)
      .withBody({
        userName: "3QA",
        password: password,
      });
    expect(response.statusCode).to.eql(201);
  });

  it("Generate token", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/GenerateToken`)
      .withBody({
        userName: "3QA",
        password: password,
      })
      token = response.body.token;
    expect(response.statusCode).to.eql(200);
  });

  it("Add a book", async () => {
    const response = await spec()
    .post(`${baseURL}/BookStore/v1/Books`)
    .withBearerToken(token)
    .withBody({
    
            "userId": userID,
            "collectionOfIsbns": [
              {
                "isbn": isbn
              }
            ]
          
    })
    expect(response.statusCode).to.eql(201)
  })

  it("Delete all books", async () => {
    const response = await spec()
    .delete(`${baseURL}/BookStore/v1/Books?UserId=${userID}`)
    .withBearerToken(token)
    expect(response.statusCode).to.eql(204)
  })

  it("Get user info", async () => {
    const response = await spec()
    .get(`${baseURL}/Account/v1/User/${userID}`)
    .withBearerToken(token)
    expect(response.body.books).to.eql([])
    expect(response.statusCode).to.eql(200)
  })
});
