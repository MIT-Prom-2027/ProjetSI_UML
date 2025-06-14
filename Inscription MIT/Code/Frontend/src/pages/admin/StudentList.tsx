import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Etudiant, Inscription, ParcourLevelType, Student, StudyLevelType } from "@/lib/types";
import { STUDY_LEVELS, COURSES } from "@/lib/data";
import { Search, Filter, Eye, Check, X } from "lucide-react";
import get from "@/lib/get";

interface StudentListProps {
  students: Inscription[];
  status: 'en attente' | 'validé'| 'Rejetté';
  title: string;
}

export default function StudentList({
  students,
  status,
  title,
}: StudentListProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [levels,setLevels] = useState<StudyLevelType[]>();
  const [courses,setCourses] = useState<ParcourLevelType[]>();  
  const [selectedStudents, setSelectedStudents] = useState<Set<Number>>(
    new Set(),
  );

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.etudiantInfo.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.etudiantInfo.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.etudiantInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.etudiantInfo.num_inscription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        levelFilter === "all" || student.levelId.niv === levelFilter;
      const matchesCourse =
        courseFilter === "all" || student.courseId.parcour === courseFilter;

      return matchesSearch && matchesLevel && matchesCourse;
    });
  }, [students, searchTerm, levelFilter, courseFilter]);

  // Available courses based on selected level
  const availableCourses = useMemo(async() => {
    const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ETUDIANT_API}${import.meta.env.VITE_PARCOURS_API}${levelFilter}`
    let data = await get(url);
    setCourses(data)
  }, [levelFilter]);
// 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_API_API}${import.meta.env.VITE_DASHBOARD}`  
        let data = await get(url);
        setLevels(data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  const handleStudentSelect = (studentId: Number, checked: boolean) => {
    const newSelected = new Set(selectedStudents);
    if (checked) {
      newSelected.add(studentId);
    } else {
      newSelected.delete(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(new Set(filteredStudents.map((s) => s.id_inscription)));
    } else {
      setSelectedStudents(new Set());
    }
  };

  const handleValidateSelected = () => {
    // In a real app, this would make API calls
    console.log("Validating students:", Array.from(selectedStudents));
    setSelectedStudents(new Set());
  };

  const handleRejectSelected = () => {
    // In a real app, this would make API calls
    console.log("Rejecting students:", Array.from(selectedStudents));
    setSelectedStudents(new Set());
  };

  const getStatusBadge = (studentStatus: string) => {
    switch (studentStatus) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            En attente
          </Badge>
        );
      case "validated":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Validé
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejeté
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtres et recherche</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, prénom, email ou numéro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level.id_niveau} value={level.id_niveau+""}>
                    {level.niv}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Tous les parcours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les parcours</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id_parcour} value={course.id_parcour+""}>
                    {course.parcour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions (only for pending status) */}
      {status === "en attente" && selectedStudents.size > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedStudents.size} étudiant(s) sélectionné(s)
              </span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleValidateSelected}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Valider
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRejectSelected}
                >
                  <X className="h-4 w-4 mr-2" />
                  Rejeter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Badge variant="outline">
              {filteredStudents.length} résultat(s)
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun étudiant trouvé avec les critères sélectionnés.
            </div>
          ) : (
            <div className="space-y-1">
              {/* Header with select all for pending status */}
              {status === 'en attente' && (
                <div className="flex items-center space-x-4 py-3 px-4 bg-gray-50 rounded-lg mb-4">
                  <Checkbox
                    checked={
                      selectedStudents.size === filteredStudents.length &&
                      filteredStudents.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Sélectionner tout
                  </span>
                </div>
              )}

              {filteredStudents.map((student) => (
                <div
                  key={student.id_inscription+""}
                  className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {/* Checkbox for pending status */}
                  {status === 'en attente' && (
                    <Checkbox
                      checked={selectedStudents.has(student.id_inscription)}
                      onCheckedChange={(checked) =>
                        handleStudentSelect(student.id_inscription, checked as boolean)
                      }
                    />
                  )}

                  {/* Avatar */}
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {student.etudiantInfo.prenom[0]}
                      {student.etudiantInfo.nom[0]}
                    </AvatarFallback>
                  </Avatar>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {student.etudiantInfo.prenom} {student.etudiantInfo.nom}
                      </h3>
                      {getStatusBadge(student.statut)}
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{student.levelId.niv}</span>
                      <span>•</span>
                      <span className="truncate">
                        {student.courseId.parcour}
                      </span>
                      <span>•</span>
                      <span>{student.etudiantInfo.num_inscription}</span>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="hidden md:block text-sm text-gray-500">
                    {student.date_soumission.toLocaleDateString("fr-FR")}
                  </div>

                  {/* View Details Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/admin/student/${student.id_inscription}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
