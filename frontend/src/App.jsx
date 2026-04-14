/*import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import GetCurrentUser from "./hooks/GetCurrentUser";




export const serverUrl = "http://localhost:8000";

function App(){

GetCurrentUser();
  return (
    <Routes>

      {/* default route *}
      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default App;  *

import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
/*import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import GetCurrentUser from "./hooks/GetCurrentUser";




export const serverUrl = "http://localhost:8000";

function App(){

GetCurrentUser();
  return (
    <Routes>

      {/* default route *}
      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default App;  */

/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav"; // ✅ ADD THIS
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation(); // ✅ for smart nav
  useGetCity()
  useGetMyShop()

  // ❌ hide navbar on auth pages
  const hideNavRoutes = ["/signin", "/signup", "/forgot-password", "/create-edit-shop"];
  return (
    <>
      <GetCurrentUser />
      

      
      {!hideNavRoutes.includes(location.pathname) && <Nav />}

      <Routes>
        
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" /> : <Navigate to="/signin" />
          }
        />

        
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/home" />}
        />

        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/home" />}
        />

        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/home" />}
        />

        
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to="/signin" />}
        />
        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to="/signin" />}
        />
        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to="/signin" />}
        />
      </Routes>
      
    </>
  );
}

export default App;*/


/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemsByCity();
  // hide navbar on auth pages
  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart"
  ];

  return (
    <>
      <GetCurrentUser />

      
      {!hideNavRoutes.includes(location.pathname) && userData && <Nav />}

      <Routes>
        
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" /> : <Navigate to="/signin" />
          }
        />

        
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/home" />}
        />

        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/home" />}
        />

        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/home" />}
        />

       
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/signin" />}
        />

        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to="/signin" />}
        />

        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to="/signin" />}
        />

        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to="/signin" />}
        />

        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to="/signin" />}
        />

        <Route
          path="/checkout"
          element={userData ? <CheckOut /> : <Navigate to="/signin" />}
        />

        
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;*/

/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ API HOOKS
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemsByCity();

  // ✅ HIDE NAVBAR ON THESE ROUTES
  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart"
  ];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      
      <GetCurrentUser />

      
      {!shouldHideNav && userData && <Nav />}

      <Routes>
        
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
          }
        />

        
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/home" replace />}
        />

        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/home" replace />}
        />

        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/home" replace />}
        />

        
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/checkout"
          element={userData ? <CheckOut /> : <Navigate to="/signin" replace />}
        />

        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
*/

/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import MyOrders from "./pages/MyOrders.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ API HOOKS
  
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemsByCity();
  
  // ✅ FIXED: Added /checkout
  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart",
    "/checkout" ,
    "/order-placed",
    "/my-orders"
  ];

  // ✅ FIXED: safer condition
  const shouldHideNav = hideNavRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      
      <GetCurrentUser />

      
      {!shouldHideNav && userData && <Nav />}

      <Routes>
        
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
          }
        />

        
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/home" replace />}
        />

        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to="/home" replace />}
        />

        <Route
          path="/forgot-password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/home" replace />}
        />

        
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/create-edit-shop"
          element={userData ? <CreateEditShop /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/add-item"
          element={userData ? <AddItem /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/edit-item/:itemId"
          element={userData ? <EditItem /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/cart"
          element={userData ? <CartPage /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/checkout"
          element={userData ? <CheckOut /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/order-placed"
          element={userData ? <OrderPlaced /> : <Navigate to="/signin" replace />}
        />

        <Route
          path="/my-orders"
          element={userData ? <MyOrders /> : <Navigate to="/signin" replace />}
        />

        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;*/

/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import useUpdateLocation from "./hooks/useUpdateLocation.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ FIXED HOOK USAGE
  useUpdateLocation();
  useGetCity(userData);
  useGetMyShop(userData);
  useGetShopByCity(userData);
  useGetItemsByCity(userData);

  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart",
    "/checkout",
    "/order-placed",
    "/my-orders"
  ];

  const shouldHideNav = hideNavRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <GetCurrentUser />

      {!shouldHideNav && userData && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
          }
        />

        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/home" replace />} />

        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/home" replace />} />

        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/home" replace />} />

        <Route path="/home" element={userData ? <Home /> : <Navigate to="/signin" replace />} />

        <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to="/signin" replace />} />

        <Route path="/add-item" element={userData ? <AddItem /> : <Navigate to="/signin" replace />} />

        <Route path="/edit-item/:itemId" element={userData ? <EditItem /> : <Navigate to="/signin" replace />} />

        <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" replace />} />

        <Route path="/checkout" element={userData ? <CheckOut /> : <Navigate to="/signin" replace />} />

        <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/signin" replace />} />

        <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/signin" replace />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;*/

/*
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import useUpdateLocation from "./hooks/useUpdateLocation.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ RUN THIS FIRST
  GetCurrentUser();

  // ✅ RUN HOOKS ONLY IF USER EXISTS
  if (userData) {
    useUpdateLocation();
    useGetCity(userData);
    useGetMyShop(userData);
    useGetShopByCity(userData);
    useGetItemsByCity(userData);
  }

  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart",
    "/checkout",
    "/order-placed",
    "/my-orders"
  ];

  const shouldHideNav = hideNavRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNav && userData && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
          }
        />

        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/home" replace />} />

        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/home" replace />} />

        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/home" replace />} />

        <Route path="/home" element={userData ? <Home /> : <Navigate to="/signin" replace />} />

        <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to="/signin" replace />} />

        <Route path="/add-item" element={userData ? <AddItem /> : <Navigate to="/signin" replace />} />

        <Route path="/edit-item/:itemId" element={userData ? <EditItem /> : <Navigate to="/signin" replace />} />

        <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" replace />} />

        <Route path="/checkout" element={userData ? <CheckOut /> : <Navigate to="/signin" replace />} />

        <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/signin" replace />} />

        <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/signin" replace />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
*/


import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Homee.jsx";
import GetCurrentUser from "./hooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Nav from "./components/Nav";
import useGetCity from "./hooks/useGetCity.jsx";
import useGetMyShop from "./hooks/useGetMyShop.jsx";
import CreateEditShop from "./pages/CreateEditShop.jsx";
import AddItem from "./pages/AddItem.jsx";
import EditItem from "./pages/EditItem.jsx";
import useGetShopByCity from "./hooks/useGetShopByCity.jsx";
import useGetItemsByCity from "./hooks/useGetItemsByCity.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import useUpdateLocation from "./hooks/useUpdateLocation.jsx";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";

export const serverUrl = "http://localhost:8000";

function App() {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();

  // ✅ ALWAYS CALL HOOKS
  GetCurrentUser();
  useUpdateLocation();
  useGetCity(userData);
  useGetMyShop(userData);
  useGetShopByCity(userData);
  useGetItemsByCity(userData);

  const hideNavRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/create-edit-shop",
    "/cart",
    "/checkout",
    "/order-placed",
    "/my-orders",
    "/track-order"
  ];

  const shouldHideNav = hideNavRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideNav && userData && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            userData ? <Navigate to="/home" replace /> : <Navigate to="/signin" replace />
          }
        />

        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/home" replace />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/home" replace />} />
        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/home" replace />} />
        <Route path="/home" element={userData ? <Home /> : <Navigate to="/signin" replace />} />
        <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to="/signin" replace />} />
        <Route path="/add-item" element={userData ? <AddItem /> : <Navigate to="/signin" replace />} />
        <Route path="/edit-item/:itemId" element={userData ? <EditItem /> : <Navigate to="/signin" replace />} />
        <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" replace />} />
        <Route path="/checkout" element={userData ? <CheckOut /> : <Navigate to="/signin" replace />} />
        <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/signin" replace />} />
        <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/signin" replace />} />
        <Route path="/track-order/:orderId" element={userData ? <TrackOrderPage /> : <Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;