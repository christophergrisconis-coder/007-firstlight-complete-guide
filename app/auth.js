import { firebaseConfig } from "./firebase-config.js";

let auth;
let db;
let ready = false;

const providerLabel = (providerId) => {
  if (providerId === "password") {
    return "Email";
  }
  if (providerId === "google.com") {
    return "Google";
  }
  if (providerId === "apple.com") {
    return "Apple";
  }
  return "Unknown";
};

const getCurrentProvider = (user) => {
  if (!user?.providerData?.length) {
    return "Unknown";
  }
  const known = user.providerData.find((item) => item.providerId !== "firebase");
  return providerLabel((known || user.providerData[0]).providerId);
};

const mapUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    provider: getCurrentProvider(user),
  };
};

const ensureReady = async () => {
  if (ready) {
    return true;
  }

  if (!firebaseConfig.enabled) {
    return false;
  }

  const missing = ["apiKey", "authDomain", "projectId", "appId"].filter(
    (key) => !firebaseConfig[key]
  );

  if (missing.length) {
    throw new Error(`Firebase config is missing: ${missing.join(", ")}`);
  }

  const [{ getApps, initializeApp }, authLib, firestoreLib] = await Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"),
    import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"),
  ]);

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = authLib.getAuth(app);
  db = firestoreLib.getFirestore(app);

  ready = true;
  return true;
};

export const getInitialAuthState = () => ({
  enabled: firebaseConfig.enabled,
  loading: firebaseConfig.enabled,
  user: null,
  source: "none",
  message: firebaseConfig.enabled
    ? "Checking sign-in status..."
    : "Auth is disabled. Add Firebase config to enable account sign in.",
});

export const initAuth = async (onChange) => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    onChange(getInitialAuthState());
    return;
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");

  authLib.onAuthStateChanged(auth, (user) => {
    onChange({
      enabled: true,
      loading: false,
      user: mapUser(user),
      source: user ? "firebase" : "none",
      message: user ? "Signed in successfully." : "Not signed in.",
    });
  });
};

export const signUpEmail = async ({ email, password, displayName }) => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    throw new Error("Account auth is not configured yet.");
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const creds = await authLib.createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await authLib.updateProfile(creds.user, { displayName });
  }

  return mapUser(creds.user);
};

export const signInEmail = async ({ email, password }) => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    throw new Error("Account auth is not configured yet.");
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const creds = await authLib.signInWithEmailAndPassword(auth, email, password);
  return mapUser(creds.user);
};

export const signInGoogle = async () => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    throw new Error("Account auth is not configured yet.");
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const provider = new authLib.GoogleAuthProvider();
  const creds = await authLib.signInWithPopup(auth, provider);
  return mapUser(creds.user);
};

export const signInApple = async () => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    throw new Error("Account auth is not configured yet.");
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  const provider = new authLib.OAuthProvider("apple.com");
  const creds = await authLib.signInWithPopup(auth, provider);
  return mapUser(creds.user);
};

export const signOutUser = async () => {
  const isEnabled = await ensureReady();
  if (!isEnabled) {
    return;
  }

  const authLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
  await authLib.signOut(auth);
};

export const saveCloudProgress = async (state, user) => {
  const isEnabled = await ensureReady();
  if (!isEnabled || !user?.uid) {
    return;
  }

  const firestoreLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const ref = firestoreLib.doc(db, "users", user.uid, "progress", "main");

  await firestoreLib.setDoc(
    ref,
    {
      state,
      updatedAt: firestoreLib.serverTimestamp(),
    },
    { merge: true }
  );
};

export const loadCloudProgress = async (user) => {
  const isEnabled = await ensureReady();
  if (!isEnabled || !user?.uid) {
    return null;
  }

  const firestoreLib = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");
  const ref = firestoreLib.doc(db, "users", user.uid, "progress", "main");
  const snap = await firestoreLib.getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  const data = snap.data();
  return data?.state || null;
};
