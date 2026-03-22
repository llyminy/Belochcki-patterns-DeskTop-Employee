import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DataTable from "../../entities/DataTable";
import CreditTariffForm from "../../entities/creditTariff/CreditTariffForm";
import { creditTariffUseCase } from "../../useCases/CreditTariffUseCase";
import { useNavigate } from "react-router-dom";


export default function CreditTariffPage() {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    const res = await creditTariffUseCase.getTariffs();
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (tariff: any) => {
    if (creating) await creditTariffUseCase.create(tariff);
    else await creditTariffUseCase.update(editing.id, tariff);

    setEditing(null);
    setCreating(false);
    load();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Credit Tariffs</Typography>

      <Button variant="contained" sx={{ my: 2 }} onClick={() => setCreating(true)}>
        Create Tariff
      </Button>

      {(creating || editing) && (
        <CreditTariffForm
          initialData={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      <DataTable
        data={data}
        columns={[
            { field: "name", label: "Name" },
            { field: "description", label: "Description" },
            { field: "amountFrom", label: "From" },
            { field: "amountTo", label: "To" },
            { field: "interestRate", label: "Rate %" },
        ]}
        onEdit={(row) => setEditing(row)}
        onDelete={(id) => creditTariffUseCase.delete(id).then(load)}
        onRowClick={(row) =>
            navigate(`/credit-tariffs/${row.id}`)
        }
      />
    </Box>
  );
}