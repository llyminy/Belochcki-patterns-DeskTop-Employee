import { Routes, Route,  Navigate } from "react-router-dom";
import  MainLayout  from "../shared/ui/layout/mainLayout.tsx";


import { MainPage } from "../pages/mainPage/mainPage.tsx";
import { ProfilePage } from "../pages/profilePage/ProfilePage.tsx";
import { AccountsPage } from "../pages/accountsPage/accountsPage.tsx";
import { DebitAccountPage } from "../pages/debitAccountPage/debitAccountPage.tsx";
import { CreditAccountPage } from "../pages/creditAccountPage/creditAccountPage.tsx";

import { AbountUsPage } from "../pages/abountUsPage/abountUsPage.tsx";
import { Error500Page } from "../pages/error500/error500.tsx";
import  CreditTariffPage from "../pages/CreditTariffPage/CreditTariffPage.tsx";
import  CreditTariffDetailPage from "../pages/CreditTariffPage/CreditTariffDetailPage.tsx";
import  CreditPage from "../pages/CreditPage/CreditsPage.tsx";
import  CreditDetailPage from "../pages/CreditPage/CreditDetailsPage.tsx";

import  UserPage from "../pages/ManagementPage/ManagementPage.tsx";
import  UserDetailsPage from "../pages/ManagementPage/UserDetailPage.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
 
      <Route element={<MainLayout />}>
        <Route path="*" element={<h1>Страница не найдена</h1>} />
        <Route path="/error-500" element={<Error500Page />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/debitaccount/:accountId" element={<DebitAccountPage />} />
        <Route path="/creditaccount/:accountId" element={<CreditAccountPage />} />
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/credit/:id" element={<CreditDetailPage />} />
        <Route path="/abountUs" element={<AbountUsPage />} />
        <Route path="/credit-tariffs" element={<CreditTariffPage />} />
        <Route path="/credit-tariffs/:id" element={<CreditTariffDetailPage />} />

        <Route path="/user/:type/:id" element={<UserDetailsPage />} />
        <Route path="/users" element={<UserPage />} />
      </Route>
    </Routes>
  );
};






