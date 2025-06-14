import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, CheckCircle, XCircle, Settings, Calendar } from "lucide-react";
import { MOCK_STUDENTS } from "@/lib/data";
import StudentList from "./StudentList";
import { useRegistration } from "@/context/RegistrationContext";
import AdminInscriptionInfo from "./admin-inscription/AdminDashboard";
import { AdminData } from "@/lib/types";
import get from "@/lib/get";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const [datas, setDatas] = useState<AdminData>()
  const { registrationState } =
    useRegistration();
  const isRegistrationActive = 
    registrationState.isActive && registrationState.currentStep === 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ADMIN_API}${import.meta.env.VITE_DASHBOARD}`  
        console.log("Test");
        
        console.log(url);
        
        let data = await get(url);
        setDatas(data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, []);

  console.log(datas);
  

  const stats = [
    {
      key:1,
      title: "En attente de validation",
      count: datas && datas.valid && datas.pending.length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      tab: "pending",
    },
    {
      key:2,
      title: "Validées",
      count: datas && datas.valid && datas.valid.length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      tab: "validated",
    },
    {
      key:3,
      title: "Non validées",
      count: datas && datas.valid && datas.invalid.length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      tab: "rejected",
    },
    {
      key:4,
      title: "Statut inscription",
      value: isRegistrationActive ? "Ouverte" : "Fermée",
      icon: isRegistrationActive ? CheckCircle : XCircle,
      color: isRegistrationActive ? "text-green-600" : "text-red-600",
    },    
  ];  

  const handleStartNewRegistration = () => {
    navigate("/admin-inscription/start-registration");
  };

  if(datas==undefined || !datas)return <></>


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Administration
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Site étudiant
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
            </div>
            {!isRegistrationActive && (
              <Button onClick={handleStartNewRegistration} size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Démarrer nouvelle inscription
              </Button>
            )}          
          </div>          
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Inscription Information */}
          <AdminInscriptionInfo/>
        {/* Dashboard Overview */}
        <div className="my-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card
                key={stat.key}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  {
                    stat.count && <p className="text-xs text-gray-500 mt-1">
                    {stat.count === 1 ? "inscription" : "inscriptions"}
                  </p>
                  }
                  <CardTitle>{stat.value}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
          <>
          {/* Inscriptions Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Gestion des inscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="pending"
                    className="flex items-center space-x-2"
                  >
                    <Clock className="h-4 w-4" />
                    <span>En attente</span>
                    <Badge variant="secondary">{datas.pending.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="validated"
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Validées</span>
                    <Badge variant="secondary">{datas.valid.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="rejected"
                    className="flex items-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Non validées</span>
                    <Badge variant="secondary">{datas.invalid.length}</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  <StudentList
                    students={datas.pending}
                    status='en attente'
                    title="Inscriptions en attente de validation"
                  />
                </TabsContent>

                <TabsContent value="validated" className="mt-6">
                  <StudentList
                    students={datas.valid}
                    status='validé'
                    title="Inscriptions validées"
                  />
                </TabsContent>

                <TabsContent value="rejected" className="mt-6">
                  <StudentList
                    students={datas.invalid}
                    status='Rejetté'
                    title="Inscriptions non validées"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      </main>
    </div>
  );
}
