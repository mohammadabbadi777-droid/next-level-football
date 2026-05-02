import Link from "next/link";
import { useRouter } from "next/router";
import BottomNav from "./BottomNav";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "⚡" },
  { href: "/training", label: "Training", icon: "🏃" },
  { href: "/match-iq", label: "Match IQ", icon: "🧠" },
  { href: "/progress", label: "Progress", icon: "📈" },
  { href: "/comparison", label: "My Style", icon: "⭐" },
];

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-gray-950 border-r border-gray-800 flex-col py-8 px-4 fixed h-full">
        <div className="mb-10">
          <h1 className="text-green-400 font-bold text-lg leading-tight">
            NEXT LEVEL<br />FOOTBALL
          </h1>
          <p className="text-gray-500 text-xs mt-1">AI Coach</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                router.pathname === item.href
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="text-xs text-gray-600 hover:text-gray-400 mt-4"
        >
          ← Re-do Onboarding
        </Link>
      </aside>

      {/* Main content */}
      <main className="md:ml-56 flex-1 p-8 pb-32 md:pb-8">{children}</main>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
