"use client";
import { useState } from "react";
import {
  Plus,
  Trash2,
} from "lucide-react";
import {
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {useUserTemplateData} from "@/contexts/userTemplateData"
import {UserTemplateContextType, SocialMediaLinkType } from "@/contexts/contextTypes"
import {socialPlatformsData} from "@/components/socialPlatformData"
import {useEffect} from "react"
export const SocialMediaLinks = () => {
  const {userTemplateData,addTemplateData} = useUserTemplateData() as UserTemplateContextType;
  
  const [socialMediaLinks, setSocialMediaLinks] = useState<SocialMediaLinkType[]>([
    { id: 1, platform: "", url: "", disabled: false },
  ]);

  const [socialPlatforms, setSocialPlatform] = useState(
    [...socialPlatformsData]
  )

  const addSocialLink = () => {
    for (let i = 0; i < socialMediaLinks.length; i++) {
      if (socialMediaLinks[i].disabled === false) {
        if (
          socialMediaLinks[i].platform === "" ||
          socialMediaLinks[i].url === ""
        ) {
          alert("Please fill url and platform field");
          return;
        }
      }
    }
    const newId = Math.max(...socialMediaLinks.map((link) => link.id)) + 1;
    setSocialMediaLinks([
      ...socialMediaLinks,
      { id: newId, platform: "", url: "", disabled: false },
    ]);
    addTemplateData("socialMediaLinks", socialMediaLinks);
    socialPlatforms.map((platform) => {
      for (let i = 0; i < socialMediaLinks.length; i++) {
        if (socialMediaLinks[i].disabled === false) {
          socialMediaLinks[i].disabled = true;
        }
        if (
          platform.value.toLowerCase() ===
          socialMediaLinks[i].platform.toLowerCase()
        ) {
          platform.disabled = true;
        }
      }
      return platform;
    });
    // console.log("imported social platforms", socialPlatformsData);
    // console.log("local social platforms", socialPlatforms);
  };

  const removeSocialLink = (id: number) => {
    if (socialMediaLinks.length > 1) {
      const targetLink = socialMediaLinks.filter((link) => link.id === id);
      const getPlatform = socialPlatforms.map((platform) => {
        if (platform.value === targetLink[0].platform) {
          platform.disabled = false;
        }
        return platform;
      });
      setSocialPlatform(getPlatform);
      setSocialMediaLinks(socialMediaLinks.filter((link) => link.id !== id));
    }
  };

  const updateSocialLink = (id: number, field: string, value: string) => {
    const updatedLinks = socialMediaLinks.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setSocialMediaLinks(updatedLinks);

    // Call parent callback if provided
    // if (onSocialMediaChange) {
    //   onSocialMediaChange(
    //     updatedLinks.filter((link) => link.platform && link.url)
    //   );
    // }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = socialPlatforms.find((p) => p.value === platform);
    return platformData ? platformData.icon : null;
  };

  const getPlatformColor = (platform: string) => {
    const platformData = socialPlatforms.find((p) => p.value === platform);
    return platformData ? platformData.color : "text-gray-600";
  };
  useEffect(()=>{
    if(userTemplateData.socialMediaLinksInfo.length > 0 && typeof userTemplateData.socialMediaLinksInfo !== 'string'){
      setSocialMediaLinks(userTemplateData.socialMediaLinksInfo);
    }
  },[])

  return (
    <div className="bg-white ">
      <h2 className="text-sm font-medium text-gray-700  mb-2">
        Social Media Links
      </h2>

      <div className="space-y-4">
        {socialMediaLinks.map((link) => (
          <div
            key={link.id}
            className="sm:flex items-center gap-4 px-4 py-2 border border-gray-200 rounded-lg space-y-2 sm:space-y-0"
          >
            {/* Platform Icon */}
            <div className="flex items-center justify-center justify-items-center gap-4  ">
              <div className="flex-shrink-0 order-last sm:order-first ">
                {link.platform &&
                  (() => {
                    const IconComponent = getPlatformIcon(link.platform);
                    return IconComponent ? (
                      <IconComponent
                        className={`w-6 h-6 ${getPlatformColor(link.platform)}`}
                      />
                    ) : null;
                  })()}
                {!link.platform && (
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                )}
              </div>

              {/* Platform Select */}
              <div className="flex-1 ">
                <Select
                  onValueChange={(e) => {
                    updateSocialLink(link.id, "platform", e);
                  }}
                >
                  <SelectTrigger
                    className="w-full px-3 py-2 border! border-gray-300! rounded-md focus:outline-none! focus:ring-2! focus:ring-blue-500! focus:border-transparent shadow-none cursor-pointer"
                    value={link.platform}
                    disabled={link.disabled}
                  >
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Platform</SelectLabel>
                      {socialPlatforms.map((platform) => (
                        <SelectItem
                          key={platform.value}
                          value={platform.value}
                          disabled={platform.disabled}
                        >
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* URL Input */}
            <div className="flex-2">
              <Input
                type="url"
                placeholder="Enter profile URL"
                value={link.url}
                onChange={(e) =>
                  updateSocialLink(link.id, "url", e.target.value)
                }
                disabled={link.disabled}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeSocialLink(link.id)}
              disabled={socialMediaLinks.length === 1}
              className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <div className="flex justify-end">
        <button
          onClick={addSocialLink}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Another Platform
        </button>
      </div>

      {/* Preview Section */}
      <div className="mt-8 pt-6 border-t">
        {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3> */}
        <div className="flex gap-4 flex-wrap">
          {socialMediaLinks
            .filter((link) => link.platform && link.url)
            .map((link) => {
              const IconComponent = getPlatformIcon(link.platform);
              return IconComponent ? (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${getPlatformColor(
                    link.platform
                  )} hover:opacity-75 transition-opacity`}
                >
                  <IconComponent className="w-8 h-8" />
                </a>
              ) : null;
            })}
        </div>
        {socialMediaLinks.filter((link) => link.platform && link.url).length ===
          0 && (
          <p className="text-gray-500 text-sm">
            
          </p>
        )}
      </div>
    </div>
  );
};
