import { useEffect, useState, createContext } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const Context = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode
}

export function AuthContext({ children }: Props) {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioLogado) => {
      setLoading(false);
      if (usuarioLogado) {
        setUser(usuarioLogado)
      } else {
        setUser(null);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [])

  const values: AuthContextType = {
    user: user,
    setUser: setUser
  }

  return <Context.Provider value={values}>
    {!loading && children}
  </Context.Provider>
}