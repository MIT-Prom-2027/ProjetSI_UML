"use client";

import { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";

interface Qrcodeerror {
  message: string;
}

export default function Qrscanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Fonction pour démarrer le scan
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
      setIsScanning(false);
    }
  };

  // Fonction pour arrêter le scan
  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Fonction de scan QR code
  const scan = () => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context && video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "attemptBoth", // Améliore la détection dans différentes conditions d'éclairage
      });

      if (code && code.data) {
        setScannedData(code.data);
        stopScanning();
        return;
      }
    } else {
      console.log("Vidéo non prête ou dimensions invalides");
    }

    if (isScanning) {
      requestAnimationFrame(scan);
    }
  };

  useEffect(() => {
    if (isScanning) {
      requestAnimationFrame(scan);
    }
  }, [isScanning]);

  useEffect(() => {
    const handledata = async () => {
      if (scannedData != null) {
        const response = await fetch(
          "http://localhost:3000/api/presence/manuelle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_user: scannedData, status: "Present" }),
          }
        );
        const result = await response.json();

        if (response.ok) {
          alert("présence effectué");
        } else {
          const error: Qrcodeerror = result;
          alert(`Erreur lors de la présence : ${error.message}`);
        }
      }
    };

    handledata();
  }, [scannedData]);

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-64 h-64 bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${
            isScanning ? "block" : "hidden"
          }`}
          playsInline
          muted
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <button
        onClick={isScanning ? stopScanning : startScanning}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isScanning ? "Arrêter" : "Scanner"}
      </button>
    </div>
  );
}
