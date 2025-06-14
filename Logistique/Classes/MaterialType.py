from .MaterialSpec import MaterialSpec
from .Identity import Identity
from typing import List

class MaterialType():
    def __init__(self, identity:Identity = None, categoryIdentity:Identity = None, specifications:List[MaterialSpec] = None):        
        self.__identity = identity
        self.__categoryIdentity = categoryIdentity
        self.__specifications = specifications
        print('New MaterialType')

    def getIdentity(self):
        return self.__identity
    
    def setIdentity(self,identity: Identity):
        self.__identity = identity

    def getCategoryIdentity(self):
        return self.__categoryIdentity
    
    def setIdentity(self,identity: Identity):
        self.__identity = identity

    def getSpecifications(self):
        return self.__specifications
    
    def setSpecifications(self,specifications : List[MaterialSpec]):
        self.__specifications = specifications
