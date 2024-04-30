import { useEffect, useContext } from 'react';
import { Context } from '../../context/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import "./Home.css";

export function Home() {
  const context = useContext(Context);

  useEffect(() => {
    console.log("CONTEXT: ", context)
  }, [])

  return (
    <div className="container">
      <Navbar user={context?.user?.email} />
      <h1>This is my Home Page</h1>
    </div>
  )
}