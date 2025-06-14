from extensions import get_db_connection
from flask import Blueprint, jsonify
from .Category import Category
from .MaterialType import MaterialType
from .Identity import Identity

class Modifier:
    def __init__(self):
        print("New Modifier")
    
    def updateStatus(self, id: int, status: Identity):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                query = "UPDATE material SET statusid = %s WHERE id = %s"
                cursor.execute(
                    query,
                    (status.getId(), id)
                )
                connection.commit()
            return jsonify({"message":"Catégorie modifiée avec succès"}), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def updateCategory(self, category: Category):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                query = "UPDATE materialcategory SET name = %s, description = %s WHERE id = %s"
                cursor.execute(
                    query,
                    (category.getIdentity().getName(), category.getDescription(), category.getIdentity().getId())
                )
                connection.commit()
            return jsonify({"message":"Catégorie modifiée avec succès"}), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def updateMaterialType(self, mt: MaterialType):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                print((mt.getIdentity().getName(), mt.getCategoryIdentity().getId(), mt.getIdentity().getId()))
                idmt = cursor.execute(
                    """
                        UPDATE materialtype SET name = %s, idcategory = %s WHERE id = %s
                    """,
                    (mt.getIdentity().getName(), mt.getCategoryIdentity().getId(), mt.getIdentity().getId())
                )

                for sp in mt.getSpecifications():
                    c = sp.getCaracteristicDetails()
                    print((c.getIdentity().getName(),c.getPattern(), c.getDatatype().getId(), c.getVisible(), c.getKey(), c.getUnit(), c.getRequired(), c.getUnicity(), c.getIdentity().getId()))
                    idc = cursor.execute(
                        """
                            UPDATE caracteristics SET
                                name = %s, 
                                pattern = %s, 
                                idtype = %s, 
                                visible = %s, 
                                key = %s, 
                                unit = %s, 
                                required = %s, 
                                unicity = %s
                            WHERE id = %s
                        """,
                        (c.getIdentity().getName(),c.getPattern(), c.getDatatype().getId(), c.getVisible(), c.getKey(), c.getUnit(), c.getRequired(), c.getUnicity(), c.getIdentity().getId())
                    )
                connection.commit()
            return jsonify({"message": "Type de matériel inseré avec succès"}), 201
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500
