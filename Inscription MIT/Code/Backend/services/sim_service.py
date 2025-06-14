import os
import requests
from requests_toolbelt.multipart.encoder import MultipartEncoder


class SimService:
    def send_it(token: str, to: str, content: list[str]) -> bool:
        for val in content:
            data = MultipartEncoder(
                fields={
                    'Recipient': to,
                    'Message': val,
                    'Channel': 'sms'
                }
            )
            headers = {
                'Authorization': token,
                'Content-Type': data.content_type
            }

            try:
                response = requests.post(
                    'https://messaging.mapi.mg/api/msg/send',
                    headers=headers,
                    data=data
                )
                print(response.json())
            except requests.RequestException as e:
                print("Erreur lors de l'envoi :", e)
                return False
        return True

    def log_out(token: str) -> None:
        headers = {
            'Authorization': token
        }
        try:
            response = requests.post(
                'https://messaging.mapi.mg/api/authentication/logout',
                headers=headers
            )
            print(response.json())
        except requests.RequestException as e:
            print("Erreur lors de la déconnexion :", e)

    def send_sms(to: str, content: str) -> bool:
        result = [content[i:i + 150] for i in range(0, len(content), 150)]

        data = MultipartEncoder(
            fields={
                'Username': os.getenv('SMS_NAME', ''),
                'Password': os.getenv('SMS_PWD', '')
            }
        )

        headers = {
            'Content-Type': data.content_type
        }

        try:
            response = requests.post(
                'https://messaging.mapi.mg/api/authentication/login',
                headers=headers,
                data=data
            )
            print(response.json())
            token = response.json().get('token')
            if token:
                if send_it(token, to, result):
                    log_out(token)
            return True
        
        except requests.RequestException as e:
            print("Erreur lors de l'authentification :", e)
            return False

    def envoyer_lien_badge(self, tel, lien):
        return send_sms(tel, lien)

    def envoyer_lien_rectification(self, tel, lien, champs_incorrects):
        return send_sms(tel, lien, champs_incorrects)