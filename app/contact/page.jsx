export default function Contact() {
return (
<section className="max-w-xl mx-auto p-6">
<h1 className="text-4xl font-bold mb-4">Kontakt</h1>
<form className="grid gap-4">
<input className="p-3 border rounded-xl" placeholder="Name" />
<input className="p-3 border rounded-xl" type="email" placeholder="E-Mail" />
<textarea className="p-3 border rounded-xl" placeholder="Nachricht"></textarea>
<button className="p-3 bg-black text-white rounded-xl">Senden</button>
</form>
</section>
);
}