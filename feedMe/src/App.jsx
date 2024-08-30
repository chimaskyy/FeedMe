import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import Header from "./component/Header";
import RecipeList from "./component/pages/RecipeList";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>
  );
}

export default App;