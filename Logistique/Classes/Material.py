from .Date import Date
from .Location import Location
from .MaterialType import MaterialType
from .Identity import Identity

class Material:
    def __init__(self, id: str = None, locationDetails: Location = None, registrationDate: Date = None,
                 acquisitionDate: Date = None, status: Identity = None, materialType: MaterialType = None):
        self.__id = id
        self.__locationDetails = locationDetails
        self.__registrationDate: Date = registrationDate
        self.__acquisitionDate: Date = acquisitionDate
        self.__status: Identity = status
        self.__materialType: MaterialType = materialType
        print("New material")

    def getId(self):
        return self.__id

    def setId(self, id: str):
        self.__id = id

    def getLocationDetails(self):
        return self.__locationDetails

    def setLocationDetails(self, locationDetails:Location):
        self.__locationDetails = locationDetails

    def getRegistrationDate(self):
        return self.__registrationDate

    def setRegistrationDate(self, registrationDate:Date):
        self.__registrationDate = registrationDate

    def getAcquisitionDate(self):
        return self.__acquisitionDate

    def setAcquisitionDate(self, acquisitionDate: Date):
        self.__acquisitionDate = acquisitionDate

    def getStatus(self):
        return self.__status

    def setStatus(self, status: Identity):
        self.__status = status

    def getMaterialType(self):
        return self.__materialType

    def setMaterialType(self, materialType: MaterialType):
        self.__materialType = materialType


    

