import { useAuthStore } from '@/store/useAuthStore';
import { Role } from '@/types';

export function useAuth() {
  const { user, tokens, isAuthenticated, activeRole, login, logout, switchRole, updateUser } = useAuthStore();

  const isCustomer = activeRole === 'customer';
  const isAgent = activeRole === 'agent';
  const isManager = activeRole === 'manager';
  const isOrgAdmin = activeRole === 'org_admin';
  const isSuperAdmin = activeRole === 'super_admin';

  // Helper permission check: hierarchically checks allowed roles
  const hasRole = (allowedRoles: Role[]) => {
    return allowedRoles.includes(activeRole);
  };

  const canManageAgent = ['manager', 'org_admin', 'super_admin'].includes(activeRole);
  const canAccessAnalytics = ['manager', 'org_admin', 'super_admin'].includes(activeRole);
  const canManageBilling = ['org_admin', 'super_admin'].includes(activeRole);
  const canManageOrg = ['org_admin', 'super_admin'].includes(activeRole);

  return {
    user,
    tokens,
    isAuthenticated,
    activeRole,
    login,
    logout,
    switchRole,
    updateUser,
    isCustomer,
    isAgent,
    isManager,
    isOrgAdmin,
    isSuperAdmin,
    hasRole,
    canManageAgent,
    canAccessAnalytics,
    canManageBilling,
    canManageOrg,
  };
}
