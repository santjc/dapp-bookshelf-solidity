// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract BookContracts{
    uint256 public bookCount = 0;

    //Executes code once the contract is deployed.

    struct Book{
        uint256 id;
        string title;
        string description;
        bool available;
        uint lendAt;
    }
    mapping (uint => Book) public books;
    
    constructor(){
        addBook("Book 0x0", "Book 0x0 by Santiago");
    }

    function addBook(string memory _title, string memory _description) public{
        bookCount++;
        books[bookCount] = Book(bookCount,_title,_description, true, 0);
        emit BookAdded(bookCount,_title,_description, true, 0);
    } 

    function lendBook(uint _id) public{
        Book memory _book = books[_id];
        _book.lendAt = block.timestamp;
        _book.available = false;
        books[_id] = _book;
        emit BookLended(_id);
    }


    //events - when a book is created retrieve that was created on logs[]
    event BookAdded(
        uint256 id,
        string title,
        string description,
        bool available,
        uint lendAt
    );

    event BookLended(
        uint256 id
    );

}