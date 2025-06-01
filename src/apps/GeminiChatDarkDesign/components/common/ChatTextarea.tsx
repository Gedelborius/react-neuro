import styled from "styled-components";

// import { styled } from "@mui/material";

const breakpoints = {
  xs: "@media (min-width: 0px)",
  sm: "@media (min-width: 600px)",
  md: "@media (min-width: 900px)",
  lg: "@media (min-width: 1200px)",
  xl: "@media (min-width: 1536px)",
};

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export const ChatTextarea = styled.textarea<{
  $backgroundColor?: string;
  $color?: string;
  $placeholderColor?: string;
  $borderRadius?: number;
  $padding?: number;
  $minHeight?: number;
}>(({ $backgroundColor, $color, $placeholderColor, $borderRadius, $padding, $minHeight }) => ({
  backgroundColor: $backgroundColor ? $backgroundColor + "4d" : "transparent",
  color: $color ? $color : "white",
  borderRadius: $borderRadius ? `${$borderRadius}px` : 0,
  padding: $padding ? `${$padding}px` : 0,
  margin: 0,
  // minHeight: $minHeight ? `${$minHeight}px` : "60px",
  overflow: "hidden",
  overflowY: "auto",
  fontSize: "16px",
  resize: "none",
  width: "100%",
  display: "block",
  boxSizing: "border-box",
  WebkitBoxSizing: "border-box",
  MozBoxSizing: "border-box",
  outline: "none",
  outlineStyle: "none",
  border: "none",
  "&::placeholder": {
    color: $placeholderColor ? $placeholderColor : "white",
  },
  "&::-webkit-scrollbar": { width: "12px" },
  "&::-webkit-scrollbar-track": { background: "#f1f1f1", borderRadius: "8px" },
  "&::-webkit-scrollbar-thumb": { background: "#888", borderRadius: "8px" },
  "&::-webkit-scrollbar-thumb:hover": { cursor: "pointer", background: "#555" },
  [breakpoints.xs]: {
    minHeight: "180px",
  },
  [breakpoints.sm]: {
    minHeight: "140px",
  },
  [breakpoints.md]: {
    minHeight: "120px",
  },
  [breakpoints.xl]: {
    minHeight: "100px",
  },
}));
