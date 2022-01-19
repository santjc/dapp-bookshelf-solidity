const {
    assert
} = require("chai");

const BookContract = artifacts.require("BookContracts");

contract("BookContract", () => {
    before(async () => {
        //this set data in scope
        this.bookContract = await BookContract.deployed();
    })

    //describes testing
    it('Migrate deployed succesfully', async () => {
        const address = this.bookContract.address;

        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('Get Book List', async () => {
        const _bookCount = await this.bookContract.bookCount();
        const _book = await this.bookContract.books(_bookCount);

        assert.equal(_book.id.toNumber(), _bookCount);

    })

    it('Task created succesfully', async () =>{
        const result = await this.bookContract.addBook("Book Test 0x0", "This is a book created from test");
        const bookEvent = result.logs[0].args;
        assert.equal(bookEvent.id.toNumber(), 2);
    })

});