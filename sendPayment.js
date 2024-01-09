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

    // Envoyer un paiement en utilisant le hash fourni
    async function handleSendPaymentButtonClick() {
        const hashInput = document.getElementById('send'); // ID de l'input pour le hash

        if (hashInput.value) {
            try {
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];
                const response = await contract.methods.paymentSent(hashInput.value).send({ from: account });
                console.log('Paiement enregistré avec succès:', response);
                alert('Paiement enregistré avec succès.');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du paiement:', error);
                alert('Erreur lors de l\'envoi du paiement.');
            }
        } else {
            alert("Veuillez entrer un hash valide.");
        }
    }

    // Ajout des gestionnaires d'événements
    function addEventListeners() {
        document.getElementById('envoyerPaiementButton').addEventListener("click", handleSendPaymentButtonClick);
    }

    initWeb3();
});
