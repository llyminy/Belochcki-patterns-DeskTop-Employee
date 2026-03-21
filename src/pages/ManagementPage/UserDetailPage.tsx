import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { userUseCase } from "../../useCases/UserUseCase";

export default function UserDetailPage() {
  const { type, id } = useParams<{ type: "clients" | "employees"; id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!type || !id) return;
      setLoading(true);
      setError("");
      try {
        if (!localStorage.getItem("token")) throw new Error("Token not found");
        const data = await userUseCase.getUserById(type, id);
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Failed to load user");
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
        {type === "clients" ? "Client Details" : "Employee Details"}
      </Typography>
      <TextField label="ID" value={user.id} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Name" value={user.name} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Login" value={user.login} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Password" value={user.password} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
      <TextField label="Status" value={user.status} fullWidth sx={{ mb: 2 }} InputProps={{ readOnly: true }} />
    </Box>
  );
}