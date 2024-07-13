import { randomInt } from "node:crypto";

function getRandomString(
  length = 0,
  key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_0123456789"
) {
  let final = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, key.length);
    final += key[randomIndex];
  }
  return final;
}

export default function ({
  id = getRandomString(18, "0123456789"),
  mfaProbability = 0.15,
} = {}) {
  const randomFraction = randomInt(0, 1000001) / 1000000; // Generate a truly random fraction between 0 and 1
  const isMfa = randomFraction < mfaProbability;
  let token;

  if (isMfa) {
    const randomLength = randomInt(20, 69); // Generate a random length between 20 and 68
    token = `mfa.${getRandomString(randomLength)}`;
  } else {
    const encodedId = Buffer.from(id).toString("base64"); // Use Buffer for base64 encoding
    const timestamp = getRandomString(randomInt(6, 8)); // Generate a random length between 6 and 7
    const hmac = getRandomString(27);

    token = `${encodedId}.${timestamp}.${hmac}`;
  }

  return token;
}
