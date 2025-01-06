import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { provider } from './authConfig';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      console.log(result);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      // const user = result.user;
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmailAndPassword = async (username:string, email:string, password:string, confirmPassword:string) => {
    setLoading(true);
    if(!verifyPassword(password, confirmPassword)) {
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile (user, { displayName: username });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const verifyPassword = (password: string, confirmPassword: string) => {
    if(password !== confirmPassword) {
      setError('As senhas não coincidem, tente novamente');
      return false;
    }
    return true;
  }

  return { loginWithEmailAndPassword, loginWithGoogle, registerWithEmailAndPassword, error, loading };
};