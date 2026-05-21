"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });

      if (response.ok) {
        router.push("/admin/login");
      }
    } catch {
      // Redirect anyway — session will expire naturally
      router.push("/admin/login");
    }
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/dashboard/projects", label: "Projects" },
    { href: "/admin/dashboard/experience", label: "Experience" },
    { href: "/admin/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="px-6 py-6 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
