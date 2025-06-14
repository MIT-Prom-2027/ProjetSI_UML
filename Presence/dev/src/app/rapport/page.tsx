"use client";

import AppSidebar from "@/components/custom/Appsidebar";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface hasmatiere {
  id: string;
  titre: string;
}

interface to_course {
  id: string;
  date_deb: string;
  date_fin: string;
  id_matiere: string;
  has_matiere: hasmatiere;
}

interface do_presence {
  id: string;
  nom: string;
  prenom: string;
  mdp: string;
  email: string;
  role: string;
}

interface presenceInterface2 {
  id: string;
  id_cours: string;
  id_etudiant: string;
  is_valid: boolean;
  status: string;
  to_course: to_course;
  do_presence: do_presence;
}

interface GroupedPresence {
  [matiere: string]: {
    present: number;
    absent: number;
    taux: number;
  };
}

export default function Page() {
  const [groupedPresence, setGroupedPresence] = useState<GroupedPresence>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semestre");
  const itemsPerPage = 5;

  const fetchPresenceData = async (period: string) => {
    const response = await fetch("/api/rapports/selected", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period }),
    });

    if (response.ok) {
      const result = await response.json();
      const group: GroupedPresence = {};

      result.forEach((matiereObj: Record<string, presenceInterface2[]>) => {
        Object.entries(matiereObj).forEach(([matiere, presences]) => {
          let present = 0;
          let absent = 0;

          presences.forEach((item) => {
            if (item.status.toLowerCase() === "present") {
              present++;
            } else {
              absent++;
            }
          });

          group[matiere] = {
            present,
            absent,
            taux: parseFloat(((present / (present + absent)) * 100).toFixed(2)),
          };
        });
      });

      setGroupedPresence(group);
    }
  };

  useEffect(() => {
    if (selectedPeriod) {
      fetchPresenceData(selectedPeriod);
    }
  }, [selectedPeriod]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Rapport de Présence ${selectedPeriod}`, 14, 10);

    const rows = Object.entries(groupedPresence).map(([matiere, data]) => [
      matiere,
      data.present,
      data.absent,
      data.taux + "%",
    ]);

    autoTable(doc, {
      head: [["Matière", "Présents", "Absents", "Taux de présence"]],
      body: rows,
    });

    doc.save("statistiques_presences.pdf");
  };

  const matieres = Object.entries(groupedPresence);
  const paginated = matieres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(matieres.length / itemsPerPage);
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="m-0 w-full bg-slate-50 h-auto border-gray border-2 p-4">
        <h1 className="text-2xl font-bold mb-4">Statistiques de Présence</h1>
        <div className="flex items-center gap-4 mb-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="semaine">Semaine</option>
            <option value="mois">Mois</option>
            <option value="semestre">Semestre</option>
          </select>

          <button
            onClick={exportPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={matieres.length === 0}
          >
            Exporter en PDF
          </button>
        </div>

        <div className="space-y-4">
          {paginated.map(([matiere, stats]) => (
            <div
              key={matiere}
              className="bg-white shadow-md rounded p-4 border border-gray-300"
            >
              <h2 className="text-xl font-semibold text-blue-500">{matiere}</h2>
              <p>Présents : {stats.present}</p>
              <p>Absents : {stats.absent}</p>
              <p>Taux de présence : {stats.taux}%</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300"
            }`}
          >
            Précédent
          </button>

          <div className="flex space-x-2">
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => goToPage(num)}
                className={`px-3 py-1 rounded ${
                  num === currentPage
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300"
            }`}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
