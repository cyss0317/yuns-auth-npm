import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./components/Test";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
