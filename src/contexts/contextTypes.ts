import { Branding} from "@/app/api/outputType"
interface SocialMediaLinkType {
    id: number;
    platform: string;
    url: string;
    disabled: boolean
}
interface UserTemplateDataType {
    businessName: string;
    industry: string;
    slogan: string;
    colorTheme: string;
    socialMediaLinksInfo: string | SocialMediaLinkType[];
}


interface UserTemplateContextType{
    userTemplateData: UserTemplateDataType;
    isGenerating: boolean;
    showPreview: boolean;
    isIndustryChanged: boolean;
    generatedContent: Branding[] | [];
    addTemplateData: (data: UserTemplateDataType | string, links:SocialMediaLinkType[] | string) => void;
    setIsGenerating: (isGenerating: boolean) => void;
    setShowPreview: (showPreview: boolean) => void;
    setIsIndustryChanged: (isIndustryChanged: boolean) => void;
    setGeneratedContent: (generatedContent: Branding[]) => void
}

export type {UserTemplateContextType, UserTemplateDataType, SocialMediaLinkType}
