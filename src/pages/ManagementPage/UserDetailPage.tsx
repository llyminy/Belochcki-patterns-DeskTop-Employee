import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { userUseCase } from "../../useCases/UserUseCase";
import type { User } from "../../types/User";

export default function UserDetailPage() {
  const { type, id } = useParams<{
    type: "clients" | "employees";
    id: string;
  }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!type || !id) {
        setError("Invalid params");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await userUseCase.getUserById(type, id);
        setUser(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [type, id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>No user data</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {type === "clients" ? "Детали клиента" : "Делати сотрудника"}
      </Typography>

      <TextField label="ID" value={user.id} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Имя" value={user.name} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Логин" value={user.login} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Статус" value={user.status} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
    </Box>
  );
}