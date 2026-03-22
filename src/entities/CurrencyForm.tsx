import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import type { CreateCurrencyRequest } from "../types/Currency";

interface Props {
  onSubmit: (data: CreateCurrencyRequest) => void;
  onCancel: () => void;
}

export default function CurrencyForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CreateCurrencyRequest>({
    code: "",
    name: "",
    symbol: "",
  });

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Code"
        value={form.code}
        onChange={(e) =>
          setForm({ ...form, code: e.target.value.toUpperCase() })
        }
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Symbol"
        value={form.symbol}
        onChange={(e) =>
          setForm({ ...form, symbol: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>
          Create
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}