from .Identity import Identity

class Caracteristic:
    def __init__(self, identity: Identity = None,pattern: str = None,unit: str = None,visible: bool = None,unicity:bool = None,key: bool = None,required:bool = None, datatype: Identity = None):

        self.__identity: Identity = identity
        self.__pattern = pattern
        self.__unit = unit
        self.__visible = visible
        self.__unicity = unicity
        self.__key = key
        self.__required = required
        self.__datatype: Identity = datatype
        print('New Caracteristic')

    def getIdentity(self):
        return self.__identity

    def setIdentity(self, identity:Identity):
        self.__identity = identity

    def getPattern(self):
        return self.__pattern

    def setPattern(self, pattern:str):
        self.__pattern = pattern

    def getUnit(self):
        return self.__unit

    def setUnit(self, unit:str):
        self.__unit = unit

    def getVisible(self):
        return self.__visible

    def setVisible(self, visible:bool):
        self.__visible = visible
    
    def getUnicity(self):
        return self.__unicity

    def setUnicity(self, unicity:bool):
        self.__unicity = unicity

    def getRequired(self):
        return self.__required

    def setRequired(self, required:bool):
        self.__required = required

    def getKey(self):
        return self.__key

    def setKey(self, key:bool):
        self.__key = key

    def getDatatype(self):
        return self.__datatype

    def setDatatype(self, datatype:Identity):
        self.__datatype = datatype