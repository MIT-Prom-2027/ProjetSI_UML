from extensions import get_db_connection
from flask import Blueprint, jsonify

class Deleter:
    def __init__(self):
        print("New Deleter")

    def deleteCategory(self, id: int):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                query = "DELETE FROM materialcategory WHERE id = %s"
                cursor.execute(
                    query,
                    (id, )
                )
                connection.commit()
            return jsonify({"message":"Catégorie supprimée avec succès"}), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def deleteMaterialType(self, id: int):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                query = "DELETE FROM materialtype WHERE id = %s"
                cursor.execute(
                    query,
                    (id, )
                )
                connection.commit()
            return jsonify({"message":"Type de matériel supprimé avec succès"}), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500


    
