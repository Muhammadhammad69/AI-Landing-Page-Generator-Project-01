import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";

const allIcons = {
    ...FaIcons,
    ...LucideIcons
}

export const checkIcons = (iconName: string) => {
    if ((allIcons as any)[iconName]) {
      return (allIcons as any)[iconName];
    }
    return undefined;
  };