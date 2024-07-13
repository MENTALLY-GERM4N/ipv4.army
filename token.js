async function getRandomString(
  length = 0,
  key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_0123456789"
) {
  let final = "";
  for (let i = 0; i < length; i++) {
    final += key[Math.floor(Math.random() * key.length)];
  }
  return final;
}

export default async function ({
  id = await getRandomString(18, "0123456789"),
  mfaProbability = 0.15,
} = {}) {
  const isMfa = Math.random() < mfaProbability;
  let token;

  if (isMfa) {
    token = `mfa.${await getRandomString(
      Math.floor(Math.random() * (68 - 20)) + 20
    )}`;
  } else {
    const encodedId = btoa(id);
    const timestamp = await getRandomString(Math.floor(Math.random() * (7 - 6) + 6));
    const hmac = await getRandomString(27);

    token = `${encodedId}.${timestamp}.${hmac}`;
  }

  return token;
}
