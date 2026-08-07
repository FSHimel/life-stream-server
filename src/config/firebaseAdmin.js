import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

if (!process.env.FB_SERVICE_KEY) {
  throw new Error("FB_SERVICE_KEY is missing");
}

const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8",
);

const serviceAccount = JSON.parse(decoded);

initializeApp({
  credential: cert(serviceAccount),
});

export const adminAuth = getAuth();
