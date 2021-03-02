import * as BufferLayout from 'buffer-layout';

/**
 * Layout for a public key
 */
export const publicKey = (property = 'publicKey'): BufferLayout.Layout => {
  return BufferLayout.blob(32, property);
};

/**
 * Layout for a 64bit unsigned value
 */
export const uint64 = (property = 'uint64'): BufferLayout.Layout => {
  return BufferLayout.blob(8, property);
};
