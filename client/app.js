const walletAddress = document.getElementById('wallet-address');
const ethereumButton = document.getElementById('addWallet');


App = {
    contracts: {},
    bookCount: 0,
    deployedContract: {},
    init: () => {
        App.loadEthereum();
        App.loadContracts();
        App.loadAccount();
        App.renderBooks();
        console.log('ECA');
    },

    loadEthereum: async () => {
        if (window.ethereum != null) {
            App.web3Provider = window.ethereum;
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });
            walletAddress.innerText = accounts[0];
            ethereumButton.innerText = "Wallet Connected";
        }
    },
    loadAccount: async () =>{
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
        });

        App.account = accounts[0];
    },
    loadContracts: async () => {
        const res = await fetch("../build/contracts/BookContracts.json");
        const bookContractJSON = await res.json();
        App.contracts.bookContract = TruffleContract(bookContractJSON);
        App.contracts.bookContract.setProvider(App.web3Provider);
        App.deployedContract = await App.contracts.bookContract.deployed();
        App.bookCount = await App.deployedContract.bookCount();

    },

    addBook: async (title,desc) => {
        const result = await App.deployedContract.addBook(title,desc, {
            from: App.account
        });
        console.log(result.logs[0].args);
    },
    renderBooks: async () =>{
        const bookCountNumber = await App.bookCount.words[0];
        const bookContainer = document.getElementById('book-container');
        for(let i = 1; i < bookCountNumber ; i++){
            console.log("asd");
            const book = await App.deployedContract.books(i);
            const newBook = document.createElement('figure');
            newBook.setAttribute('id','book-'+i.toNumber()+'');
            newBook.classList.add('book');
            newBook.innerHTML = '<div class="book-header"><h1 class="book-title">'+book.title+'</h1><a href="" class="btn2 available">AV</a></div><div class="book-content"><h3 class="book-desc">'+book.description+'</h3><h3 class="book-lend_date">Lended at '+book.lendAt+'</h3></div>';
            bookContainer.appendChild(newBook);
        }
    }
}


ethereumButton.addEventListener('click', () => {
    App.init();
});


const addBookForm = document.querySelector('#addBookForm');
addBookForm.addEventListener("submit", e => {
    e.preventDefault();
    const bookName = addBookForm['bookName'].value;
    const bookDesc = addBookForm['bookDesc'].value
    App.addBook(bookName,bookDesc);
})