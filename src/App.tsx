import "./App.css";
import { Suspense, useEffect } from "react";
import { AppLoader } from "./components/app-loader";
import { AppNavigator } from "./components/app-navigator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

function App() {
 
  return (
    <Suspense fallback={<AppLoader />}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AppNavigator />
    </Suspense>
  );
}
//hii

export default App;
