import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JediMaster from "./components/JediMaster";
import CreateLightSaber from "./components/CreateLightSaber";
import DisplayOrders from "./components/DisplayOrders";
import Padawan from "./components/Padawan";

function App() {
  return (
    <>
      <Header
        title="The Light Saber Shop"
        jediLogin="JediMaster Login"
        padawanLogin="Padawan Login"
      />
      <Routes>
        <Route path="/JediMaster" element={<JediMaster />} />
        <Route
          path="/JediMaster/create-lightsaber"
          element={<CreateLightSaber />}
        />
        <Route path="/JediMaster/display-orders" element={<DisplayOrders />} />
        <Route path="/Padawan" element={<Padawan />} />
      </Routes>
    </>
  );
}

export default App;
