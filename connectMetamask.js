
var web3 = new Web3(window.ethereum);


var userAddress;
//const contract = new web3.eth.Contract(ABI, '0xd9145CCE52D386f254917e481eB44e9943F39138');

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function updateButtonStatus(connected) {
    const button = document.getElementById('connect-button');
    if (connected) {
        button.innerText = "Wallet Connected";
    } else {
        button.innerText = "Connect Wallet";
    }
}

async function checkWalletConnection() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const button = document.getElementById('connect-button');

    if (accounts.length > 0) {
        userAddress=accounts[0];
        updateButtonStatus(true);
    } else {
        updateButtonStatus(false);
    }
}

document.getElementById('connect-button').addEventListener('click', async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

    if (accounts.length > 0) {
        updateButtonStatus(true);
        document.cookie = "walletConnected=true; path=/";

    
        window.location.href = "PageAccueil.html";
        
    }
});

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    checkWalletConnection();
});

window.addEventListener('load', () => {
    const walletConnected = getCookie('walletConnected');
    if (walletConnected) {
        updateButtonStatus(true);
    } else {
        updateButtonStatus(false);
    }
});
