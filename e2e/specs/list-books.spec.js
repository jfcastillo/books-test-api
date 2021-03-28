const axios = require('axios');
const { expect } = require('chai');

let response;

describe("When the user wants to list all the books", () => {
    before(async () => {
        response = await axios.get('https://librarycicd.herokuapp.com/books');
    });
    it("Then it should return books with properties id, name, author", () => {
        const book = response.data[0];
        expect(book).to.have.property("id");
        expect(book).to.have.property("name");
        expect(book).to.have.property("author");
    });
    it("Then it should return status code ok", () => {
        expect(response.status).eq(200);
    });
    it("Then it should return a JSON", () => {
        const headers = response.headers
        expect(headers["content-type"]).to.contain("application/json");
    });
});