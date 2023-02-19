import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = process.env.NEXT_PUBLIC_PK; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const sendNotification = async (amount: string, address: string) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Payment Received!`,
        body: `You have received a payment of ${amount} ETH from ${address.slice(
          0,
          6
        )}...${address.slice(-4)}`,
      },
      payload: {
        title: `Payment Received!`,
        body: `You have received a payment of ${amount} ETH from ${address.slice(
          0,
          6
        )}...${address.slice(-4)}`,
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

export const sendMsg = async (
  address: string,
  receiver: string,
  amount: string
) => {
  try {
    const user = await PushAPI.user.get({
      account: address,
      env: "staging",
    });
    console.log("User: ", user);
    const response = await PushAPI.chat.send({
      messageContent: `Hi I am requesting a payment of ${amount} Here is my link`,
      messageType: "Text",
      receiverAddress: receiver, // receiver's address or chatId of a group
      account: address,
      pgpPrivateKey: "",
      apiKey:
        "tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm",
      env: "staging",
    });
  } catch (err) {
    console.error("Send Msg Error: ", err);
  }
};
