import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../entities/DataTable";
import { creditUseCase } from "../../useCases/CreditUseCase";
import { useNavigate } from "react-router-dom";
import type { ClientCredit } from "../../types/Credit";

export default function CreditsPage() {
  const [data, setData] = useState<ClientCredit[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    creditUseCase.getCredits().then(setData);
  }, []);

  const columns = [
    { field: "id", label: "ID" },
    { field: "clientId", label: "Client" },
    { field: "creditAmount", label: "Amount" },
    { field: "debtAmount", label: "Debt" },
    { field: "creditStatus", label: "Status" },
    { field: "creditTariffId", label: "CreditTariffId" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Credits</Typography>

      <DataTable
        data={data}
        columns={columns}
        onRowClick={(row) => navigate(`/credit/${row.id}`)}
      />
    </Box>
  );
}