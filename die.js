export default async (str) => {
  for (const alg of Bun.CryptoHasher.algorithms) {
    const hasher = new Bun.CryptoHasher(alg);
    hasher.update(str);
    str += await new Promise((resolve) => {
      resolve(hasher.digest("hex"));
    });
  }
  return str;
};
