import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { SudokuPage } from "./components/sudoku/SudokuPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <SudokuPage/>,
      },
      {
        path: "/sudoku",
        element: <SudokuPage/>,
      }
    ],
  },
]);

export { router };
