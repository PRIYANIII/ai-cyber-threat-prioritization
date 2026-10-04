import { NavLink } from 'react-router-dom';

const navigation = [
  { label: 'Dashboard', to: '/' },
  { label: 'Threat Events', to: '/threats' },
  { label: 'Alerts', to: '/alerts' },
];

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="fixed inset-y-0 w-64 border-r border-cyan-950 bg-slate-900 px-4 py-6">
        <div className="mb-10 px-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Security Ops</p>
          <h1 className="mt-2 text-lg font-bold text-white">Threat Intelligence</h1>
        </div>
        <nav className="space-y-1">
          {navigation.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm transition ${isActive
                  ? 'bg-cyan-500/15 text-cyan-300'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="ml-64 min-h-screen">
        <header className="border-b border-slate-800 bg-slate-900/70 px-8 py-5">
          <p className="text-sm text-slate-400">Cyber Threat Intelligence &amp; Threat Prioritization</p>
        </header>
        <main className="px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
