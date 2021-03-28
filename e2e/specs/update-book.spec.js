const axios = require('axios');
const { expect } = require('chai');

let response;
let createdBook;
let updatedBook;


describe("Given a created book", () => {
    before(async () => {
        const book = {
            name: "Testing for update",
            author: "Felipe Castillo"
        }
        createdBook = await axios.post('https://librarycicd.herokuapp.com/books', book);
    });
    describe("When the user wants to update the book", () => {
        before(async () => {
            updatedBook = {
                name: "Test name updated",
                author: "Felipe CastilloUpdated"
            }
            response = await axios.put(`https://librarycicd.herokuapp.com/books/${createdBook.id}`, updatedBook);
        });
        it("Then it should return a book with properties id, name, author", () => {
            const bookUpdated = response.data;
            expect(bookUpdated).to.have.property("id");
            expect(bookUpdated).to.have.property("name");
            expect(bookUpdated).to.have.property("author");
        });
        it("Then it should return the updated book", () => {
            const bookUpdated = response.data;
            expect(bookUpdated.name).eq(updatedBook.name);
            expect(bookUpdated.author).eq(updatedBook.author);
        });
        it("Then it should return status code ok", () => {
            expect(response.status).eq(200);
        });
        it("Then it should return a JSON", () => {
            const headers = response.headers
            expect(headers["content-type"]).to.contain("application/json");
        });
    });

});
