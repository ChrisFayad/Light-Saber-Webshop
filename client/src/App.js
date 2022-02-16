import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainGif from "./pages/MainGif";
import JediMaster from "./pages/JediMaster";
import CreateLightSaber from "./pages/CreateLightSaber";
import DisplaySabers from "./pages/DisplaySabers";
import DisplayOrders from "./pages/DisplayOrders";
import Padawan from "./pages/Padawan";
import SaberShopping from "./pages/SaberShopping";

function App() {
  return (
    <>
      <Header
        title="The Light Saber Shop"
        jediLogin="JediMaster Login"
        padawanLogin="Padawan Login"
      />
      <Routes>
        <Route path="/" element={<MainGif />} />
        <Route path="/JediMaster" element={<JediMaster />} />
        <Route
          path="/JediMaster/create-lightsaber"
          element={<CreateLightSaber />}
        />
        <Route
          path="/JediMaster/display-lightsabers"
          element={<DisplaySabers />}
        />
        <Route path="/JediMaster/display-orders" element={<DisplayOrders />} />
        <Route path="/Padawan" element={<Padawan />} />
        <Route path="/Padawan/saber-shopping" element={<SaberShopping />} />
      </Routes>
    </>
  );
}

export default App;
