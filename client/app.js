const walletAddress = document.getElementById('wallet-address');
const ethereumButton = document.getElementById('addWallet');


App = {
    init: () => {
        console.log('Loaded');
        App.loadEthereum();
        App.loadContracts();
    },

    loadEthereum: async () => {
        if (window.ethereum != null) {
            App.web3Provider = window.ethereum;
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });
            walletAddress.innerText = accounts[0];
            ethereumButton.innerText = "Wallet Connected";
            console.log("Wallet loaded");
        }
    },

    loadContracts: async () => {
        const res = await fetch("../build/contracts/BookContracts.json");
        const bookContractJSON = await res.json();
        console.log(bookContractJSON);
    }
}


ethereumButton.addEventListener('click', () => {
    App.init();
});