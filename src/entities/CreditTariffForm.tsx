import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import type { CreditTariff } from "../types/CreditTariff";

interface Props {
  initialData?: CreditTariff;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function CreditTariffForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    amountFrom: initialData?.amountFrom || 0,
    amountTo: initialData?.amountTo || 0,
    interestRate: initialData?.interestRate || 0,
  });

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField label="Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} fullWidth sx={{ mb: 2 }} />
      <TextField label="Amount From" type="number" value={form.amountFrom} onChange={(e) => handleChange("amountFrom", Number(e.target.value))} fullWidth sx={{ mb: 2 }} />
      <TextField label="Amount To" type="number" value={form.amountTo} onChange={(e) => handleChange("amountTo", Number(e.target.value))} fullWidth sx={{ mb: 2 }} />
      <TextField label="Interest Rate" type="number" value={form.interestRate} onChange={(e) => handleChange("interestRate", Number(e.target.value))} fullWidth sx={{ mb: 2 }} />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
}