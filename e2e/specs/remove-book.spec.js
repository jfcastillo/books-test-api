const axios = require('axios');
const { expect } = require('chai');

let responseRemoved;
let bookToRemove;
let responseList;
describe("With a book created", () => {
    before(async () => {
        const book = {
            name: "Testing for delete",
            author: "Felipe Castillo"
        }
        bookToRemove = await axios.post('https://librarycicd.herokuapp.com/books', book);
    });
    describe("When the user wants to remove a book", () => {
        before(async () => {
            responseRemoved = await axios.delete('https://librarycicd.herokuapp.com/books/' + bookToRemove.id);
            responseList = await axios.get('https://librarycicd.herokuapp.com/books');

        });

        it("Then it should return status code ok", () => {
            expect(responseRemoved.status).eq(200);

        });
        it("Then the book shouldn't exist", () => {
            let exist = responseList.data.some(item => item.name === bookToRemove.name);
            expect(exist).eq(false);

        });
    });

});