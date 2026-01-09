import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./Views/Admin/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
