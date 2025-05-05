import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={["Inception", "Interstellar", "Tenet"]} // Example options
      sx={{ width: 300 }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "black", // Dropdown background color
            color: "white", // Dropdown text color
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Food"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white", // Input text color
              "& fieldset": {
                borderColor: "transparent",
                marginTop: "8px",
                height: "45px",
                width: "95%",
              }, // Border color
              "&:hover fieldset": { borderColor: "transparent" },
              "&.Mui-focused fieldset": { borderColor: "transparent" },
            },
          }}
        />
      )}
    />
  );
}
