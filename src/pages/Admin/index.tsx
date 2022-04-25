import React from "react";
import { Routes, Route } from 'react-router-dom';
import { adminRoute } from '@/routes/admin';
import AdminLayout from "@/layout/AdminLayout";

const AdminIndex = () => {
  // console.log(props);
  return (
    <AdminLayout>
      <div >
        <Routes>
          {adminRoute.map((item) => {
            // console.log(123456, item);
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
