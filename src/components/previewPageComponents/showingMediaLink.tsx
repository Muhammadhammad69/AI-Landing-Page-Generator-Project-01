"use client"
import {socialPlatformsData } from "@/components/socialPlatformData"
import {useUserTemplateData} from "@/contexts/userTemplateData"
import {UserTemplateContextType, SocialMediaLinkType} from "@/contexts/contextTypes"
export const ShowingMediaLink = () => {
    const {userTemplateData} = useUserTemplateData() as UserTemplateContextType
    const socialPlatforms = [...socialPlatformsData]
    const selectedSocialPlatforms = userTemplateData.socialMediaLinksInfo as SocialMediaLinkType[]
    const getIconPlatform = (platform: string) =>{
        const platformData = socialPlatforms.find((p) => p.value.toLowerCase() === platform.toLowerCase());
        return platformData ? platformData.icon : null;
    }
    const getPlatformColor = (platform: string) => {
        const platformData = socialPlatforms.find((p) => p.value === platform);
        return platformData ? platformData.color : "text-gray-600";
    }
    return (
        <>
            {selectedSocialPlatforms.length > 0 && selectedSocialPlatforms.map((platform)=>{
                const IconComponent = getIconPlatform(platform.platform); ;
                return (
                    <div key={platform.id}>
                        <a href={platform.url} target="_blank"  rel="noopener noreferrer">
                         {
                            IconComponent && <IconComponent className={`w-6 h-6 ${getPlatformColor(platform.platform)}`}/>
                         }
                        </a>
                    </div>
                )
            })}
        </>
    )
}   