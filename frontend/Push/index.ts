import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = "e0d15250dd64940b03b85c65baa1d53af003f3003530d71e97be8a4752e0daba"; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async () => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Payment Received!`,
        body: `You have received a payment of 0.1 ETH from 0x1234...`,
      },
      payload: {
        title: `Payment Received!`,
        body: `You have received a payment of 0.1 ETH from 0x1234...`,
        cta: "",
        img: "",
      },
      recipients: "eip155:5:0xE643CF465eDE9ad11E152BAb8d3cdC6CBC3712E1", // recipient address
      channel: "eip155:5:0xE643CF465eDE9ad11E152BAb8d3cdC6CBC3712E1", // your channel address
      env: "staging",
    });

    // apiResponse?.status === 204, if sent successfully!
    console.log("API repsonse: ", apiResponse);
  } catch (err) {
    console.error("Error: ", err);
  }
};

sendNotification();
