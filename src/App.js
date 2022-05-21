import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import * as ROUTES from "./constants/routes";

import UserContext from "./context/user";

import useAuthListener from "./hooks/useAuthListener";

//dummy data
import { seedDatabase } from "./helpers/dummy-data";

//Components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NoteFound"));

export default function App() {
  const { user } = useAuthListener();
  // seedDatabase();

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={ROUTES.LOG_IN}
              element={user ? <Navigate to={ROUTES.HOME} /> : <Login />}
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={user ? <Navigate to={ROUTES.HOME} /> : <Signup />}
            />
            <Route
              path={ROUTES.HOME}
              element={user ? <Home /> : <Navigate to={ROUTES.LOG_IN} />}
            />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
