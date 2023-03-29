import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Drawer/Drawer";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddProducts from "./pages/Add Products/AddProducts";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <BrowserRouter> */}
        <BrowserRouter basename ="/Flash">
          <Header />
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/addProducts" element={<AddProducts />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
