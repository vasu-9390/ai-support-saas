import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '@/pages/landing/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { VerifyEmailPage } from '@/pages/auth/VerifyEmailPage';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { SupportInboxPage } from '@/pages/inbox/SupportInboxPage';
import { TicketManagementPage } from '@/pages/tickets/TicketManagementPage';
import { AgentControlPanelPage } from '@/pages/agent/AgentControlPanelPage';
import { KnowledgeBasePage } from '@/pages/knowledge/KnowledgeBasePage';
import { VoiceAIPage } from '@/pages/voice/VoiceAIPage';
import { AgentWorkspacePage } from '@/pages/agent-workspace/AgentWorkspacePage';
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage';
import { BillingPage } from '@/pages/billing/BillingPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { NotFoundPage } from '@/pages/errors/NotFoundPage';
import { UnauthorizedPage } from '@/pages/errors/UnauthorizedPage';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Landing & Auth Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Protected Dashboard Workspace Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/inbox" element={<SupportInboxPage />} />
          <Route path="/tickets" element={<TicketManagementPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/voice-ai" element={<VoiceAIPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Role Guarded Routes */}
          <Route element={<RoleGuard allowedRoles={['agent', 'manager', 'org_admin', 'super_admin']} />}>
            <Route path="/workspace" element={<AgentWorkspacePage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={['manager', 'org_admin', 'super_admin']} />}>
            <Route path="/ai-agent" element={<AgentControlPanelPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={['org_admin', 'super_admin']} />}>
            <Route path="/billing" element={<BillingPage />} />
          </Route>
        </Route>
      </Route>

      {/* Errors */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
