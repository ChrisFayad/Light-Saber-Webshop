import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainGif from "./routes/MainGif";
import JediMaster from "./routes/JediMaster";
import CreateLightSaber from "./routes/CreateLightSaber";
import DisplaySabers from "./routes/DisplaySabers";
import DisplayOrders from "./routes/DisplayOrders";
import Padawan from "./routes/Padawan";
import SaberShopping from "./routes/SaberShopping";

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
