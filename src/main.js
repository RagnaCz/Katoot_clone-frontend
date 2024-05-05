import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCBerNcub5qykfOHKBxYoz9Vl1cqG1mm1g",
  authDomain: "egco427-1d490.firebaseapp.com",
  projectId: "egco427-1d490",
  storageBucket: "egco427-1d490.appspot.com",
  messagingSenderId: "897620003440",
  appId: "1:897620003440:web:40e94d1b6684c0192042b5",
  measurementId: "G-6C5P86XSNY"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App).use(router).mount('#app')