import { BrowserRouter, Route, Switch } from "react-router-dom";
import Test from "./components/Test";
import "./App.css";
import { ApiCaller } from "./resources/helpers";

declare global {
  interface Window {
    caller: any;
  }
}
function App() {
  window.caller = ApiCaller;
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
