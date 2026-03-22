import { Routes, Route } from "react-router-dom";
import  MainLayout  from "../shared/ui/layout/mainLayout.tsx";


import  ManagementPage from "../pages/ManagementPage/ManagementPage.tsx";
import  UserDetailsPage from "../pages/ManagementPage/UserDetailPage.tsx";
import  CreditTariffPage from "../pages/CreditTariffPage/CreditTariffPage.tsx";
import  CreditTariffDetailPage from "../pages/CreditTariffPage/CreditTariffDetailPage.tsx";
import { Error500Page } from "../pages/error500/error500.tsx";

export const AppRoutes = () => {
  return (
    <Routes>

      <Route element={<MainLayout />}>
      <Route path="/" element={<ManagementPage />} />
      </Route>
      <Route element={<MainLayout />}>
      <Route path="/user/:type/:id" element={<UserDetailsPage />} />
      </Route>

      <Route path="/credit-tariffs" element={<CreditTariffPage />} />
      <Route path="/credit-tariffs/:id" element={<CreditTariffDetailPage />} />
 
      <Route element={<MainLayout />}>
        <Route path="*" element={<h1>Страница не найдена</h1>} />
        <Route path="/error-500" element={<Error500Page />} />
      </Route>
    </Routes>
  );
};






