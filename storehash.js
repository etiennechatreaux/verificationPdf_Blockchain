var web3 = new Web3(window.ethereum);
const contractConnectWalletAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const provider = await detectEthereumProvider();

const contract = new web3.eth.Contract(ABI, contractConnectWalletAddress);

async function storePDFHash(event) {
    event.preventDefault();
    const hash = document.getElementById('pdfHash').value;

    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        console.log('Account:', account);

        const result = await contract.methods.storeHash(hash).send({ from: account });
        console.log('Transaction receipt:', result);
        alert("Result: " + result.events.HashStored.returnValues.message);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du hash PDF.', error);
        alert("Une erreur s'est produite lors de l'ajout du hash PDF.");
    }
}

document.getElementById('storeHashForm').addEventListener('submit', storePDFHash);
