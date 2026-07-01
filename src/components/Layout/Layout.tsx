import type { ReactNode } from 'react';
import { Topbar } from '../Topbar/Topbar';
import { Footer } from '../Footer/Footer';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Topbar />

      {/* Contenido principal — aquí van todas tus secciones */}
      <main className="layout__main" id="main-content" role="main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
