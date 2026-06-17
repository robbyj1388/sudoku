import { TextField } from "@mui/material";

type SudokuNumberProps = {
  value: number;
  coords: { x: number; y: number };
  isDisabled: boolean;
  onChange: (value: number) => void;
};

export const SudokuNumber = ({
  value,
  coords,
  onChange,
  isDisabled,
}: SudokuNumberProps) => {
  /*
   * Style borders based on indices
   * @return borderStyle - an object of css styles
   */
  function styleBorders() {
    const innerColor = "primary.light";
    const outerColor = "primary.dark";
    let borderStyle = {
      borderTop: 2,
      borderBottom: 2,
      borderLeft: 2,
      borderRight: 2,
      borderTopColor: innerColor,
      borderBottomColor: innerColor,
      borderLeftColor: innerColor,
      borderRightColor: innerColor,
      color: "black",
    };
    if (!isDisabled) {
      // Change user input color
      borderStyle.color = "red";
    }
    if ([0, 3, 6].includes(coords.x)) {
      // Top borders
      borderStyle.borderTop = 6;
      borderStyle.borderTopColor = outerColor;
    }
    if ([0, 3, 6].includes(coords.y)) {
      // Left borders
      borderStyle.borderLeft = 6;
      borderStyle.borderLeftColor = outerColor;
    }
    if ([2, 5].includes(coords.y)) {
      // Left borders on the right side
      borderStyle.borderRight = 3;
      borderStyle.borderRightColor = outerColor;
    }
    if ([2, 5].includes(coords.x)) {
      // Outer horizontal border top side
      borderStyle.borderBottom = 3;
      borderStyle.borderBottomColor = outerColor;
    }
    if ([8].includes(coords.y)) {
      // Right border
      borderStyle.borderRight = 6;
      borderStyle.borderRightColor = outerColor;
    }
    if ([8].includes(coords.x)) {
      // Bottom border
      borderStyle.borderBottom = 6;
      borderStyle.borderBottomColor = outerColor;
    }
    return borderStyle;
  }

  return (
    <TextField
      type="number"
      variant="outlined"
      sx={() => {
        return {
          ...styleBorders(),
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "primary.main",
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            "& .MuiOutlinedInput-notchedOutline": {},
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "yellow",
            },
          },
          "& .MuiInputBase-root.Mui-disabled": {
            "& > fieldset": {
              borderColor: "transparent",
            },
          },
        };
      }}
      onChange={(event) => {
        const inputValue = event.target.value;
        // Handle empty input
        if (inputValue === "") {
          return;
        }
        const parsedValue = parseInt(inputValue);
        // Invalid input (NaN)
        if (isNaN(parsedValue)) {
          return;
        }
        // Set min and max to 1-9
        const finalValue = Math.max(1, Math.min(9, parsedValue));
        onChange(finalValue);
      }}
      value={value === 0 ? "" : value}
      disabled={isDisabled}
      slotProps={{
        input: {
          inputProps: {
            min: 1,
            max: 9,
            style: { textAlign: "center" },
          },
        },
      }}
    />
  );
};
