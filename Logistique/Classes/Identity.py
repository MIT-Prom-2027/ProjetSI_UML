class Identity:
    def __init__(self, id: int = None, name: str = None):
        self.__id = id
        self.__name = name
        print('New Identity')

    def setId(self, id: int):
        self.__id = id

    def setName(self, name: str):
        self.__name = name

    def getId(self):
        return self.__id

    def getName(self):
        return self.__name

