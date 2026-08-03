import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../../lifestream-dfa99-firebase-adminsdk.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

export const adminAuth = getAuth();
