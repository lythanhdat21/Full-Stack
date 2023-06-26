import "./App.scss";
import Header from "./components/Header/Header";
import { Outlet, Link } from "react-router-dom";
import "./App.css"

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>

      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet /> {/*lesson 49 */}
        </div>
      </div>
    </div>
  );
};
export default App;

