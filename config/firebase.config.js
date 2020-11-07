import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseUrl,
    projectId:process.env.projectId,
    storageBucket:process.env.storageBucket ,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

if(!firebase.apps.length){
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export default firebase;