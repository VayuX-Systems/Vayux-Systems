import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PageId, ResearchArticle, JobOpening } from './types';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// Modals are kept static as they are overlays with low dynamic weight
import { ContactModal } from './components/modals/ContactModal';
import { IncidentModal } from './components/modals/IncidentModal';
import { ArticleReaderModal } from './components/modals/ArticleReaderModal';
import { JobApplicationModal } from './components/modals/JobApplicationModal';

// Code Splitting / Lazy Loading for optimized bundle segmentation
const HomeScreen = lazy(() => import('./components/screens/HomeScreen').then(m => ({ default: m.HomeScreen })));
const LoopScreen = lazy(() => import('./components/screens/LoopScreen').then(m => ({ default: m.LoopScreen })));
const ServicesScreen = lazy(() => import('./components/screens/ServicesScreen').then(m => ({ default: m.ServicesScreen })));
const ManagedSOCScreen = lazy(() => import('./components/screens/ManagedSOCScreen').then(m => ({ default: m.ManagedSOCScreen })));
const VaptScreen = lazy(() => import('./components/screens/VaptScreen').then(m => ({ default: m.VaptScreen })));
const DfirScreen = lazy(() => import('./components/screens/DfirScreen').then(m => ({ default: m.DfirScreen })));
const GrcScreen = lazy(() => import('./components/screens/GrcScreen').then(m => ({ default: m.GrcScreen })));
const TrainingScreen = lazy(() => import('./components/screens/TrainingScreen').then(m => ({ default: m.TrainingScreen })));
const ConsultationScreen = lazy(() => import('./components/screens/ConsultationScreen').then(m => ({ default: m.ConsultationScreen })));
const InsightsScreen = lazy(() => import('./components/screens/InsightsScreen').then(m => ({ default: m.InsightsScreen })));
const CompanyScreen = lazy(() => import('./components/screens/CompanyScreen').then(m => ({ default: m.CompanyScreen })));

// Robust hash-based client side router
const getPageFromHash = (): PageId => {
  const hash = window.location.hash.replace('#', '');
  const validPages: PageId[] = ['home', 'loop', 'services', 'managed-soc', 'vapt', 'dfir', 'grc', 'training', 'consultation', 'insights', 'company'];
  if (validPages.includes(hash as PageId)) {
    return hash as PageId;
  }
  return 'home';
};

function LoadingSpinner() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[450px]" role="status" aria-label="Loading secure page">
      <div className="w-10 h-10 border-2 border-[var(--color-brand-primary)] border-t-[var(--color-brand-light)] rounded-full animate-spin"></div>
      <p className="mt-4 text-xs font-mono text-[var(--color-text-muted)] tracking-widest uppercase">Initializing Secure Terminal...</p>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactDefaultService, setContactDefaultService] = useState('Managed SOC');
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  // Cross-component synced bookmarks with LocalStorage mapping
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('vayu_bookmarks');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Track hash changes for deep linking capability
  useEffect(() => {
    const handleHashChange = () => {
      const targetPage = getPageFromHash();
      setCurrentPage(targetPage);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('vayu_bookmarks', JSON.stringify(Array.from(bookmarkedArticleIds)));
  }, [bookmarkedArticleIds]);

  // Listen to escape key for closing modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false);
        setIncidentOpen(false);
        setSelectedArticle(null);
        setSelectedJob(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId) => {
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenContact = (service: string = 'Managed SOC') => {
    setContactDefaultService(service);
    setContactOpen(true);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedArticleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] selection:bg-[var(--color-brand-primary)] selection:text-white font-sans antialiased">
      {/* Structural Header & Bottom Navigation for Mobile */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('General Inquiry')}
        onOpenIncident={() => setIncidentOpen(true)}
      />

      {/* Main Screen Layout Container */}
      <main className="flex-1 pt-[68px] flex flex-col">
        <Suspense fallback={<LoadingSpinner />}>
          {currentPage === 'home' && (
            <HomeScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
              onOpenIncident={() => setIncidentOpen(true)}
            />
          )}

          {currentPage === 'loop' && (
            <LoopScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'services' && (
            <ServicesScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'managed-soc' && (
            <ManagedSOCScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'vapt' && (
            <VaptScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'dfir' && (
            <DfirScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'grc' && (
            <GrcScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'training' && (
            <TrainingScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'consultation' && (
            <ConsultationScreen
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />
          )}

          {currentPage === 'insights' && (
            <InsightsScreen
              onNavigate={handleNavigate}
              onOpenArticle={(art) => setSelectedArticle(art)}
              bookmarkedIds={bookmarkedArticleIds}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {currentPage === 'company' && (
            <CompanyScreen
              onNavigate={handleNavigate}
              onOpenJobApplication={(job) => setSelectedJob(job)}
              onOpenContact={handleOpenContact}
            />
          )}
        </Suspense>
      </main>

      {/* Footer Navigation */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('General Inquiry')}
        onOpenIncident={() => setIncidentOpen(true)}
      />

      {/* Dialog Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        defaultService={contactDefaultService}
      />

      <IncidentModal
        isOpen={incidentOpen}
        onClose={() => setIncidentOpen(false)}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarkedArticleIds.has(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      <JobApplicationModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}
