import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Compass, TrendingUp, Bookmark, Clock, User, ChevronRight, Calendar, Smartphone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import InteractiveBackdrop from './InteractiveBackdrop';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`relative flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group ${
      active 
        ? 'bg-primary/10 text-primary' 
        : 'text-text-secondary hover:bg-white/[0.03] hover:text-white'
    }`}
  >
    {active && (
      <motion.div 
        layoutId="sidebar-active-pill"
        className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <Icon size={20} className={`transition-all duration-500 ${active ? 'scale-110' : 'group-hover:scale-110 group-hover:text-primary'}`} />
    <span className={`font-black text-xs uppercase tracking-widest transition-all duration-500 ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
      {label}
    </span>
    {active && (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="ml-auto"
      >
        <ChevronRight size={14} className="opacity-50" />
      </motion.div>
    )}
  </Link>
);

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-background-main flex flex-col font-body selection:bg-primary/30 overflow-x-hidden">
      <InteractiveBackdrop />
      <Navbar />
      
      <div className="relative z-10 flex flex-1 pt-24 lg:pt-32">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-72 h-[calc(100vh-128px)] sticky top-32 px-4 pb-6 overflow-y-auto custom-scrollbar border-r border-white/[0.02]">
          {/* Nav Links */}
          <div className="space-y-1 flex-1">
            <div className="px-4 mb-4">
               <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Dimensiones</h4>
            </div>
            <SidebarLink to="/" icon={Home} label="Inicio" active={location.pathname === '/'} />
            <SidebarLink to="/explorar" icon={Compass} label="Explorar" active={location.pathname === '/explorar'} />
            <SidebarLink to="/populares" icon={TrendingUp} label="Tendencias" active={location.pathname === '/populares'} />
            <SidebarLink to="/calendario" icon={Calendar} label="Calendario" active={location.pathname === '/calendario'} />
            
            <div className="px-4 mt-8 mb-4">
               <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Mi Archivo</h4>
            </div>
            <SidebarLink to="/historial" icon={Clock} label="Historial" active={location.pathname === '/historial'} />
            <SidebarLink to="/mi-lista" icon={Bookmark} label="Favoritos" active={location.pathname === '/mi-lista'} />
            <SidebarLink to="/perfil" icon={User} label="Estadísticas" active={location.pathname === '/perfil'} />
            
            <div className="px-4 mt-8 mb-4">
               <h4 className="text-[10px] font-black text-primary/80 uppercase tracking-[0.4em] mb-2">Aplicación</h4>
            </div>
            <Link 
              to="/descargas"
              className="relative flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group text-text-secondary hover:bg-primary/10 hover:text-primary"
            >
              <Smartphone size={20} className="transition-all duration-500 group-hover:scale-110 group-hover:text-primary" />
              <span className="font-semibold text-sm tracking-wide group-hover:translate-x-1 transition-transform duration-500">
                App Móvil
              </span>
              <div className="absolute inset-0 border border-primary/20 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </Link>
          </div>


        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="pb-24 lg:pb-0"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />

      {/* Mobile Bottom Navigation Improved */}
      <nav className="lg:hidden fixed bottom-8 inset-x-6 h-20 bg-background-secondary/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] z-[100] shadow-2xl shadow-black/80 overflow-hidden">
        <div className="flex items-center gap-2 h-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-4">
        {[
          { to: '/', icon: Home, label: 'Inicio' },
          { to: '/explorar', icon: Compass, label: 'Explorar' },
          { to: '/populares', icon: TrendingUp, label: 'Tendencias' },
          { to: '/mi-lista', icon: BookmarkPlus, label: 'Favoritos' },
          { to: '/historial', icon: Clock, label: 'Historial' },
          { to: '/descargas', icon: Download, label: 'Descargar App' },
        ].map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;
          return (
            <Link 
              key={to} 
              to={to} 
              className={`relative flex flex-col items-center justify-center gap-1.5 transition-all duration-500 w-[60px] shrink-0 snap-center ${
                active ? 'text-primary' : 'text-white/40 hover:text-white'
              }`}
            >
              {active && (
                <motion.div 
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-4 w-8 h-1 bg-primary rounded-full shadow-lg shadow-primary/50"
                />
              )}
              <Icon size={active ? 26 : 22} className={`transition-all duration-500 ${active ? 'fill-primary/10' : ''}`} />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
