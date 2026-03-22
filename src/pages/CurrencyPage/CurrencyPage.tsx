import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import DataTable from "../../entities/DataTable";
import CurrencyForm from "../../entities/CurrencyForm";
import { currencyUseCase } from "../../useCases/CurrencyUseCase";
import type { Currency } from "../../types/Currency";

export default function CurrencyPage() {
  const [data, setData] = useState<Currency[]>([]);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    const res = await currencyUseCase.getCurrencies();
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (currency: any) => {
    try {
      await currencyUseCase.createCurrency(currency);
      setCreating(false);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDeactivate = async (row: Currency) => {
    try {
      await currencyUseCase.deactivateCurrency(row.code);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const filtered = data.filter((u) =>
    Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const tableData = filtered.map((c) => ({
    ...c,
    id: c.code, 
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Currencies</Typography>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained" onClick={() => setCreating(true)}>
          Add Currency
        </Button>
      </Box>

      {creating && (
        <CurrencyForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
        />
      )}

      <DataTable
        data={tableData}
        columns={[
            { field: "code", label: "Code" },
            { field: "name", label: "Name" },
            { field: "symbol", label: "Symbol" },
            { field: "isActive", label: "Active" },
        ]}
        onLock={(row) => handleDeactivate(row)}
    />
    </Box>
  );
}