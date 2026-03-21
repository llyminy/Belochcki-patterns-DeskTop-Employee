import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface UserFormProps {
  type: "clients" | "employees";
  initialData?: any;
  onSubmit: (user: any) => void;
  onCancel: () => void;
}

export default function UserForm({ type, initialData, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("UNLOCKED");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLogin(initialData.login || "");
      setPassword(initialData.password || "");
      setStatus(initialData.status || "UNLOCKED");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      login,
      password,
      status,
      token: "DUMMY_TOKEN",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#fafafa",
        maxWidth: 400,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {initialData
          ? `Edit ${type === "clients" ? "Client" : "Employee"}`
          : `Create ${type === "clients" ? "Client" : "Employee"}`}
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      {initialData && (
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      )}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained">
          {initialData ? "Save" : "Create"}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}