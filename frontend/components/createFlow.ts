import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
export async function createNewFlow(
  recipient: any,
  flowRate: any,
  provider: any,
  tokenName: string
) {
  const chainId = await provider
    .getNetwork()
    .then((network: any) => network.chainId);

  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider,
  });

  const signer = provider.getSigner();

  const superSigner = sf.createSigner({ signer: signer });

  const token = await sf.loadSuperToken(tokenName);

  console.log(token);

  try {
    const createFlowOperation = token.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate,
      // userData?: string
    });

    console.log(createFlowOperation);
    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
      `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

function calculateFlowRate(amount: number) {
  if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
    alert("You can only calculate a flowRate based on a number");
    return;
  } else if (typeof Number(amount) === "number") {
    if (Number(amount) === 0) {
      return 0;
    }
    const amountInWei = ethers.BigNumber.from(amount);
    const monthlyAmount: any = ethers.utils.formatEther(amountInWei.toString());
    const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
    return calculatedFlowRate;
  }
}
