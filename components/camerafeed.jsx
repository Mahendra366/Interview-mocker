"use client";

import { useEffect, useRef } from "react";

export default function CameraFeed() {

  const videoRef = useRef();

  useEffect(() => {

    let startTime = Date.now();

    async function startCamera() {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error("Camera error:", error);
      }

    }

    startCamera();

    return () => {

      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);

      localStorage.setItem("cameraDuration", duration.toString());

    };

  }, []);

  return (
    <div className="flex flex-col items-center">

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded-xl border w-72 shadow-lg"
      />

      <p className="text-sm mt-2 text-gray-400">
        Camera Active
      </p>

    </div>
  );
}