from extensions import get_db_connection
from .MaterialType import MaterialType
from .Identity import Identity
from .Caracteristic import Caracteristic
from flask import jsonify
from .Category import Category
from .Material import Material

class Register:
    def __init__(self):
        print("New Register")
    
    def addCategory(self,category:Category):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                query = "insert into materialcategory (name,description) values (%s,%s)"
                cursor.execute(
                    query,
                    (category.getIdentity().getName(),category.getDescription())
                )
                connection.commit()
            return jsonify({"message":"Catégorie inserée avec succès"}), 201
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def addMaterialType(self, mt: MaterialType):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                idmt = cursor.execute(
                    """
                        INSERT INTO materialtype (name, idcategory) values (%s,%s)
                    """,
                    (mt.getIdentity().getName(), mt.getCategoryIdentity().getId())
                )

                for sp in mt.getSpecifications():
                    c = sp.getCaracteristicDetails()
                    idc = cursor.execute(
                        """
                            INSERT INTO caracteristics 
                            (name, pattern, idtype, visible, key, unit, required, unicity) 
                            values (%s,%s,%s,%s,%s,%s,%s,%s)
                        """,
                        (c.getIdentity().getName(),c.getPattern(), c.getDatatype().getId(), c.getVisible(), c.getKey(), c.getUnit(), c.getRequired(), c.getUnicity())
                    )
                    cursor.execute(
                        """
                            INSERT INTO materialtype_caracteristic (idmaterialtype, idcaracteristic) values (%s,%s)
                        """,
                        (idmt,idc)
                    )
                connection.commit()
            return jsonify({"message": "Type de matériel inseré avec succès"}), 201
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def addMaterial(self, m: Material):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                idm = cursor.execute(
                    """
                        INSERT INTO material (acquisitionDate,idstatus,idmaterialtype,idlocation) values (%s,%s,%s,%s) RETURNING id
                    """,
                    (m.getAcquisitionDate(), m.getStatus().getId(), m.getMaterialType().getIdentity().getId(), m.getLocationDetails().getIdentity().getId())
                )
                idm = cursor.fetchone().get('id')
                for ms in m.getMaterialType().getSpecifications():
                    car = ms.getCaracteristicDetails()
                    cursor.execute(
                        """
                            INSERT INTO materialspec (idmaterial, idcaracteristic, value) values (%s,%s,%s)
                        """,
                        (idm, car.getIdentity().getId(), ms.getValue())
                    )
                connection.commit()
            return jsonify({"message": f"Materiel: {idm} inseré avec succès"}), 201
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500
