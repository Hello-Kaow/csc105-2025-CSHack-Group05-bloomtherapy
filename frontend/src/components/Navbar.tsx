import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
    BookOpen,
    ListChecks,
    Brain,
    Heart,
    User,
    LogOut,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";


const navItems = [
    { label: "Journal", icon: BookOpen, to: "/journal" },
    { label: "Bucket List", icon: ListChecks, to: "/bucket-list" },
    { label: "Humanity Test", icon: Brain, to: "/humanity-test" },
    { label: "Heal Heart", icon: Heart, to: "/heal-heart" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setIsOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const SidebarContent = () => (
        <>
            {/* Logo */}

            <img
                src="/projectname.svg"
                alt="BloomTherapy"
                className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            />

            {/* Nav links */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(({ label, icon: Icon, to }) => (
                    <NavLink
                        key={to}
                        to={to}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive
                                ? "bg-white/30 text-white"
                                : "text-white/80 hover:bg-white/20 hover:text-white"
                            }`
                        }
                    >
                        <Icon size={16} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom */}
            <div className="flex flex-col gap-1 mt-4 border-t border-white/20 pt-4">
                <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                    <User size={16} />
                    Profile
                </NavLink>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/20 hover:text-white transition-colors w-full text-left">
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* ===== DESKTOP SIDEBAR (lg+) ===== */}
            <aside className="hidden lg:flex flex-col w-52 min-h-screen bg-[#8aad8a] text-white py-6 px-3 fixed top-0 left-0 z-40">
                <SidebarContent />
            </aside>

            {/* ===== TABLET / MOBILE (< lg) ===== */}
            <div className="lg:hidden">

                {/* Overlay — ปรับความเข้มได้ที่ bg-black/30 👇 */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/5"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Sidebar panel — ทับเนื้อหาเลย (fixed + z-40) */}
                <aside
                    className={`fixed top-0 left-0 h-full w-52 bg-[#8aad8a] text-white py-6 px-3 z-40
            flex flex-col transition-transform duration-300 ease-in-out shadow-2xl
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <SidebarContent />
                </aside>

                {/* Toggle button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`fixed top-1/2 -translate-y-1/2 z-50 bg-[#8aad8a] text-white
            w-6 h-12 flex items-center justify-center
            rounded-r-lg shadow-lg transition-all duration-300 ease-in-out
            hover:bg-[#7a9d7a] active:scale-95
            ${isOpen ? "left-52" : "left-0"}`}
                    aria-label={isOpen ? "ปิด menu" : "เปิด menu"}
                >
                    {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
            </div>
        </>
    );
}