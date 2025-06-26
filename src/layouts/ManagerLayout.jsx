import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function ManagerLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header/>
      <main style={{ flex: "1"}}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}