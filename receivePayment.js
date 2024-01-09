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
        const contractAddress = '0xA944648391346217820b34E32CE00Baae85BCfB9'; // Remplacez par l'adresse de votre contrat
        contract = new web3.eth.Contract(ABI, contractAddress); // Assurez-vous que l'ABI de votre contrat est correctement défini
        addEventListeners();
    }

    // Traiter la réception du paiement
    async function handleReceivePaymentButtonClick() {
        const hashInput = document.querySelector('input[type="text"][placeholder="Recevoir le paiement"]'); // Sélecteur de l'input pour le hash

        if (hashInput.value) {
            try {
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];
                const response = await contract.methods.paymentReceived(hashInput.value).send({ from: account });
                console.log('Réception du paiement enregistrée:', response);
                alert('Réception du paiement enregistrée avec succès.');
            } catch (error) {
                console.error('Erreur lors de la réception du paiement:', error);
                alert('Erreur lors de la réception du paiement.');
            }
        } else {
            alert("Veuillez entrer un hash valide.");
        }
    }

    // Ajout des gestionnaires d'événements
    function addEventListeners() {
        document.getElementById('recevoirPaiementButton').addEventListener("click", handleReceivePaymentButtonClick);
    }

    initWeb3();
});
