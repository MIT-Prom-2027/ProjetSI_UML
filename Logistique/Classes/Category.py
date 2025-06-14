from .Identity import Identity
class Category:
  def __init__(self,identity: Identity = None,description: str = None):
    self.__identity = identity
    self.__description = description
    print('New category')
  
  def setIdentity(self, identity: Identity):
    self.__identity = identity
  
  def setDescription(self, description):
    self.__description = description

  def getIdentity(self):
    return self.__identity

  def getDescription(self):
    return self.__description