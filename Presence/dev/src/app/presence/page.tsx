"use client";
import AppSidebar from "@/components/custom/Appsidebar";
import QrScanner from "@/components/custom/Qrscanner";
import { Label } from "@/components/ui/label";

export default function page() {
  return (
    <div className="flex">
      <AppSidebar></AppSidebar>
      <div className="m-0 w-full bg-slate-50 h-[800px] border-gray border-2">
        <h1 className="ml-10 text-red-600 text-md mt-10">Faire une présence</h1>
        <Label className="text-gray-400 ml-10 mt-2">
          Scannez ici un qr code pour valider votre présence de la matière en
          cours
        </Label>
        <div>
          <QrScanner></QrScanner>
        </div>
      </div>
    </div>
  );
}
