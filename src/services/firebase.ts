import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBMsvKzXWuwINYuPgWidYFASGVAwTfjrXQ",
  authDomain: "background-remover-3e56a.firebaseapp.com",
  projectId: "background-remover-3e56a",
  storageBucket: "background-remover-3e56a.appspot.com",
  messagingSenderId: "10870116390",
  appId: "1:10870116390:web:d8002c72e339cdfa2216e7",
  measurementId: "G-37VKG3S16J"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);