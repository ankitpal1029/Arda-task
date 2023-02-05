const axios = require("axios");
const { ethers, Wallet, BigNumber } = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

config = {
  method: "get",
  url: "http://localhost:5000/getAllowance?owner_address=0x657D3C03e450E4815f3411Aa26713A2A90e9Ad83",
};

let tx;

axios(config)
  .then(function (response) {
    tx = response.data;
    const alchemyURI = process.env.ALCHEMY_URL;
    const private_key = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider(alchemyURI);
    const wallet = new Wallet(private_key, provider);

    console.log(response.data);
    let ABI = [
      "function decreaseAllowance(address spender, uint256 subtractedValue)",
    ];
    let iface = new ethers.utils.Interface(ABI);
    console.log(response.data[0].amount);
    const data = iface.encodeFunctionData("decreaseAllowance", [
      response.data[0].spender,
      BigNumber.from(response.data[0].amount),
    ]);

    let nonce;
    wallet.getTransactionCount().then((nonce) => {
      const transaction = {
        nonce,
        gasPrice: 20000000000,
        gasLimit: 1000000,
        to: response.data[0].tokenaddress,
        from: response.data[0].owner,
        value: 0,
        data,
        chainId: 5,
      };

      wallet.populateTransaction(transaction).then((populateTransaction) => {
        wallet
          .signTransaction(populateTransaction)
          .then((signedTransaction) => {
            console.log(signedTransaction);
          });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
