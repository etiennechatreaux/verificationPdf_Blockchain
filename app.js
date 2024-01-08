const { Web3 } = require('web3');
const fs = require('fs');

// Connect to an Ethereum node
const web3 = new Web3('https://sepolia.infura.io/v3/267673d473ad4ee9b359135221fe8c0c');

// Replace these values with your own
const privateKey = '0x4bc425a310abf22238a03cc32978f299db834c0f51dd58b18c458c295a75acaa';
const contractAddress = '0xA944648391346217820b34E32CE00Baae85BCfB9';
const abi = JSON.parse(fs.readFileSync('build/contracts/abi.json', 'utf-8'));

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
    const isInvoiceExisting = await contract.methods.IsInvoiceExisitng(pdfHash).call();
    console.log('Invoice exists ? : ', isInvoiceExisting);
  } catch (error) {
    console.error('Error checking invoice existence:', error);
  }
}


const pdfHash2 = '444';

// Fonction d'écriture que vous souhaitez appeler
const functionName = 'storeHash';
const functionParams = pdfHash2; 
// Remplacez par les paramètres de votre fonction
const contractFunction = contract.methods[functionName](functionParams);
fromAddress = '0xC7d3beb8E105d08d5CEc2647cA46b320735Ee547'

async function storeHashAsync(pdfHash2) {
  web3.eth.accounts.signTransaction({
    to: contractAddress,
    data: contractFunction.encodeABI(),
    gas: 220000,
    gasPrice: 136698842990,
    nonce: await web3.eth.getTransactionCount(fromAddress),
  }, privateKey)
    .then((signedTransaction) => {
      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (hash) => {
          console.log('Transaction hash:', hash);
        })
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log('Confirmation number:', confirmationNumber);
          console.log('Receipt:', receipt);
        })
        .on('receipt', (receipt) => {
          console.log('Transaction succesful with receipt:', receipt);
        })
        .on('error', (error) => {
          console.error('Transaction error:', error);
        });
        
    })
    .catch((error) => {
      console.error('Signing error:', error);
    });
  }

// storeHashAsync().catch((error) => {
//   console.error('Script error:', error);
// });

storeHashAsync(555);

// async function storeHash(pdfHash2) {
//   const accounts = await web3.eth.getAccounts(); 
//   console.log(accounts[0])
  
//   // Appelez la fonction storeHash du smart contract
//   const result = await contract.methods.storeHash(pdfHash2).send({
//     from: '0xC7d3beb8E105d08d5CEc2647cA46b320735Ee547',
//     gas: 3000000, // ajustez le gas en conséquence
//   });

//   console.log(result);
// }


// Call the functions
// checkPaymentSent();
// checkPaymentReceived();
// checkInvoiceExisting();
// Appels de fonctions
// storeHash(pdfHash2);




// Fonction pour vérifier si le paiement a été envoyé


