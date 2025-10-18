import { useState } from 'react';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { UploadReportPage } from './components/pages/UploadReportPage';
import { ViewReportPage } from './components/pages/ViewReportPage';
import { AddVitalsPage } from './components/pages/AddVitalsPage';
import { TimelinePage } from './components/pages/TimelinePage';
import { ProfilePage } from './components/pages/ProfilePage';

export type Language = 'en' | 'ur';

export interface Report {
  id: string;
  type: string;
  date: string;
  fileName: string;
  fileUrl: string;
  summary: {
    en: string;
    ur: string;
  };
  abnormalValues: string[];
}

export interface Vital {
  id: string;
  date: string;
  bpSystolic: number;
  bpDiastolic: number;
  sugar: number;
  weight: number;
  notes: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      type: 'Blood Test',
      date: '2025-10-15',
      fileName: 'blood-test-oct-2025.pdf',
      fileUrl: '/sample-report.pdf',
      summary: {
        en: 'Your blood test shows slightly elevated cholesterol levels (LDL: 145 mg/dL, normal range: <100 mg/dL). Your glucose levels are within normal range (92 mg/dL). Vitamin D is low (18 ng/mL, should be >30). Overall, your blood count is healthy.',
        ur: 'Aapke blood test mein cholesterol thora zyada hai (LDL: 145 mg/dL, normal range: <100 mg/dL). Glucose levels normal hain (92 mg/dL). Vitamin D kam hai (18 ng/mL, hona chahiye >30). Overall, aapka blood count healthy hai.'
      },
      abnormalValues: ['LDL Cholesterol: 145 mg/dL', 'Vitamin D: 18 ng/mL']
    },
    {
      id: '2',
      type: 'X-Ray',
      date: '2025-10-10',
      fileName: 'chest-xray-oct-2025.jpg',
      fileUrl: '/sample-xray.jpg',
      summary: {
        en: 'Chest X-ray appears normal. No signs of infection, pneumonia, or abnormal masses. Heart size is within normal limits. Lung fields are clear.',
        ur: 'Chest X-ray normal hai. Koi infection, pneumonia, ya abnormal mass nahi hai. Dil ka size normal hai. Phepron ki fields clear hain.'
      },
      abnormalValues: []
    }
  ]);
  
  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: '1',
      date: '2025-10-16',
      bpSystolic: 128,
      bpDiastolic: 82,
      sugar: 105,
      weight: 72.5,
      notes: 'Feeling good today'
    },
    {
      id: '2',
      date: '2025-10-12',
      bpSystolic: 125,
      bpDiastolic: 80,
      sugar: 98,
      weight: 73,
      notes: 'After morning walk'
    }
  ]);

  const navigate = (page: string, reportId?: string) => {
    setCurrentPage(page);
    if (reportId) {
      setSelectedReportId(reportId);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const addReport = (report: Report) => {
    setReports([report, ...reports]);
  };

  const addVital = (vital: Vital) => {
    setVitals([vital, ...vitals]);
  };

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'ur' : 'en');
  };

  const selectedReport = reports.find(r => r.id === selectedReportId);

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== 'register') {
      return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => navigate('register')} />;
    }

    if (currentPage === 'register') {
      return <RegisterPage onRegister={handleLogin} onNavigateToLogin={() => navigate('login')} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            reports={reports}
            vitals={vitals}
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onLogout={handleLogout}
          />
        );
      case 'upload':
        return (
          <UploadReportPage
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onAddReport={addReport}
            onLogout={handleLogout}
          />
        );
      case 'view-report':
        return (
          <ViewReportPage
            report={selectedReport}
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onLogout={handleLogout}
          />
        );
      case 'add-vitals':
        return (
          <AddVitalsPage
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onAddVital={addVital}
            onLogout={handleLogout}
          />
        );
      case 'timeline':
        return (
          <TimelinePage
            reports={reports}
            vitals={vitals}
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onLogout={handleLogout}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <DashboardPage
            reports={reports}
            vitals={vitals}
            language={language}
            onNavigate={navigate}
            onToggleLanguage={toggleLanguage}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}
