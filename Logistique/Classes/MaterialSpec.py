from .Caracteristic import Caracteristic

class MaterialSpec():
    def __init__(self, value: str = None, caracteristicDetails: Caracteristic = None):

        self.__value = value
        self.__caracteristicDetails = caracteristicDetails
        print('New Caracteristic')

    def getValue(self):
        return self.__value
    
    def setValue(self,value: str):
        self.__value = value

    def getCaracteristicDetails(self):
        return self.__caracteristicDetails
    
    def setCaracteristicDetails(self,caracteristicDetails: Caracteristic):
        self.__caracteristicDetails = caracteristicDetails