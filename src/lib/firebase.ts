import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCxVXwZetg8dBXnw_GMr4y0o-mGg7vj03Y",
  authDomain: "banner-viewer--signinup.firebaseapp.com",
  projectId: "banner-viewer--signinup",
  storageBucket: "banner-viewer--signinup.firebasestorage.app",
  messagingSenderId: "273295649587",
  appId: "1:273295649587:web:52758b8a9aae2fabc7ac46",
  measurementId: "G-D8VSLJE1ET"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

// Only initialize analytics if window is defined (client-side)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;