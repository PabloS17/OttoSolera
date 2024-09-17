// src/App.js (React Router v6)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css'; // Importa el archivo CSS
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar'; // Menú de administrador
import HomePage from './components/HomePage';
import CaregiverForm from './components/CaregiverForm';
import BeneficiaryForm from './components/BeneficiaryForm';
import SponsorForm from './components/SponsorForm';
import Login from './components/Login'; // Componente de Login

import AdminCaregiversList from './components/AdminCaregiversList'; // Lista de cuidadores
import AdminDashboard from './components/AdminDashboard';
import AdminDonationsList from './components/AdminDonationsList';
import AdminApprovedCaregiversList from './components/AdminApprovedCaregiversList';
import EditCaregiver from './components/EditCaregiver';
import AdminBeneficiariesList from './components/AdminBeneficiariesList';
import EditBeneficiary from './components/EditBeneficiary';

import UserProfile from './components/UserProfile';

import ProtectedRoute from './components/ProtectedRoute'; // Rutas protegidas
import axios from 'axios';

import AdminRegister from './components/AdminRegister';

const App = () => {
  // Estado para manejar el token de autenticación
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // Establecer el token en el encabezado para todas las solicitudes de Axios
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authToken]);

  // Función para cerrar sesión
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div>
        {/* Mostrar el navbar regular o el de administrador dependiendo del estado de autenticación */}
        {authToken ? <AdminNavbar logout={logout} /> : <Navbar />}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/inscripcion-cuidadores" element={<CaregiverForm />} />
          <Route path="/inscripcion-beneficiarios" element={<BeneficiaryForm />} />
          <Route path="/formulario-donadores" element={<SponsorForm />} />

          {/* Ruta de inicio de sesión */}
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />

          {/* Ruta para registrar un administrador */}
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Rutas protegidas para el administrador */}
          <Route
            path="/admin/caregivers"
            element={
              <ProtectedRoute authToken={authToken}>
                <AdminCaregiversList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute authToken={authToken}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/donations"
            element={
              <ProtectedRoute authToken={authToken}>
                <AdminDonationsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/caregivers/approved"
            element={
              <ProtectedRoute authToken={authToken}>
                <AdminApprovedCaregiversList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/caregivers/edit/:id"
            element={
              <ProtectedRoute authToken={authToken}>
                <EditCaregiver />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/beneficiaries"
            element={
              <ProtectedRoute authToken={authToken}>
                <AdminBeneficiariesList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/beneficiaries/edit/:id"
            element={
              <ProtectedRoute authToken={authToken}>
                <EditBeneficiary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute authToken={authToken}>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
