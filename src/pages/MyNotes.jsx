import { useEffect, useState } from "react";
import { getDoc } from "firebase/firestore";
import GetUserDoc from "@/hooks/getUserDoc";
import Fallback from "@/components/Fallback";

const MyNotes = () => {
  const { docRef } = GetUserDoc();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchUserDoc = async () => {
      try {
        if (docRef) {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNotes(docSnap.data().myNotes || "");
          } else {
            console.error("Document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      }
    };

    fetchUserDoc();
  }, [docRef]);

  return (
    <div className="w-full h-full overflow-y-auto p-3 md:p-2">
      {notes ? (
        <iframe
          src={notes}
          title="My Notes"
          className="h-full w-full overflow-y-scroll rounded-md pointer-events-auto"
        />
      ) : (
        <Fallback message="No Notes Found" styles="text-red-500"/>
      )}
    </div>
  );
};

export default MyNotes;
