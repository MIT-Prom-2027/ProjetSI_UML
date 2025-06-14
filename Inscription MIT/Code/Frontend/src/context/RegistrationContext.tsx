import React, { createContext, useContext, useState, useEffect } from "react";
import {
  RegistrationState,
  SchoolYear,
  StudentFile,
  RegistrationPeriod,
} from "@/lib/types";
import get from "@/lib/get";

interface RegistrationContextType {
  registrationState: RegistrationState;
  userRole: "admin" | "student" | null;
  setUserRole: (role: "admin" | "student" | null) => void;
  startRegistrationProcess: () => void;
  setSchoolYear: (schoolYear: SchoolYear) => void;
  addUploadedFile: (file: StudentFile) => void;
  removeUploadedFile: (fileId: string) => void;
  setRegistrationPeriod: (period: RegistrationPeriod) => void;
  completeRegistrationSetup: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  endRegistration: () => void;
  updateRegistrationEndDate: (endDate: Date) => void;
  resetRegistrationState: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined,
);

const initialState: RegistrationState = {
  isActive: false,
  currentStep: 0,
  uploadedFiles: [],
  schoolYear:{
    id_annee_univ:""
  }
};

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [registrationState, setRegistrationState] = useState<RegistrationState>(initialState);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = `http://localhost:${import.meta.env.VITE_PORT_BACKEND}${import.meta.env.VITE_ADMIN_API}${import.meta.env.VITE_CURRENT_YEAR_API}`
        const data = await get(url);
        if(data.current_year.isActive){
          setRegistrationState((prev) => ({
            ...prev,
            schoolYear:{
              ...prev.schoolYear,
              id_annee_univ:data.current_year.school_year.id_annee_univ,
            },
            registrationPeriod: data.current_year.registration_period,
            isActive: true,
          }));
        }

      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if(registrationState.schoolYear.id_annee_univ==""){
      fetchCourses();    
      console.log("HELLO");      
    }
  },[]);

  const [userRole, setUserRole] = useState<"admin" | "student" | null>(() => {
    const saved = localStorage.getItem("userRole");
    return saved as "admin" | "student" | null;
  });

  // Save to localStorage whenever state changes
  // useEffect(() => {
  //   localStorage.setItem(
  //     "registrationState",
  //     JSON.stringify(registrationState),
  //   );
  // }, [registrationState]);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]);

  const startRegistrationProcess = () => {
    setRegistrationState((prev) => ({
      ...prev,
      isActive: true,
      currentStep: 1,
    }));
  };

  const setSchoolYear = (schoolYear: SchoolYear) => {
    setRegistrationState((prev) => ({
      ...prev,
      schoolYear,
    }));
  };

  const addUploadedFile = (file: StudentFile) => {
    setRegistrationState((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, file],
    }));
  };

  const removeUploadedFile = (fileId: string) => {
    setRegistrationState((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((f) => f.id !== fileId),
    }));
  };

  const setRegistrationPeriod = (period: RegistrationPeriod) => {
    setRegistrationState((prev) => ({
      ...prev,
      registrationPeriod: period,
    }));
  };

  const completeRegistrationSetup = () => {
    setRegistrationState((prev) => ({
      ...prev,
      currentStep: 4,
      isActive: true,
    }));
  };

  const goToNextStep = () => {
    setRegistrationState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }));
  };

  const goToPreviousStep = () => {
    setRegistrationState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  };

  const endRegistration = () => {
    setRegistrationState((prev) => ({
      ...prev,
      isActive: false,
      currentStep: 0,
    }));
  };

  const updateRegistrationEndDate = (endDate: Date) => {
    setRegistrationState((prev) => ({
      ...prev,
      registrationPeriod: prev.registrationPeriod
        ? {
            ...prev.registrationPeriod,
            endDate,
          }
        : undefined,
    }));
  };

  const resetRegistrationState = () => {
    setRegistrationState(initialState);
    localStorage.removeItem("registrationState");
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrationState,
        userRole,
        setUserRole,
        startRegistrationProcess,
        setSchoolYear,
        addUploadedFile,
        removeUploadedFile,
        setRegistrationPeriod,
        completeRegistrationSetup,
        goToNextStep,
        goToPreviousStep,
        endRegistration,
        updateRegistrationEndDate,
        resetRegistrationState,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider",
    );
  }
  return context;
};
