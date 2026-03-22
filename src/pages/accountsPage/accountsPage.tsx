import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, Grid,Pagination,Typography,Paper,Divider,Chip,} from "@mui/material";
import type { Account, AccountsResponse } from "../../shared/api/account/accounts";
import {fetchDebitAccounts,fetchCreditAccounts,} from "../../shared/api/account/accounts";
import { AccountCard, CreditAccountCard } from "../../entities/account/accountCard";

export const AccountsPage = () => {
  const [debitAccounts, setDebitAccounts] = useState<Account[]>([]);
  const [creditAccounts, setCreditAccounts] = useState<Account[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 6;
  const navigate = useNavigate();

  const loadDebitAccounts = async () => {
    try {
      const data: AccountsResponse = await fetchDebitAccounts(page, pageSize);
      setDebitAccounts(data?.content ?? []);
      setTotalPages(data?.totalPages ?? 0);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) navigate("/login");
      else if (status === 500) navigate("/error-500");
      else console.error("Неизвестная ошибка при загрузке дебетовых счетов", err);
    }
  };

  const loadCreditAccounts = async () => {
    try {
      const data: AccountsResponse = await fetchCreditAccounts();
      setCreditAccounts(data?.content ?? []);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) navigate("/login");
      else if (status === 500) navigate("/error-500");
      else console.error("Неизвестная ошибка при загрузке кредитных счетов", err);
    }
  };

  useEffect(() => {
    loadDebitAccounts();
    loadCreditAccounts();
  }, [page]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
          Мои счета
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Просмотр дебетовых и кредитных счетов, баланса и текущего статуса.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper
            elevation={0}
            sx={(theme) => ({
              p: 3,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Дебетовые счета
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Активные счета
                </Typography>
              </Box>

              <Chip
                label={`Всего: ${debitAccounts.length}`}
                color="primary"
                variant="outlined"
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {debitAccounts.length === 0 ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Дебетовые счета не найдены
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  У вас пока нет дебетовых счетов.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {debitAccounts.map((account) => (
                  <Grid size={{ xs: 12 }} key={account.id}>
                    <AccountCard account={account} />
                  </Grid>
                ))}
              </Grid>
            )}

            {totalPages > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  page={page}
                  count={totalPages}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                  size="large"
                />
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            elevation={0}
            sx={(theme) => ({
              p: 3,
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              height: "100%",
            })}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                Кредитные счета
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Информация кредитным продуктам
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {creditAccounts.length === 0 ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Нет кредитного счёта
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Кредитные счета отсутствуют.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {creditAccounts.map((account) => (
                  <Grid size={{ xs: 12 }} key={account.id}>
                    <CreditAccountCard account={account} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};