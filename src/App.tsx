import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UserForm from "./components/UserForm";
import "./App.css";
import { ApiCaller } from "./resources/helpers";
import Test from "./components/Test";
import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserForm signIn={true} />} />
          <Route path="/signup" element={<UserForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
