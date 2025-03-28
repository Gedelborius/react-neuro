import { Button, CircularProgress, Paper, TextField } from "@mui/material";

interface ITextInputFormProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  input: string;
  loading: boolean;
  setInput: (value: string) => void;
}

export const TextInputForm = ({ handleSubmit, input, loading, setInput }: ITextInputFormProps) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.ctrlKey && (e.key === "Enter" || e.metaKey)) {
            e.preventDefault();
            handleSubmit(e);
          }
          if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
          }
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
          label="Enter your question"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{ mb: 2 }}
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.ctrlKey && !e.metaKey) {
              e.preventDefault();
            }
          }}
        />

        <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : null}>
          {loading ? "Processing..." : "Ask Gemini"}
        </Button>
      </form>
    </Paper>
  );
};
