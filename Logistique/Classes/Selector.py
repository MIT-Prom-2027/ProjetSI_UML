from extensions import get_db_connection
from flask import jsonify
import json

class Selector:
    def __init__(self):
        print("New Selector")
    
    def getAllCategory(self):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    "select * from materialcategory"
                )
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def getAllMaterialType(self):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM get_material_types()"
                )
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def getTypeForCategory(self, idCategory: int):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM get_material_types() where categoryid = %s",(idCategory)
                )
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500

    def getAllType(self):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM datatype"
                )
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500
    
    def getAllMaterials(self, pattern):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute(
                    "select * from get_materials_by_pattern(%s)",(json.dumps(pattern),)
                )
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500
    
    def getAllStatus(self):
        try:
            connection = get_db_connection()
            with connection.cursor() as cursor:
                cursor.execute("select * from status")
                data = cursor.fetchall()
            return jsonify(data), 200
        except Exception as e:
            print(f"Error: {e}")
            return jsonify({"error": str(e)}), 500       
