import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/HomePage";
import NewMovie from "./Pages/NewMovie";
import EditMovie from "./Pages/EditMovie";
import MovieDetail from "./Pages/MovieDetail";
// import 'bootstrap/dist/css/bootstrap.min.css';/

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {index: true, element: <HomePage />},
        {path: '/new', element: <NewMovie />},
        {path: '/edit', element: <EditMovie />},
        {path: '/detail', element: <MovieDetail />}
      ],
    }
  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
