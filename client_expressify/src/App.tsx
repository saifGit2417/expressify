import { Route, Routes } from "react-router";
import SignUpPage from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Home from "./components/welcomePage/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/sigIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
