
import Link from "next/link";
import React from "react";
import {DownloadHtml} from "./downloadHtml"
export const PreviewHeader = (props:{businessName:string, pageRef: React.RefObject<HTMLDivElement | null>}) => {
  return (
    <>
      {/* Preview Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-y-3 sm:gap-y-0">
            <div className="flex justify-between space-x-4">
              <Link href={"/"}>
                <button
                  //   onClick={() => setShowPreview(false)}
                  className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  ← Back to Editor
                </button>
              </Link>
              <div className="text-lg font-semibold">
                Preview:
                {props.businessName}
              </div>
            </div>
            <div className="flex items-center space-x-3 self-end">
              <DownloadHtml pageRef={props.pageRef}/>
              {/* <button
                // onClick={downloadHTML}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download HTML</span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
