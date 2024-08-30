import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        try {
          const q = collection(db, "AuthorizedUsers");
          const querySnapshot = await getDocs(q);
          let isAuthorized = false;
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data?.email === currentUser.email && data?.isAdmin) {
              isAuthorized = true;
            }
          });
          localStorage.setItem("isAdmin", isAuthorized);
          setIsAdmin(isAuthorized);
        } catch (error) {
          console.error("Error checking user status : ", error);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isAdmin");
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    setIsAdmin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
