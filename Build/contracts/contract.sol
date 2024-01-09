// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract pdf_hashes {
    string[] private hashesList;
    mapping(string => bool) private isPaymentSent;
    mapping(string => bool) private isPaymentReceived;
    mapping(string => bool) private isHashInArray;
    mapping(string => address) private hashSender;

    function storeHash(string memory _hash) public returns (string memory) {
        if (isHashInArray[_hash]) {
            return "Erreur: ce pdf a deja ete ajoute";
        }
        else {
            hashesList.push(_hash);
            isPaymentSent[_hash] = false;
            isPaymentReceived[_hash] = false;
            isHashInArray[_hash] = true;
            hashSender[_hash] = msg.sender;
            return "Succes: Le pdf a bien ete ajoute";
        }
       
    }

    function returnHash() view public returns (string[] memory) {
        return hashesList;
    }

    // function resetHashList() public {
    //    hashesList = new uint[](0);
    //    delete isPaymentSent;
    //}

    //function deleteHash() public {
    //    hashesList = new uint[](0);
    //}

    
    function paymentSent(string memory _hash) public returns (string memory) {
        if (isPaymentSent[_hash]) {
            return "Erreur: le paiement a deja ete envoye";
        }
        else {
            isPaymentSent[_hash] = true;
            return "Succes: envoi du paiement enregistre";
        }
    }

//Il aurait fallu utiliser des event:
//                       event HashStored(string message, string hash);
//
//                      function storeHash(string memory _hash) public returns (string memory) {
//                        if (isHashInArray[_hash]) {
//                          emit HashStored("Erreur: ce pdf a deja ete ajoute", _hash);
//                        return "Erreur: ce pdf a deja ete ajoute";
//                  }
//                else {
//                  hashesList.push(_hash);
//                isPaymentSent[_hash] = false;
//              isPaymentReceived[_hash] = false;
//            isHashInArray[_hash] = true;
//          hashSender[_hash] = msg.sender;
//        emit HashStored("Succes: Le pdf a bien ete ajoute", _hash);
//      return "Succes: Le pdf a bien ete ajoute";
//}
//}

    function paymentReceived(string memory _hash) public returns (string memory) {
        if (msg.sender == hashSender[_hash]) {
            return "Erreur: seul le destinataire peut attester de la reception du paiement";
        }
        else {
            if (isPaymentReceived[_hash]) {
                return "Erreur: le paiement a deja ete recu";
            }
            else {
                isPaymentReceived[_hash] = true;
                return "Succes: reception du paiement enregistree";
            }
        }
    }

    function IsPaymentSent(string memory _hash) public view returns (bool) {
        return isPaymentSent[_hash];
    }

    function IsPaymentReceived(string memory _hash) public view returns (bool) {
        return isPaymentReceived[_hash];
    }

    function IsInvoiceExisitng(string memory _hash) public view returns (bool) {
        return isHashInArray[_hash];
    }
}