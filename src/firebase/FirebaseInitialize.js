import FirebaseConfig from "./FirebaseConfig";
import { initializeApp } from "firebase/app";

const firebaseConfig = FirebaseConfig;

const firebaseapp = initializeApp(firebaseConfig);

export { firebaseapp };
