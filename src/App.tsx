import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./components/Test";
import "./App.css";
import { ApiCaller } from "./resources/helpers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
