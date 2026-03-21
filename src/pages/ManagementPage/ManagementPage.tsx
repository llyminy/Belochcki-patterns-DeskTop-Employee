import { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import DataTable from "../../entities/DataTable";
import UserForm from "../../entities/UserForm";
import { userUseCase } from "../../useCases/UserUseCase";
import { useNavigate } from "react-router-dom";

export default function ManagementPage() {
  const [type, setType] = useState<"clients" | "employees">("clients");
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }

    if (localStorage.getItem("token")) {
      load();
    }
  }, [type]);

  const load = async () => {
    const res = await userUseCase.getUsers(type);
    setData(res);
  };

  const filtered = data.filter((u) =>
    u.login.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setCreating(false);
  };

  const handleCreate = () => {
    setCreating(true);
    setEditingUser(null);
  };

  const handleSubmit = async (user: any) => {
    try {
      if (creating) {
        await userUseCase.createUser(type, user);
      } else {
        await userUseCase.updateUser(type, user.id, user);
      }
      setEditingUser(null);
      setCreating(false);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRowClick = (user: any) => {
    navigate(`/user/${type}/${user.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Management</Typography>

      <Box sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
        <TextField
          select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <MenuItem value="clients">Clients</MenuItem>
          <MenuItem value="employees">Employees</MenuItem>
        </TextField>

        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained" onClick={handleCreate}>
          {type === "clients" ? "Create Client" : "Create Employee"}
        </Button>
      </Box>

      {creating || editingUser ? (
        <UserForm
          type={type}
          initialData={editingUser || undefined}
          onCancel={() => {
            setCreating(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmit}
        />
      ) : null}

      <DataTable
        data={filtered}
        onDelete={(id: string) => userUseCase.deleteUser(type, id).then(load)}
        onLock={(user: any) =>
          userUseCase.toggleLock(type, user.id, user.status).then(load)
        }
        onEdit={handleEdit}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}