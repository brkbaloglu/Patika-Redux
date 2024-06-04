import "./App.css";
import Contacts from "./components/Contacts";
import Edit from "./components/Contacts/Edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Contacts />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
