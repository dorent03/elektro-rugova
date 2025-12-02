"use client";
import { motion } from "framer-motion";
export default function Hero() {
return (
<section className="flex flex-col items-center justify-center text-center py-20 px-6">
<motion.h1
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
className="text-5xl font-bold mb-6"
>
Willkommen auf deiner modernen Website
</motion.h1>
<p className="text-lg max-w-2xl mb-6">
Eine komplett aufgebaute Next.js Seite mit Navigation, Layout, Kontaktformular
und modernen Komponenten.
</p>
<a href="/contact" className="bg-black text-white px-6 py-3 rounded-xl text-lg">
Kontakt aufnehmen
</a>
</section>
);
}