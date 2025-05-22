"use client"

export default function FallbackDashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Translation Dashboard</h1>
      <p className="mb-8">The dashboard is currently unavailable. Please try again later.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-lg animate-pulse h-40"></div>
        ))}
      </div>

      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Reload Dashboard
      </button>
    </div>
  )
}
