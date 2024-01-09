document.getElementById('deconnexionMetaMaskButton').addEventListener('click', function() {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts', params: [{ eth_accounts: {} }] })
            .then(() => {
                console.log("MetaMask déconnecté");
                // Vous pouvez ajouter ici une logique pour gérer l'état de déconnexion dans votre application
            })
            .catch((error) => {
                console.error("Erreur lors de la déconnexion de MetaMask:", error);
            });
    }
});