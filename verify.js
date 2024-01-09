    import "Build/contracts/ABI.js";
    document.addEventListener("DOMContentLoaded", function() {
    let web3;
    let contract;

    async function initWeb3() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
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
        contract = new web3.eth.Contract(ABI, contractConnectWalletAddress);
        addEventListeners();
    }

    async function handleVerifyButtonClick() {
        const hashInput = text.getElementById('verify'); // ID de l'input 
        if (fileInput.files.length > 0) {
            const hashverify = hashInput;
            const reader = new FileReader();

            reader.onload = async function() {
                const buffer = reader.result;
                const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
                
                hashText.textContent = "Le hachage du fichier est: " + hashHex;
                await storePDFHash(hashHex);
            };

            reader.readAsArrayBuffer(file);
        } else {
            hashText.textContent = "Veuillez choisir un fichier PDF avant de hacher.";
        }
    }

    // Stocker le hash dans le contrat
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

    // Ajout des gestionnaires d'événements
    function addEventListeners() {
        document.getElementById('hashButton').addEventListener("click", handleHashButtonClick);
    }

    initWeb3();
    addEventListeners();
});