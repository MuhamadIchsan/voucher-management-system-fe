import { Suspense, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router";
import LoadingPage from "./LoadingPage";
import { DoorOpen, TicketPercent, Upload } from "lucide-react";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login", { replace: true });
    }
  }, [navigate]);

  const navItems = [
    { path: "/vouchers", label: "Voucher", icon: <TicketPercent /> },
    {
      path: "/upload-vouchers",
      label: "Upload Voucher",
      icon: <Upload />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen w-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white border-r border-gray-200 shadow-sm">
        {/* Logo / Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-blue-600">
            VMS Dashboard
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex gap-3 items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-100 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            {<DoorOpen />} Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm shrink-0">
          <h4 className="text-base font-semibold text-gray-800">
            Voucher Management System
          </h4>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto px-6 py-6 bg-gray-50 w-full">
          <div className="w-full h-full">
            <Suspense fallback={<LoadingPage />}>
              <Outlet />
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3 text-sm text-gray-500 text-center shrink-0">
          © {new Date().getFullYear()} Voucher Management System
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
