document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById('fileInput');
    const hashButton = document.getElementById('hashButton');
    const hashText = document.getElementById('hashText');

    // ABI de votre contrat
    const ABI = [/* ABI de votre contrat ici */];
    const contractConnectWalletAddress = '0xC7d3beb8E105d08d5CEc2647cA46b320735Ee547';
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const contract = new web3.eth.Contract(ABI, contractConnectWalletAddress);

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
});