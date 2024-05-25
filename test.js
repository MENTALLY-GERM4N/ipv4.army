let die = "";

Bun.CryptoHasher.algorithms.forEach((hashAlg) => {
  const hasher = new Bun.CryptoHasher(hashAlg);
  hasher.update("die");

  die += hasher.digest("hex");
});

console.log(die);
