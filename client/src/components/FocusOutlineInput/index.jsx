import Input from "@mui/joy/Input";

// eslint-disable-next-line react/prop-types
export default function FocusOutlineInput({ placeholderValue }) {
  return (
    <Input
      placeholder = {placeholderValue}
      sx={{
        "&::before": {
          display: "none",
        },
        "&:focus-within": {
          outline: "2px solid var(--Input-focusedHighlight)",
          outlineOffset: "2px",
        },
      }}
    />
  );
}
