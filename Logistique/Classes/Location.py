from .Identity import Identity
class Location:
    def __init__(self, identity: Identity = None, area : int = None):
        self.__identity = identity
        self.__area = area
        print('New Identity')

    def getIdentity(self):
        return self.__identity
    
    def setIdentity(self,identity: Identity):
        self.__identity = identity

    def getArea(self):
        return self.__area
    
    def setArea(self,area: int):
        self.__area = area