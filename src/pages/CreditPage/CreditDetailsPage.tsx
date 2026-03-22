import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { creditUseCase } from "../../useCases/CreditUseCase";
import DataTable from "../../entities/DataTable";
import type { ClientCredit, CreditOperation } from "../../types/Credit";

export default function CreditDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [credit, setCredit] = useState<ClientCredit | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [operations, setOperations] = useState<CreditOperation[]>([]);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const creditData = await creditUseCase.getById(id);
      setCredit(creditData);

      const ratingData = await creditUseCase.getCreditRating(creditData.clientId);
      setRating(ratingData);

      const ops = await creditUseCase.getOperations(id);
      setOperations(ops);
    };

    load();
  }, [id]);

  if (!credit) return <Typography>Loading...</Typography>;

  const operationColumns = [
    { field: "operationType", label: "Type" },
    { field: "amount", label: "Amount" },
    { field: "date", label: "Date" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Credit Details
      </Typography>

      <Box sx={{ maxWidth: 400 }}>
        <TextField label="ID" value={credit.id} fullWidth sx={{ mb: 2 }} />
        <TextField label="Client ID" value={credit.clientId} fullWidth sx={{ mb: 2 }} />
        <TextField label="Amount" value={credit.creditAmount} fullWidth sx={{ mb: 2 }} />
        <TextField label="Debt" value={credit.debtAmount} fullWidth sx={{ mb: 2 }} />
        <TextField label="Status" value={credit.creditStatus} fullWidth sx={{ mb: 2 }} />
        <TextField label="CreditTariffId" value={credit.creditTariffId} fullWidth sx={{ mb: 2 }} />
        <TextField label="IssueDate" value={credit.issueDate} fullWidth sx={{ mb: 2 }} />
        <TextField label="IssueTime" value={credit.issueTime} fullWidth sx={{ mb: 2 }} />
        <TextField label="LastPaymentDate" value={credit.lastPaymentDate} fullWidth sx={{ mb: 2 }} />
        <TextField label="Credit Rating" value={rating ?? ""} fullWidth sx={{ mb: 2 }} />
      </Box>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Operations History
      </Typography>

      <DataTable
        data={operations}
        columns={operationColumns}
      />
    </Box>
  );
}