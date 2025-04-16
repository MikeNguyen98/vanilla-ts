declare global {
  type ButtonVariant =
    | "solid"
    | "outlined"
    | "dashed"
    | "filled"
    | "text"
    | "link";
}

// This line is needed to make the file a module (so TS loads it)
export {};
