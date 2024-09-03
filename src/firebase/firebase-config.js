import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrSbmkT4iQh-h0HMxMaJarDATijgRTggw",
  authDomain: "react-food-ordering-app-9a183.firebaseapp.com",
  projectId: "react-food-ordering-app-9a183",
  storageBucket: "react-food-ordering-app-9a183.appspot.com",
  messagingSenderId: "173178612693",
  appId: "1:173178612693:web:6648149e28384788c52b5c",
  measurementId: "G-V68JNMVY6D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
