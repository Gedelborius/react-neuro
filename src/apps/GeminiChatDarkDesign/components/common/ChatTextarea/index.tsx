import styled from "styled-components";

export const ChatTextarea = styled.textarea({
  overflow: "hidden",
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
  margin: 0,
  padding: 0,
  minHeight: "60px",
  backgroundColor: "transparent",
  color: "white",
  "&::placeholder": {
    color: "white",
  },
});
