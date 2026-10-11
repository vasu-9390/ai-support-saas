import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types';

interface RoleGuardProps {
  allowedRoles: Role[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { hasRole } = useAuth();
  if (!hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};
