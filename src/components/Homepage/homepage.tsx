"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  Download,
  Eye,
  Sparkles,
  
  Rocket,
} from "lucide-react";
import { colorThemes } from "@/components/color/colorThemes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useUserTemplateData} from "@/contexts/userTemplateData"
import {UserTemplateContextType, UserTemplateDataType} from "@/contexts/contextTypes"
import { useRouter } from 'next/navigation'
import {SocialMediaLinks} from "./socialMediaLinks"
import { useEffect } from "react";

export const Homepage = () => {
  const router = useRouter();
  const {userTemplateData, addTemplateData, isGenerating, setIsGenerating, setShowPreview, setIsIndustryChanged, isIndustryChanged, setGeneratedContent } = useUserTemplateData() as UserTemplateContextType;
  
  const industries = [
  "Technology",
  "Marketing",
  "Consulting",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Education",
  "Food & Beverage",
  "Other"
];

  const [formData, setFormData] = useState<UserTemplateDataType>({
    businessName: "",
    industry: "",
    slogan: "",
    colorTheme: "blue",
    socialMediaLinksInfo: "",
  });
  // if(userTemplateData.businessName )
  const handleSubmit = (e: any) => {
    if (!formData.businessName || !formData.industry) {
      alert("Please fill in all required fields");
      return;
    }
    addTemplateData(formData, "undefined");
    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      
      setShowPreview(true);
      setIsGenerating(false);
      router.push('/preview');
      
    }, 2000);
  };

  const handleInputChange = (e: any) => {
    console.log("value changed", isIndustryChanged)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    })
  };
  const handleSelectChange = (name:string, value:string)=>{
    setGeneratedContent([])
    setFormData((prevDataForm)=>{
      
      console.log("value changed", isIndustryChanged)
      return {
        ...prevDataForm,
        [name]: value
      }
    })
  }
  useEffect(()=>{
    console.log("calling HomePage useeffect", userTemplateData)
    if(userTemplateData.businessName.length === 0 || userTemplateData.industry.length === 0){
      return
    }
    setFormData(userTemplateData)
  },[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm max-sm:flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex items-center justify-between py-6 space-y-4 sm:space-y-0 ">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="max-sm:text-xl  text-2xl font-bold text-gray-900">
                AI Landing Page Generator
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Rocket className="w-8 h-8 text-blue-500" />
              <span>Create professional pages in seconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
            Generate Your Business Landing Page
          </h2>
          <p className=" sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Fill in your business details and let AI create a professional,
            SEO-optimized landing page for you.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Business Name *
              </Label>
              <Input
                id="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleInputChange}
                name="businessName"
                className="w-full px-4 py-6 border border-gray-300 rounded-lg focus:border-blue-500  focus:ring-blue-500 focus:ring-2"
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </Label>
              <Select value={formData.industry} onValueChange={(value)=>{
                setIsIndustryChanged(true);
                handleSelectChange("industry", value)
              }} >
                {/* <div className="px-4 py-3"> */}
                <SelectTrigger className="w-full px-4 py-6  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500  cursor-pointer"
                value={formData.industry}
                >
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {industries.map((industry, index)=>{
                      return (
                        <SelectItem key={index} value={industry.toLowerCase()} className="cursor-pointer">
                          {industry}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
                {/* </div> */}
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Slogan (Optional)
              </Label>
              <Input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleInputChange}
                className="w-full px-4 py-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your business tagline or slogan"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Color Theme
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(colorThemes).map(([key, theme], index) => (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name="colorTheme"
                      value={key}
                      checked={formData.colorTheme === key}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                        formData.colorTheme === key
                          ? "border-gray-800 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${theme.bg}`}
                      ></div>
                      <div className="text-sm font-medium text-center capitalize">
                        {key}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <SocialMediaLinks />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg text-sm sm:text-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Your Landing Page...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Landing Page</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Content</h3>
            <p className="text-gray-600">
              Intelligent content generation tailored to your industry
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Preview</h3>
            <p className="text-gray-600">
              See your landing page come to life in real-time
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Deploy</h3>
            <p className="text-gray-600">
              Download clean HTML/CSS ready for any hosting platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
