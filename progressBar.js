document.addEventListener("DOMContentLoaded", function() {
    let web3;
    let contract;
    // const progressBar = document.getElementById('progressBar');
    // const checkProgressButton = document.getElementById('checkProgressButton');
    // const HashAvancement = document.getElementById('HashAvancement'); // Assurez-vous que cet ID correspond à un élément input où l'utilisateur entre le hash de la facture
    const progressBar = document.getElementById('progressBar');
    const stepElements = {
        invoiceIssued: document.getElementById('step1'),
        paymentSent: document.getElementById('step2'),
        paymentReceived: document.getElementById('step3')
    };
    const checkProgressButton = document.getElementById('checkProgressButton');
    const hashInput = document.getElementById('HashAvancement'); 

    async function initWeb3() {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
                initContract();
            } catch (error) {
                console.error("L'utilisateur a refusé l'accès à son compte.");
            }
        } else {
            console.error("Veuillez installer MetaMask pour utiliser cette fonctionnalité.");
        }
    }

    async function initContract() {
        const contractAddress = '0xA944648391346217820b34E32CE00Baae85BCfB9'; // Remplacez par l'adresse de votre contrat
        contract = new web3.eth.Contract(ABI, contractAddress);
    }

    async function checkProgress() {
        if (!hashInput.value) {
            alert("Veuillez entrer le hash de la facture.");
            return;
        }

        try {
            const invoiceExists = await contract.methods.IsInvoiceExisitng(hashInput.value).call();
            const paymentSent = await contract.methods.IsPaymentSent(hashInput.value).call();
            const paymentReceived = await contract.methods.IsPaymentReceived(hashInput.value).call();

            let progressPercentage = 0;
            stepElements.invoiceIssued.classList.remove('active');
            stepElements.paymentSent.classList.remove('active');
            stepElements.paymentReceived.classList.remove('active');

            if (invoiceExists) {
                stepElements.invoiceIssued.classList.add('active');
                progressPercentage = 33;
            }
            if (paymentSent) {
                stepElements.paymentSent.classList.add('active');
                progressPercentage = 66;
            }
            if (paymentReceived) {
                stepElements.paymentReceived.classList.add('active');
                progressPercentage = 100;
            }

            progressBar.style.width = progressPercentage + '%';
        } catch (error) {
            console.error("Erreur lors de la récupération de l'état du paiement:", error);
            alert("Erreur lors de la vérification de l'avancement du paiement.");
        }
    }

    checkProgressButton.addEventListener('click', checkProgress);



    initWeb3();
});
