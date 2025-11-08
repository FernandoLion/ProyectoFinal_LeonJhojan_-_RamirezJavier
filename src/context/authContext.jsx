import { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Creamos el "Proveedor" (Provider)
// Este componente envolverá nuestra App
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // para el usuario de firebase
  const [userData, setUserData] = useState(null);       // para los datos, rol y nombre
  const [loading, setLoading] = useState(true);         // para saber si la info cargo

  useEffect(() => {
    //este metodo se ejecuta cada vez q hay cambio en login o logout
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // si usuario esta logueado
        setCurrentUser(user);
        
        // buscamos sis datos en firebase
        const userDocRef = doc(db, 'usuarios', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data()); //se guardan sus datos
        } else {
          console.error("Error: No se encontraron datos de usuario en Firestore.");
          setUserData(null);
        }
      } else {
        // si usuario no esta logueado
        setCurrentUser(null);
        setUserData(null);
      }
      // termina de carfar
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};