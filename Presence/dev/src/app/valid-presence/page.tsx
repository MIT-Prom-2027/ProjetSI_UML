"use client";
import AppSidebar from "@/components/custom/Appsidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDate } from "@/lib/getdate";

interface docourseInterface2 {
  id: string;
  date_deb: string;
  date_fin: string;
  id_matiere: string;
  has_matiere: hasmatiere;
}
interface hasmatiere {
  id: string;
  titre: string;
}
interface dopresence {
  id: string;
  nom: string;
  prenom: string;
  mdp: string;
  email: string;
  role: string;
}
interface presenceInterface2 {
  to_course: docourseInterface2;
  do_presence: dopresence;
  id: string;
  id_cours: string;
  id_etudiant: string;
  is_valid: Boolean;
  status: string;
}
interface matierelistInterface {
  id: string;
  titre: string;
}

interface historiqueInterface {
  etudiant?: string;
  matiere?: string;
  date?: Date;
}

export default function Page() {
  const [isfiltered, setisfiltered] = useState(false);
  const [data, setdata] = useState<historiqueInterface>({});
  const [presencetable, setpresencetable] = useState<presenceInterface2[]>([]);
  const [allpresence, setallpresence] = useState<presenceInterface2[]>();
  const [matierelist, setmatierelist] = useState<matierelistInterface[]>();
  const [selectedmatiere, setselectedmatiere] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [isactive, setisactive] = useState<Boolean>(false);
  const [selectedstudent, setselectedstudent] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestData: any = {};

    if (data?.etudiant && data.etudiant.trim() !== "") {
      requestData.etudiant = data.etudiant.trim();
    }

    if (data?.matiere && data.matiere !== "") {
      requestData.matiere = data.matiere;
    }

    if (data?.date) {
      const dateInMadagascar = new Date(
        data.date.getTime() - data.date.getTimezoneOffset() * 60000
      );
      dateInMadagascar.setHours(dateInMadagascar.getHours() + 3);
      requestData.date = dateInMadagascar.toISOString();
    }

    setisfiltered(true);

    const response = await fetch("http://localhost:3000/api/presence/history", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const result = await response.json();
      const finaldata = result as presenceInterface2[];
      setpresencetable(finaldata);
    } else {
      setpresencetable([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value !== "") {
      setselectedstudent(value);
      setdata((prev) => ({ ...prev, [e.target.name]: value }));
    } else {
      setselectedstudent(undefined);
      setdata((prev) => {
        const newData = { ...prev };
        delete newData[e.target.name as keyof historiqueInterface];
        return newData;
      });
    }
  };
  const handleConfirm = (id: string) => {
    const handleConfirmPresence = async () => {
      const response = await fetch(
        "http://localhost:3000/api/presence/validation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_presence: id, is_valid: true }),
        }
      );
      if (response.ok) {
        alert("Confirmé");
        window.location.reload();
      } else {
        alert("erreur");
      }
    };
    handleConfirmPresence();
  };
  const handleReject = (id: string) => {
    const handleRejectPresence = async () => {
      const response = await fetch(
        "http://localhost:3000/api/presence/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_presence: id, status: "Absent" }),
        }
      );
      if (response.ok) {
        alert("Rejeté");
        window.location.reload();
      } else {
        alert("erreur");
      }
    };
    handleRejectPresence();
  };
  const handleResetFilters = () => {
    setisfiltered(false);
    setpresencetable([]);
    setselectedstudent(undefined);
    setselectedmatiere(undefined);
    setDate(undefined);
    setdata({});
  };

  useEffect(() => {
    if (selectedmatiere && selectedmatiere !== "") {
      setdata((prev) => ({ ...prev, matiere: selectedmatiere }));
    } else {
      setdata((prev) => {
        const newData = { ...prev };
        delete newData.matiere;
        return newData;
      });
    }
  }, [selectedmatiere]);

  useEffect(() => {
    if (date) {
      setdata((prev) => ({ ...prev, date: new Date(date) }));
    } else {
      setdata((prev) => {
        const newData = { ...prev };
        delete newData.date;
        return newData;
      });
    }
  }, [date]);

  useEffect(() => {
    const hasStudent = selectedstudent && selectedstudent.trim() !== "";
    const hasMatiere = selectedmatiere && selectedmatiere !== "";
    const hasDate = date !== undefined;

    setisactive(hasStudent || hasMatiere || hasDate);
  }, [selectedstudent, selectedmatiere, date]);

  useEffect(() => {
    const handlematiere = async () => {
      const response = await fetch(
        "http://localhost:3000/api/matiere/getlist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        setmatierelist(result as matierelistInterface[]);
      }
    };
    const handleAllpres = async () => {
      const response = await fetch(
        "http://localhost:3000/api/presence/toconfirm",
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setallpresence(result as presenceInterface2[]);
      }
    };
    handlematiere();
    handleAllpres();
  }, []);

  return (
    <div className="flex">
      <AppSidebar />
      <div className="m-0 w-full bg-slate-50 h-[800px] border-gray border-2">
        <h1 className="ml-10 text-red-600 text-md mt-10">
          Validation présence
        </h1>
        <Label className="text-gray-400 ml-10 mt-2">Valider la présence</Label>

        <form className="md:flex mt-20 w-full mx-auto" onSubmit={handleSubmit}>
          <div className="ml-30">
            <Label>Nom Etudiant</Label>
            <Input
              className="mt-5 w-[250px]"
              placeholder="Entrez un nom ou prenom"
              name="etudiant"
              value={selectedstudent || ""}
              onChange={handleChange}
            />
          </div>
          <div className="ml-20">
            <Label>Matière</Label>
            <Select
              onValueChange={(value) => setselectedmatiere(value)}
              value={selectedmatiere || ""}
            >
              <SelectTrigger className="w-[250px] bg-white mt-5">
                <SelectValue placeholder="Sélectionnez une matière" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Matières</SelectLabel>
                  {matierelist?.map((item, index) => (
                    <SelectItem value={item.titre} key={index}>
                      {item.titre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-20">
            <Label>Calendrier</Label>
            <Popover>
              <PopoverTrigger asChild className="mt-5">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-slate-200 focus:border-blue-500",
                    !date && "text-slate-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? new Date(date).toLocaleDateString()
                    : "Sélectionner une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="ml-20 flex flex-col gap-2">
            <Button
              className="w-[250px] bg-blue-500 text-white mt-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="submit"
              disabled={!isactive}
            >
              Filtrer
            </Button>

            {isfiltered && (
              <Button
                type="button"
                variant="outline"
                className="w-[250px]"
                onClick={handleResetFilters}
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </form>

        <div>
          {isfiltered ? (
            presencetable && presencetable.length > 0 ? (
              presencetable.map((presence) => (
                <Card key={presence.id} className="mx-20 h-[150px]">
                  <CardTitle className="text-xl text-blue-500 ml-5">
                    {presence.do_presence.nom} {presence.do_presence.prenom}
                  </CardTitle>
                  <CardContent className="flex">
                    <Label>{presence.to_course.has_matiere.titre}</Label>
                    <Label className="ml-10">
                      {getDate(presence.to_course.date_deb)}-
                      {getDate(presence.to_course.date_fin)}
                    </Label>
                    <Label className="ml-auto">
                      <Badge
                        variant={
                          presence.status == "Present"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {presence.status}
                      </Badge>
                      <div className="flex ml-20 gap-x-5">
                        <Button onClick={() => handleConfirm(presence.id)}>
                          Confirm
                        </Button>
                        <Button onClick={() => handleReject(presence.id)}>
                          Reject
                        </Button>
                      </div>
                    </Label>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500 text-lg italic">
                  Aucun résultat trouvé pour les critères sélectionnés
                </p>
              </div>
            )
          ) : (allpresence?.length ?? 0) > 0 ? (
            allpresence?.map((presence) => (
              <Card key={presence.id} className="mx-20 mt-10 h-[150px]">
                <CardTitle className="text-xl text-blue-500 ml-5">
                  {presence.do_presence.nom} {presence.do_presence.prenom}
                </CardTitle>
                <CardContent className="flex">
                  <Label>{presence.to_course.has_matiere.titre}</Label>
                  <Label className="ml-10">
                    {getDate(presence.to_course.date_deb)}-
                    {getDate(presence.to_course.date_fin)}
                  </Label>
                  <Label className="ml-auto">
                    <Badge
                      variant={
                        presence.status == "Present"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {presence.status}
                    </Badge>

                    <div className="flex ml-20 gap-x-5">
                      <Button onClick={() => handleConfirm(presence.id)}>
                        Confirm
                      </Button>
                      <Button
                        onClick={() => handleReject(presence.id)}
                        variant={"outline"}
                      >
                        Reject
                      </Button>
                    </div>
                  </Label>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 text-lg italic">
                Aucune présence dans la bd
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
