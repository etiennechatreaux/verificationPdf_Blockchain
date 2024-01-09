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

    // Vérifier si le paiement a été reçu
    async function handleCheckReceivedPaymentButtonClick() {
        const hashInput = document.querySelector('input[type="text"][placeholder="Savoir si paiement reçu"]'); // Sélecteur de l'input pour le hash

        if (hashInput.value) {
            try {
                const result = await contract.methods.IsPaymentReceived(hashInput.value).call();
                alert('Le statut de réception pour le hash ' + hashInput.value + ' est : ' + (result ? 'Reçu' : 'Non reçu'));
            } catch (error) {
                console.error('Erreur lors de la vérification du statut de réception:', error);
                alert('Erreur lors de la vérification du statut de réception.');
            }
        } else {
            alert("Veuillez entrer un hash valide.");
        }
    }

    // Ajout des gestionnaires d'événements
    function addEventListeners() {
        document.getElementById('savoirSiPaiementRecuButton').addEventListener("click", handleCheckReceivedPaymentButtonClick);
    }

    initWeb3();
});
