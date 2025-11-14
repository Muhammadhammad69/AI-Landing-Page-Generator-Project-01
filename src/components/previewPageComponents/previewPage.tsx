"use client";
import { useUserTemplateData } from "@/contexts/userTemplateData";
import { UserTemplateContextType } from "@/contexts/contextTypes";
import { colorThemes } from "@/components/color/colorThemes";
import { ShowingMediaLink } from "@/components/previewPageComponents/showingMediaLink";
import { useState, useEffect } from "react";
import { Branding } from "@/app/api/outputType";
import parse from "html-react-parser";
import { PreviewHeader } from "./previewHeader";
import { checkIcons } from "./all-Icons";
import {useRef} from "react"
import Loading from "@/app/preview/loading";
const PreviewPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  
  const [isCallingGemini, setIsCallingGemini] = useState(true);
  const {
    userTemplateData,
    isIndustryChanged,
    setIsIndustryChanged,
    generatedContent,
    setGeneratedContent,
  } = useUserTemplateData() as UserTemplateContextType;
  const colorTheme = userTemplateData.colorTheme;
  const theme = colorThemes[colorTheme];

  const SvgIcon = ({ svgString }: { svgString: string }) => {
    return <>{parse(svgString)}</>;
  };
  useEffect(() => {
    
    if (
      userTemplateData.businessName.length === 0 ||
      userTemplateData.industry.length === 0
    ) {
      
      setIsCallingGemini(false);
      return;
    }
    if (!isIndustryChanged) {
      setIsCallingGemini(false);
      return;
    }
    if(!isCallingGemini){
      return
    }
    // setIsCallingGemini(true);
    const fetchData = async () => {
      console.log("fetching data ===>>>")
      try {
        const resp = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessName: userTemplateData.businessName,
            industry: userTemplateData.industry,
            slogan: userTemplateData.slogan,
          }),
        });
        const data = await resp.json();
        const generatedData = data.data as Branding;
        if (data.success) {
          setGeneratedContent([generatedData]);
          console.log("Data fetched successfully:", data);
          setIsIndustryChanged(false);
        }
        
        setIsCallingGemini(false);
      } catch (error) {
        setIsCallingGemini(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallingGemini]);
  
  if (isCallingGemini) return <><Loading/></>;
  if (generatedContent.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error:any = new Error("Data not found");
  error.status = 500;
  throw error; // error.tsx ko trigger karega
}
  return (
    <>
      <div className="min-h-screen bg-gray-100" >
        <PreviewHeader businessName={userTemplateData.businessName}
        pageRef={pageRef}/>
        <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`} ref={pageRef}>
          {/* Navigation */}
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-y-2 py-4 sm:py-6 sm:gap-y-0">
                <div
                  className="text-2xl font-bold text-center"
                  style={{ color: theme.primary }}
                >
                  {userTemplateData.businessName}
                </div>

                <button
                  className="px-3 sm:px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ backgroundColor: theme.primary }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <p className="sm:text-xl text-gray-600 mb-2 max-w-3xl mx-auto">
                {generatedContent[0].slogan}
              </p>
              <h1
                className={`text-3xl sm:text-5xl font-bold ${theme.text} mb-6 break-words`}
              >   
                {generatedContent[0].headline}
              </h1>
              <p className="sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">     
                {generatedContent[0].tagline}
              </p>
              <button
                className="p-3 sm:px-6 sm:py-3 text-white sm:text-lg font-semibold rounded-lg shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                {generatedContent[0].cta}
              </button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {generatedContent[0].features.map((feature, index) => {
                return (
                  <div
                    className="bg-white rounded-xl p-8 shadow-lg text-center"
                    key={index}
                  >
                    {(() => {
                      const IconComponent = checkIcons(feature.iconName);
                      return IconComponent ? (
                        <IconComponent className="w-12 h-12 mx-auto mb-4" style={{ color: theme.primary }} />
                      ) : (
                        <div
                          className="w-12 h-12 mx-auto mb-4 "
                          style={{ color: theme.primary }}
                        >
                          <SvgIcon svgString={feature.iconSvg} />
                        </div>
                      );
                    })()}

                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {feature.mainHeading}
                    </h3>
                    <p className="text-gray-600">
                      {feature.content}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
                About {userTemplateData.businessName}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {generatedContent[0].aboutDetails}
              </p>

              {/* Social Media Links */}
              
              <>
              {(userTemplateData.socialMediaLinksInfo instanceof Array) &&(userTemplateData.socialMediaLinksInfo.length > 0) && (
              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${theme.text} mb-3`}>
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <ShowingMediaLink />
                </div>
              </div>
              )}
                </>
              {/* Newsletter Signup */}
              <div className="border-t pt-6">
                <h3 className={`text-lg font-semibold ${theme.text} mb-3`}>
                  Get the Latest News
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Subscribe to our newsletter for updates and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    className={`px-6 py-2 bg-${theme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer`}
                    style={{ backgroundColor: theme.primary }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export { PreviewPage };
