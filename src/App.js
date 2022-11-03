import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Singin from "./components/Singin";
import Singup from "./components/Singup";
import HomeJob from "./components/HomeJob";
import ManageJob from "./components/ManageJob";
import ManageAcout from "./components/ManageAcout";
import JobApplication from "./components/JobApplication";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/homejob" element={<HomeJob />} />
        <Route path="/managejop" element={<ManageJob />} />
        <Route path="/manageacout" element={<ManageAcout />} />
        <Route path="/jobApplication" element={<JobApplication />} />
      </Routes>
    </>
  );
}

export default App;
