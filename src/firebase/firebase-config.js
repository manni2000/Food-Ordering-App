import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDlwwWkqzGFtE3DZKGrZ_oSldlGoKRCMLU',
  authDomain: 'react-food-delivery-auth.firebaseapp.com',
  projectId: 'react-food-delivery-auth',
  storageBucket: 'react-food-delivery-auth.appspot.com',
  messagingSenderId: '596637437270',
  appId: '1:596637437270:web:a55b2505c7da8620481af7',
  measurementId: 'G-K1WHBHG9K2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
