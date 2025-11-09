// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";;

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCH_6TRhco3mouQTPo8FcTwuf7xlsHeVCI",
//   authDomain: "client1-9e7fe.firebaseapp.com",
//   projectId: "client1-9e7fe",
//   storageBucket: "client1-9e7fe.firebasestorage.app",
//   messagingSenderId: "560823428137",
//   appId: "1:560823428137:web:a6618e7a22bd0f3b9aa838"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBhscCZDJf7Xd-Mnr6WfDueMRFeGr_AYGY",
  authDomain: "lunacal-f6c48.firebaseapp.com",
  projectId: "lunacal-f6c48",
  storageBucket: "lunacal-f6c48.appspot.com",
  messagingSenderId: "16879458212",
  appId: "1:16879458212:web:203fc2df7c705c2e89d331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB =getFirestore(app);
const auth =getAuth(app);
const storage = getStorage(app);

export {fireDB,auth,storage};
