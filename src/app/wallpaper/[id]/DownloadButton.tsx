// src/app/wallpaper/[id]/DownloadButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { FullscreenAdOverlay } from "@/components/ads/FullscreenAdOverlay";
import { useAdSense } from "@/providers/AdSenseProvider";

export function DownloadButton({
  imageUrl,
  fileName,
}: {
  imageUrl: string;
  fileName: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const { isAdLoaded } = useAdSense();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Show ad first
      setShowAd(true);
      
    } catch (error) {
      console.error("Error starting download process:", error);
      setIsDownloading(false);
    }
  };

  const handleAdComplete = async () => {
    try {
      // Actually download the file after ad is completed
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "wallpaper.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log("Download completed successfully");
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
      setShowAd(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
      >
        <Download size={18} />
        {isDownloading ? "Preparing Download..." : "Download"}
      </Button>

      <FullscreenAdOverlay
        isOpen={showAd}
        onClose={() => setShowAd(false)}
        onAdComplete={handleAdComplete}
        adUnitId="9137420112" // Your actual ad slot ID
      />
    </>
  );
}