"use client";

import Image from "next/image";
import { useState } from "react";

interface ProtectedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  showProtectionMessage?: boolean;
}

export function ProtectedImage({
  src,
  alt,
  fill = false,
  className = "",
  priority = false,
  width,
  height,
  showProtectionMessage = false,
}: ProtectedImageProps) {
  const [attempts, setAttempts] = useState(0);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setAttempts((prev) => prev + 1);
    if (showProtectionMessage) {
      console.log("Image is protected from direct download");
    }
    return false;
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setAttempts((prev) => prev + 1);
    return false;
  };

  const handleSelectStart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    return false;
  };

  const protectionStyles = {
    WebkitUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
    userSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitUserDrag: "none" as const,
    KhtmlUserDrag: "none" as const,
    MozUserDrag: "none" as const,
    OUserDrag: "none" as const,
    userDrag: "none" as const,
  };

  const imageProps = {
    src,
    alt,
    className: `${className} select-none pointer-events-none`,
    priority,
    draggable: false,
    onContextMenu: handleContextMenu,
    onDragStart: handleDragStart,
    onSelectStart: handleSelectStart,
    style: protectionStyles,
    ...(fill ? { fill: true } : { width, height }),
  };

  return (
    <div
      className="relative select-none"
      style={protectionStyles}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
    >
      <Image {...imageProps} />

      {/* Invisible overlay for extra protection */}
      <div
        className="absolute inset-0 z-10 bg-transparent"
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        style={protectionStyles}
      />

      {/* Show protection message if too many attempts */}
      {attempts > 2 && showProtectionMessage && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 rounded">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-sm text-center">
              🛡️ This image is protected.
              <br />
              Use the download button to save it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
