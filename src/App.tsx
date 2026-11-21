import React, { useState } from 'react';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { LoadingScreen } from './components/shared/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailReviewPage } from './pages/EmailReviewPage';
import { EnquiriesProjectsPage } from './pages/EnquiriesProjectsPage';
import { RecordDetailPage } from './pages/RecordDetailPage';
import { TasksAdministrationPage } from './pages/TasksAdministrationPage';
import { AppShell } from './components/layout/AppShell';
import { ToastContainer } from './components/shared/Toast';

const AppContent: React.FC = () => {
  const { currentRoute } = useWorkspace();
  const [hasLoaded, setHasLoaded] = useState(false);

  // 4. Premium Loading Experience on first entry
  if (!hasLoaded) {
    return <LoadingScreen onComplete={() => setHasLoaded(true)} />;
  }

  // Public Landing Page
  if (currentRoute === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  // Simulated Login Page
  if (currentRoute === 'login') {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  // Main SaaS Application Workspace
  return (
    <AppShell>
      {currentRoute === 'dashboard' && <DashboardPage />}
      {currentRoute === 'emails' && <EmailReviewPage />}
      {currentRoute === 'enquiries-projects' && <EnquiriesProjectsPage />}
      {currentRoute === 'detail' && <RecordDetailPage />}
      {currentRoute === 'tasks-admin' && <TasksAdministrationPage />}
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <WorkspaceProvider>
      <AppContent />
    </WorkspaceProvider>
  );
};

export default App;
