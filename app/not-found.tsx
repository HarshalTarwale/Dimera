export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-7xl font-light text-slate-300">404</h1>
            <div className="mx-auto h-0.5 w-16 bg-slate-200" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-medium text-slate-800">
              Page Not Found
            </h2>
            <p className="leading-relaxed text-slate-600">
              The page you are looking for could not be found in this
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
