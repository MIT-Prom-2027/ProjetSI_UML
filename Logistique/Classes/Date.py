class Date:
  def __init__(self, date: str):
    try:
      datetime.strptime(date, "%Y-%m-%d")
      self.__date = date
    except ValueError:
      raise ValueError(f"Date invalide ou format incorrect : '{date}' (attendu: YYYY-MM-DD)")


  def getDate(self):
    return self.__date