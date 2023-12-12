


const { Web3 } = require('web3');
const fs = require('fs');

// Connect to an Ethereum node
const web3 = new Web3('https://sepolia.infura.io/v3/267673d473ad4ee9b359135221fe8c0c');

// Replace these values with your own
const privateKey = '0x4bc425a310abf22238a03cc32978f299db834c0f51dd58b18c458c295a75acaa';
const contractAddress = '0xA944648391346217820b34E32CE00Baae85BCfB9';
const abi = JSON.parse(fs.readFileSync('C:/Users/xtrem/Documents/Blockchain/abi.json', 'utf-8'));

// Create an instance of the contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Replace this hash with the one you generated for your PDF file
const pdfHash = '516161';

async function checkPaymentSent() {
  const isPaymentSent = await contract.methods.IsPaymentSent(pdfHash).call();
  console.log('Payment sent:', isPaymentSent);
}

async function checkPaymentReceived() {
  const isPaymentReceived = await contract.methods.IsPaymentReceived(pdfHash).call();
  console.log('Payment received:', isPaymentReceived);
}

async function checkInvoiceExisting() {
  try {
    // Use the correct function name from the ABI
    const isInvoiceExisting = await contract.methods.IsInvoiceExisting(pdfHash).call();
    console.log('Invoice exists ? : ', isInvoiceExisting);
  } catch (error) {
    console.error('Error checking invoice existence:', error);
  }
}

// Call the functions
checkPaymentSent();
checkPaymentReceived();
// checkInvoiceExisting();


/*
// Fonction pour envoyer le hash au smart contract
async function storeHash() {
  const accounts = await web3.eth.getAccounts();
  
  // Appelez la fonction storeHash du smart contract
  const result = await contract.methods.storeHash(pdfHash).send({
    from: accounts[0],
    gas: 3000000, // ajustez le gas en conséquence
  });

  console.log(result);
}

// Fonction pour vérifier si le paiement a été envoyé


// Appels de fonctions
storeHash();

*/