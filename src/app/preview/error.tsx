'use client'
import Link from "next/link";
import { BiError } from "react-icons/bi";
interface CustomError extends Error {
    status?: number
}
export default function Error({ error, reset }: { error: CustomError; reset: () => void }) {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <BiError className="w-8 h-8 text-red-600" />
              </div>
            </div>
    
            {/* Error Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
    
            {/* Error Message */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                {error.message || "An unexpected error occurred"}
              </p>
              {error.status && (
                <p className="text-sm text-gray-500 bg-gray-100 rounded-md px-3 py-1 inline-block">
                  Status Code: {error.status}
                </p>
              )}
            </div>
            <div className="space-y-3">
              {/* Try Again Button */}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              onClick={() => reset()}
              >
                Try Again
              </button>
    
              {/* Back to Home Button */}
             <Link 
                href="/"
                className="w-full inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-center"
              >
                Go Home
              </Link>
            </div>
            {/* Additional Help Text */}
            <p className="text-xs text-gray-500 mt-4">
              If the problem persists, please contact support
            </p>
          </div>
        </div>
  )
}
