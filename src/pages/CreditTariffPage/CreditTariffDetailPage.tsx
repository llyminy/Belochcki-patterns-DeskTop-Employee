import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { creditTariffUseCase } from "../../useCases/CreditTariffUseCase";
import type { CreditTariff } from "../../types/CreditTariff";

export default function CreditTariffDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [tariff, setTariff] = useState<CreditTariff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError("Invalid ID");
        setLoading(false);
        return;
      }

      try {
        const data = await creditTariffUseCase.getById(id);
        setTariff(data);
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!tariff) return <Typography>No data</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Credit Tariff Details
      </Typography>

      <TextField label="ID" value={tariff.id} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Name" value={tariff.name} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Description" value={tariff.description} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Amount From" value={tariff.amountFrom} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Amount To" value={tariff.amountTo} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Interest Rate" value={tariff.interestRate} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
    </Box>
  );
}