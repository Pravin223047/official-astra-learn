import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type FirebaseAdmin = {
  auth: Auth;
  db: Firestore;
};

let firebaseAdmin: FirebaseAdmin | undefined;

function getFirebaseAdmin(): FirebaseAdmin {
  if (!firebaseAdmin) {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
      process.env;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
      throw new Error(
        "FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY must be configured."
      );
    }

    const apps = getApps();

    if (!apps.length) {
      initializeApp({
        credential: cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
      });
    }

    firebaseAdmin = {
      auth: getAuth(),
      db: getFirestore(),
    };
  }

  return firebaseAdmin;
}

function lazyService<T extends object>(getService: () => T): T {
  return new Proxy({} as T, {
    get(_target, property) {
      const service = getService();
      const value = Reflect.get(service, property, service);

      return typeof value === "function" ? value.bind(service) : value;
    },
  });
}

export const auth = lazyService(() => getFirebaseAdmin().auth);
export const db = lazyService(() => getFirebaseAdmin().db);
