import { jwtVerify } from "jose";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "auth_token");

  if (!token) {
    return { valid: false };
  }

  try {
    const secret = new TextEncoder().encode("your-secret-key");
    await jwtVerify(token, secret);
    return { valid: true };
  } catch {
    return { valid: false };
  }
});
