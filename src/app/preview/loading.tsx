import { Loader } from "@/components/loader/loader";
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="mb-8">
          <div className="inline-block relative w-16 h-16">
            {/* Main spinner */}

            <Loader />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
          <p className="text-gray-600">Please wait while we fetch your data</p>
        </div>
      </div>
    </div>
  );
}
