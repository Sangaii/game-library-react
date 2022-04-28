import React from "react";
import { Routes, Route } from 'react-router-dom';
import { adminRoute } from '@/routes/admin';
import AdminLayout from "@/layout/AdminLayout";

const AdminIndex = () => {
  return (
    <AdminLayout>
      <div >
        <Routes>
          {adminRoute.map((item) => {
            return (
              <Route
                element={<item.component />}
                key={item.key}
                path={item.path}
              />
            );
          })}
        </Routes>
      </div>
    </AdminLayout>
  );
};

export default AdminIndex;
