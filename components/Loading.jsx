export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 border-t-transparent mb-4"></div>
        <p className="text-gray-600 text-lg">Lädt...</p>
      </div>
    </div>
  );
}

