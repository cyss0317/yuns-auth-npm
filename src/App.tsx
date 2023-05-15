import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import "./App.css";
import { ApiCaller } from "./resources/helpers";
import Test from "./components/Test";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserForm formType="signIn" />} />
          <Route path="/signup" element={<UserForm formType="signUp" />} />
          {/* <Route path="/logged_in" element={<UserForm formType="loggedIn"/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
