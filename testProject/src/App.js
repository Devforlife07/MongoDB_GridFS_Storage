import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import setAuthToken from "./util/setAuthToken";
import AuthState from "./context/auth/AuthState";
import AddEmployee from "./components/addemployee";
import EmployeeDetails from "./components/employeedetails";
import BulkUpload from "./components/bulkUpload";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}
function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/addEmployee" component={AddEmployee} />
            <Route exact path="/bulkupload" component={BulkUpload} />
            <Route exact path="/:id" component={EmployeeDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
