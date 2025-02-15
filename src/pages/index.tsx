import { Route, Routes } from "react-router-dom";
import { FC } from "react";
import MerchantsPage from "@/pages/MerchantsPage.tsx";
import MerchantPage from "@/pages/MerchantPage.tsx";
import MerchantDetailsPage from "@/pages/MerchantDetailsPage.tsx";
import OffersPage from "@/pages/OffersPage.tsx";
const Pages: FC = () => {
  return (
    <Routes>
        <Route path="/" element={<MerchantDetailsPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
      <Route path="/merchants/:id" element={<MerchantPage />} />
      <Route path="/offers" element={<OffersPage />} />
    </Routes>
  );
};

export default Pages;
