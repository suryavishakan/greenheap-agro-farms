import { useState, useEffect } from "react";
// firebase
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";

export const useCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let docRef = collection(db, c);
    const unSub = onSnapshot(docRef, (snapshot) => {
      const getData = async () => {
        try {
          // get a reference
          const docRef = collection(db, "clients");

          // create a query
          const q = query(docRef, orderBy("timeStamp", "desc"), limit(10));

          // execute query
          const docSnap = await getDocs(q);

          const clients = [];

          docSnap.forEach((doc) => {
            return clients.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setDocuments(clients);
          setLoading(false);
          console.log(clients.data());
        } catch (err) {
          console.log("error fetching data");
        }
      };
      getData();
    });
    return () => unSub();
  }, [c]);

  return { documents, loading };
};
