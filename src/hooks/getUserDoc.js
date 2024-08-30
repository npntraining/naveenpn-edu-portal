import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";

const GetUserDoc = () => {
  const { user } = useAuth();
  const [docRef, setdocRef] = useState(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      try {
        if (!user) return;
        const q = query(collection(db, "AuthorizedUsers"));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs.find(
          (doc) => doc.data().email === user?.email
        );

        if (userDoc) {
          setdocRef(userDoc.ref);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserDoc();
  }, [user]);

  return { docRef };
};

export default GetUserDoc;
