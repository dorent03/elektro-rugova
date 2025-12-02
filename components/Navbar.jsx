"use client";
import Link from "next/link";
export default function Navbar() {
return (
<nav className="flex justify-between items-center p-6 bg-white shadow-md">
<h1 className="font-bold text-xl">Meine Website</h1>
<div className="flex gap-6">
<Link href="/">Home</Link>
<Link href="/about">Über uns</Link>
<Link href="/contact">Kontakt</Link>
</div>
</nav>
);
}