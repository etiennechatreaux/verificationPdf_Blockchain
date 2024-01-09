document.addEventListener("DOMContentLoaded", function() {
    let web3;
    let contract;

    async function initWeb3() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                // Demander l'accès au compte si nécessaire
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Initialiser le contrat après que Web3 est configuré
                initContract();
            } catch (error) {
                console.error("Accès refusé par l'utilisateur.");
            }
        } else {
            console.error("Veuillez installer MetaMask!");
        }
    }
async function initContract() {
    const contractConnectWalletAddress = '0xA944648391346217820b34E32CE00Baae85BCfB9';
    const contractABI = [ABI];

    contract = new web3.eth.Contract(contractABI, contractConnectWalletAddress);
    // Le contrat est maintenant initialisé et prêt à être utilisé
    addEventListeners();
}

function addEventListeners() {
    document.addEventListener("DOMContentLoaded", function() {
        const input = document.getElementById('fileInput');
        const hashButton = document.getElementById('hashButton');
        const hashText = document.getElementById('hashText');

        hashButton.addEventListener("click", function() {
            if (input.files.length > 0) {
                var file = input.files[0];
                var reader = new FileReader();

                reader.onload = function() {
                    var buffer = reader.result;
                    crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
                        var hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
                        hashText.textContent = "Le hachage du fichier est: " + hex;
                        storePDFHash(hex);
                    });
                };

                reader.readAsArrayBuffer(file);
            } else {
                hashText.textContent = "Veuillez choisir un fichier PDF avant de hacher.";
            }
        });
    });
}

async function storePDFHash(hash) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const response = await contract.methods.storeHash(hash).send({ from: account });
        console.log('Hash stocké avec succès:', response);
    } catch (error) {
        console.error('Erreur lors du stockage du hash:', error);
    }
}

// Initialiser Web3 et le contrat
initWeb3();
});

// document.addEventListener("DOMContentLoaded", function() {
//     const input = document.getElementById('fileInput');
//     const hashButton = document.getElementById('hashButton');
//     const hashText = document.getElementById('hashText');

//     // ABI de votre contrat
    
//     const contractConnectWalletAddress = '0xC7d3beb8E105d08d5CEc2647cA46b320735Ee547';
//     const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
//     const contract = new web3.eth.Contract(ABI, contractConnectWalletAddress);

//     hashButton.addEventListener("click", function() {
//         if (input.files.length > 0) {
//             var file = input.files[0];
//             var reader = new FileReader();

//             reader.onload = function() {
//                 var buffer = reader.result;
//                 crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
//                     var hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
//                     hashText.textContent = "Le hachage du fichier est: " + hex;
//                     storePDFHash(hex);
//                 });
//             };

//             reader.readAsArrayBuffer(file);
//         } else {
//             hashText.textContent = "Veuillez choisir un fichier PDF avant de hacher.";
//         }
//     });

//     async function storePDFHash(hash) {
//         try {
//             const accounts = await web3.eth.getAccounts();
//             const account = accounts[0];
//             const response = await contract.methods.storeHash(hash).send({ from: account });
//             console.log('Hash stocké avec succès:', response);
//         } catch (error) {
//             console.error('Erreur lors du stockage du hash:', error);
//         }
//     }
// });