import { KnownToken } from '@solana/spl-token-registry';

declare module '@solana/spl-token-registry' {
  export declare const TOKENS: {
    [cluster: string]: KnownToken[];
  };
}
