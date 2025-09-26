import { Download } from "lucide-react";
import { useUserTemplateData } from "@/contexts/userTemplateData";
import { UserTemplateContextType } from "@/contexts/contextTypes";
import  JSZip  from "jszip"
import { saveAs } from "file-saver";
export const DownloadHtml = (props: { pageRef: any }) => {
  const { userTemplateData, generatedContent } =
    useUserTemplateData() as UserTemplateContextType;
  const pageRef = props.pageRef;

  const handleHtml = () => {
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userTemplateData.businessName}</title>
    <meta name="description" content="${generatedContent[0].tagline}">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div>
${pageRef.current ? pageRef.current.outerHTML : "No data"} 
</div>
</body>
</html>
    `;
    console.log("useRef", pageRef.current.outerHTML);
    console.log("useRef2", pageRef.current);
    const zip = new JSZip();

    const folder = zip.folder(
       userTemplateData.businessName.toLowerCase().replace(/\s+/g, "-")
    )
    folder?.file("index.html", htmlContent);
    zip.generateAsync({ type: "blob" }).then((content) => {

    saveAs(
      content,
      `${userTemplateData.businessName.toLowerCase().replace(/\s+/g, "-")}.zip`
    );
  });
    // const blob = new Blob([htmlContent], { type: "text/html" });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `${userTemplateData.businessName
    //   .toLowerCase()
    //   .replace(/\s+/g, "-")}-landing-page.html`;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button
        onClick={handleHtml}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Download HTML</span>
      </button>
    </div>
  );
};
