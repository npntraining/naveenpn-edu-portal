import { useEffect, useState } from "react";
import GetUserDoc from "@/hooks/getUserDoc";
import { getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { coursesList } from "@/data/global_config";
import { Button } from "@/components/ui/button";
import {  FaFileDownload } from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const { docRef } = GetUserDoc();
  const [notes, setNotes] = useState("");
  const [downLoadLink, setDownloadLink] = useState("");

  const courseCode = localStorage.getItem("courseCode");
  const { expiryDate } = coursesList[courseCode];
  const { header } = coursesList[courseCode]?.globalTitles || {};

  useEffect(() => {
    const fetchUserDoc = async () => {
      try {
        if (docRef) {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setNotes(docSnap.data().myNotes || "");
            setDownloadLink(docSnap.data().certificateLink || "");
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

  const handleSubmit = async () => {
    try {
      if (docRef) {
        await updateDoc(docRef, {
          myNotes: notes,
        });
        setNotes("");
      } else {
        console.error("No document reference found.");
      }
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="w-full mx-auto h-full p-3 md:p-5 xl:px-10 xl:py-7">
      <h1 className=" font-medium text-xl lg:text-3xl text-secondary">
        Your Profile
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-4 lg:mt-8 place-items-start">
        <div className="flex flex-col gap-5 justify-center w-full">
          <h1 className="text-xl lg:text-3xl font-semibold">
            Personal Information
          </h1>
          <div className="flex items-center gap-3 w-full">
            <div className="flex flex-col justify-center gap-5 w-full md:w-[70%]">
              <p className="text-start text-base lg:text-xl flex w-full">
                User Name :
                <span className="font-bold ml-2">{user?.displayName}</span>
              </p>
              <p className="text-start text-base lg:text-xl flex w-full">
                Email :<span className="font-bold ml-2">{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center w-full">
          <h1 className="text-xl lg:text-3xl font-semibold">
            Course Information
          </h1>
          <div className="flex items-start gap-3 w-full">
            <div className="flex flex-col justify-center gap-5 w-full">
              <div className="text-start text-base lg:text-xl inline-flex w-full">
                Course Name :
                <p className="font-bold ml-2">{header?.courseTitle}</p>
              </div>
              <div className="text-start text-base lg:text-xl inline-flex w-full">
                Course Expiry :<p className="font-bold ml-2">{expiryDate}</p>
              </div>
              <div className="flex justify-between items-center gap-2 w-full ">
                <div className="text-start text-base lg:text-xl w-fit">
                  Notes :
                </div>
                <div className="flex items-center justify-between gap-2 w-full flex-1">
                  <input
                    type="text"
                    placeholder="Enter notes url"
                    className="py-1.5 px-5 border-[3px] outline-secondary w-full rounded-md"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="secondary"
                    disabled={!docRef}
                    className=" text-white font-medium"
                  >
                    Save
                  </Button>
                </div>
              </div>
              <a href={downLoadLink} download className="w-fit mx-auto">
                <Button
                  onClick={handleSubmit}
                  variant="secondary"
                  className="  flex items-center gap-2 text-white text-lg py-5"
                >
                  <FaFileDownload />
                  Download Certificate
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
