import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-slate-800 shadow sticky top-0 z-10">
      <div className="max-w-full mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">Warline News</Link>
        <div className="space-x-4">
          <Link to="/" className={`font-medium ${pathname === '/' ? 'text-blue-500' : 'text-gray-300'}`}>
            News
          </Link>
          <Link to="/alerts" className={`font-medium ${pathname === '/alerts' ? 'text-blue-500' : 'text-gray-300'}`}>
            Red Zone Areas
          </Link>
        </div>
      </div>
    </nav>
  );
}
