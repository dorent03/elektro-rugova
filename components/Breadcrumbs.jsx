"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Überspringe Breadcrumbs auf der Homepage
  if (pathname === "/") return null;

  const pathSegments = pathname.split("/").filter(Boolean);
  
  const breadcrumbMap = {
    about: "Über uns",
    leistungen: "Leistungen",
    contact: "Kontakt",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  };

  return (
    <nav className="pt-24 pb-4 px-6" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const label = breadcrumbMap[segment] || segment;

            return (
              <li key={segment} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-800 font-medium" aria-current="page">
                    {label}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-blue-600 transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

