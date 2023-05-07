import Head from "next/head";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import firebase from "firebase/compat/app"
import "firebase/compat/database"

export default function Header(props) {
    const [data, setData] = useState([]);

    const firebaseConfig = {
        apiKey: "AIzaSyCFhDBY67ZzAAmlYeVW-lTac-KK7FA1zVY",
        authDomain: "graspway-80b44.firebaseapp.com",
        databaseURL: "https://graspway-80b44-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "graspway-80b44",
        storageBucket: "graspway-80b44.appspot.com",
        messagingSenderId: "832397616364",
        appId: "1:832397616364:web:30accde802dd4f292bb1c9",
        measurementId: "G-W6X526YXRW"
    };
    firebase.initializeApp(firebaseConfig);
    // const app = initializeApp(firebaseConfig);
    // const db = getDatabase(app);
    const countViews = (viewersIP) => {
        let views;
        let ipToString = viewersIP.toString();

        for (let i = 0; i < ipToString.length; i++) {
            ipToString = ipToString.replace(".", "-");
        }

        firebase.database()
            .ref()
            .child("page_view/" + ipToString)
            .set({ viewersIP: viewersIP });
        firebase.database()
            .ref()
            .child("page_view")
            .on("value", (snap) => {
                views = snap.numChildren();
                console.log(views);
                localStorage.setItem('user_visits', views);
            });
    }

    if (typeof window !== 'undefined') {
        window.getViewersIP = (response) => {
            if (response && response.ip) {
                countViews(response.ip);
            }
        }
    }

    return (
        <>
            <Helmet>
                <script type="application/javascript" src="https://api.ipify.org/?format=jsonp&callback=getViewersIP"></script>
            </Helmet>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" type="image/x-icon" href="/graspway-ico.svg" />
            </Head>
        </>
    )
}
