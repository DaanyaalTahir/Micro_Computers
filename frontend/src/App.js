import "./App.css";
import { useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Components
import GlobalNav from "./components/GlobalNav";

//Pages
import Home from "./pages/Home";
import ListingPage from "./pages/ListingPage";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <GlobalNav />
              <Home />
            </div>
          }
        />

        <Route
          path="/product/:id"
          element={
            <div>
              <GlobalNav />
              <ListingPage />
            </div>
          }
        />

        <Route
          path="/search/:searchQuery"
          element={
            <div>
              <GlobalNav />
              <SearchResults />
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div>
              <Checkout />
            </div>
          }
        />
        <Route
          path="/orderHistory"
          element={
            <div>
              <GlobalNav />
              <OrderHistory />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
