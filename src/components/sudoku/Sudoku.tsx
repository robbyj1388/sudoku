import { Box, Button, CircularProgress } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SudokuNumber } from "./SudokuNumber";
import Grid from "@mui/material/Grid2";

export const Sudoku = () => {
  const [puzzleGuess, setPuzzleGuess] = useState<number[][]>([]);
  const [originalPuzzle, setOriginalPuzzle] = useState<Array<number>[] | null>(
    null
  );
  const [solution, setSolution] = useState([[0]]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [playerFeedbackHeader, setPlayerFeedbackHeader] =
    useState("Congratulations!");
  const [playerFeedbackText, setPlayerFeedbackText] = useState(
    "You solved the Sudoku puzzle correctly!"
  );
  const [loadingPuzzle, setLoadingPuzzle] = useState(true);
  // Fetch puzzle from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sudoku-api.vercel.app/api/dosuku"
        );
        const puzzle = await response.json();
        // (below) Cheater line (change value to solution)
        setPuzzleGuess(puzzle.newboard.grids[0].value);
        setOriginalPuzzle(puzzle.newboard.grids[0].value);
        setSolution(puzzle.newboard.grids[0].solution);
        setLoadingPuzzle(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Check if the puzzle is solved if solved open dialog
  function checkIfSolved() {
    for (let x = 0; x < 9; x++) {
      for (let x = 0; x < 9; x++) {
        if (puzzleGuess[x][x] !== solution[x][x]) {
          setPlayerFeedbackHeader("Sorry \u{1F614}"); // Pentive face emoji hex
          setPlayerFeedbackText("Your guess is incorrect!");
          setShowFeedback(true);
          return;
        }
      }
    }
    setPlayerFeedbackHeader("Congratulations! \u{1F60E}"); // Cool guy emoji hex
    setPlayerFeedbackText("You solved the Sudoku puzzle correctly!");
    setShowFeedback(true);
  }

  return (
    <>
      <Box
        position="relative"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="auto"
        padding="25px"
        borderRadius="15px"
        width="50%"
        boxShadow="0px 0px 15px #787878"
        sx={{
          backgroundColor: "secondary.light",
        }}
      >
        {/* Entire 9x9 grid filled with cells */}
        <Grid container columns={9} spacing={0} sx={{ gap: 0 }}>
          {loadingPuzzle && (
            <Grid size={12}>
              <CircularProgress />
            </Grid>
          )}
          {!loadingPuzzle &&
            originalPuzzle &&
            // loop through and map out chracters to cells
            originalPuzzle.map((row, x) => {
              return row.map((value, y) => {
                const originalValue = value;
                const currentValue = puzzleGuess[x][y];
                return (
                  <Grid
                    size={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SudokuNumber
                      value={currentValue}
                      coords={{ x: x, y: y }}
                      isDisabled={originalValue !== 0}
                      onChange={(newValue) => {
                        // Set puzzleGuess array to new puzzleGuess
                        setPuzzleGuess((prev) => {
                          let copy = prev.map((row) => [...row]); // Deep copy
                          if (originalValue === 0) {
                            copy[x][y] = newValue;
                          }
                          return copy;
                        });
                      }}
                    />
                  </Grid>
                );
              });
            })}
        </Grid>
        {/* Submit button */}
        <Button
          type="button"
          variant="contained"
          sx={{ marginTop: 1 }}
          onClick={() => checkIfSolved()}
        >
          Submit
        </Button>
        {/* Display player feedback on puzzle guess */}
        <Dialog
          open={showFeedback}
          keepMounted
          onClose={() => {
            setShowFeedback(false);
          }}
          disablePortal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
          }}
        >
          <DialogTitle>{playerFeedbackHeader}</DialogTitle>
          <DialogContent>
            <Typography textAlign="center">{playerFeedbackText}</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                setShowFeedback(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
