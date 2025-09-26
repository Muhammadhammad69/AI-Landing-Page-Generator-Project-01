"use client";
import React, { createContext, useContext, useState } from "react";
import {
  UserTemplateContextType,
  UserTemplateDataType,
  SocialMediaLinkType,
} from "./contextTypes";
import { Branding } from "@/app/api/outputType";

const UserTemplateDataContext = createContext<
  UserTemplateContextType | undefined
>(undefined);

export const UserTemplateDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isIndustryChanged, setIsIndustryChanged] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Branding[] | []>([]);
  const [userTemplateData, setUserTemplateData] =
    useState<UserTemplateDataType>({
      businessName: "",
      industry: "",
      slogan: "",
      colorTheme: "blue",
      socialMediaLinksInfo: "",
    });
  const addTemplateData = (
    data: UserTemplateDataType | string,
    links: SocialMediaLinkType[] | string
  ) => {
    if (typeof data !== "string") {
      setUserTemplateData({
        ...userTemplateData,
        businessName: data.businessName,
        industry: data.industry,
        slogan: data.slogan,
        colorTheme: data.colorTheme,
      });
    }
    if (typeof links !== "string") {
      console.log("links", links);
      setUserTemplateData({ ...userTemplateData, socialMediaLinksInfo: links });
    }
  };
  return (
    <UserTemplateDataContext.Provider
      value={{
        userTemplateData,
        isGenerating,
        showPreview,
        isIndustryChanged,
        addTemplateData,
        setIsGenerating,
        setShowPreview,
        setIsIndustryChanged,
        generatedContent,
        setGeneratedContent,
      }}
    >
      {children}
    </UserTemplateDataContext.Provider>
  );
};

export function useUserTemplateData() {
  const context = useContext(UserTemplateDataContext);
  if (!context) {
    throw new Error(
      "useUserTemplateData must be used within a UserTemplateDataProvider"
    );
  }
  return context;
}
