import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getConnection } from 'api/connection';
import { getWallet } from 'api/wallet';
import { getParsedTokenAccountsByOwnerFx } from '..';

getParsedTokenAccountsByOwnerFx.use(async ({ token }) => {
  const connection = getConnection();
  const wallet = getWallet().pubkey;

  const result = await connection.getParsedTokenAccountsByOwner(wallet, {
    programId: TOKEN_PROGRAM_ID,
    mint: token,
  });

  return result.value.map(account => account);
});
