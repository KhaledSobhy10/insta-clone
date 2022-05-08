// ====Libraries================================
import ReactDOM from "react-dom";

// ====Styles====================================
import "./index.css";

// ====Components================================
import App from "./App";

// ====Assets===================================
import { seedDatabase } from "./helpers/dummy-data";
import FirebaseContext from "./context/firebase";
import app from "./lib/firebase";

// ====Code=====================================

// seedDatabase();

ReactDOM.render(
  <FirebaseContext.Provider value={app}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

//==========My tests =============
