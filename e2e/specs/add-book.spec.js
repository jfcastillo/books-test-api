const axios = require('axios');
const { expect } = require('chai');

let response;
const book = {
    name: "Testing for delete",
    author: "Felipe Castillo"
}

describe("When the user wants to add a new book", () => {
    before(async () => {
        response = await axios.post('https://librarycicd.herokuapp.com/books', book);
    });
    it("Then it should return a book with properties id, name, author", () => {
        const bookCreated = response.data;
        expect(bookCreated).to.have.property("id");
        expect(bookCreated).to.have.property("name");
        expect(bookCreated).to.have.property("author");
    });
    it("Then it should the created book", () => {
        const bookCreated = response.data;
        expect(bookCreated.name).eq(book.name);
        expect(bookCreated.author).eq(book.author);
    });
    it("Then it should return status code ok", () => {
        expect(response.status).eq(200);
    });
    it("Then it should return a JSON", () => {
        const headers = response.headers
        expect(headers["content-type"]).to.contain("application/json");
    });
});