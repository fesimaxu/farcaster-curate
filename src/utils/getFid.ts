import neynarClient from "./neynarClient";
import { mnemonicToAccount } from "viem/accounts";
import { config } from 'dotenv';
config();


export const getFid = async () => {
  if (!process.env.FARCASTER_DEVELOPER_MNEMONIC) {
    throw new Error("FARCASTER_DEVELOPER_MNEMONIC is not set.");
  }

  const account = mnemonicToAccount(process.env.FARCASTER_DEVELOPER_MNEMONIC);

  // Lookup user details using the custody address.
  const { user: farcasterDeveloper } =
    await neynarClient.lookupUserByCustodyAddress(account.address);

  return Number(farcasterDeveloper.fid);
};