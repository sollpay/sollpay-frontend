import { TOKEN_PROGRAM_ID, AccountInfo } from '@solana/spl-token';
import { getConnection } from 'api/connection';
import { getWallet } from 'api/wallet';
import { getParsedTokenAccountsByOwnerFx } from '..';

getParsedTokenAccountsByOwnerFx.use(async ({ tokenMint }) => {
  const connection = getConnection();
  const wallet = getWallet().pubkey;

  const result = await connection.getParsedTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
    mint: tokenMint,
  });
  console.log(111, result);

  return result;
});
