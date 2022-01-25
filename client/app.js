const walletAddress = document.getElementById('wallet-address');
const ethereumButton = document.getElementById('addWallet');


App = {
    contracts: {},
    init: () => {
        App.loadEthereum();
        App.loadContracts();
        App.loadAccount();
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

    },
    renderBooks: () =>{

    },
    addBook: async (title,desc) => {
        const result = await App.deployedContract.addBook(title,desc, {
            from: App.account
        });
        console.log(result.logs[0].args);
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