import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app
import logging

class EmailService:
    def __init__(self):
        self.smtp_server = current_app.config.get('MAIL_SERVER')
        self.smtp_port = current_app.config.get('MAIL_PORT')
        self.username = current_app.config.get('MAIL_USERNAME')
        self.password = current_app.config.get('MAIL_PASSWORD')
        self.use_tls = current_app.config.get('MAIL_USE_TLS')
    
    def _send_email(self, to_email, subject, body_html, body_text=None):
        """Méthode privée pour envoyer un email"""
        try:
            # Créer le message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.username
            msg['To'] = to_email
            
            # Ajouter le contenu texte si fourni
            if body_text:
                part1 = MIMEText(body_text, 'plain', 'utf-8')
                msg.attach(part1)
            
            # Ajouter le contenu HTML
            part2 = MIMEText(body_html, 'html', 'utf-8')
            msg.attach(part2)
            
            # Envoyer l'email
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            if self.use_tls:
                server.starttls()
            server.login(self.username, self.password)
            server.send_message(msg)
            server.quit()
            
            return True
            
        except Exception as e:
            logging.error(f"Erreur lors de l'envoi d'email: {str(e)}")
            return False
    
    def envoyer_lien_badge(self, email, lien):
        """Envoie le lien du badge à l'étudiant après validation"""
        subject = "Félicitations ! Votre inscription a été validée"
        
        body_html = f"""
        <html>
        <body>
            <h2>Félicitations !</h2>
            <p>Votre inscription à l'université a été validée avec succès.</p>
            <p>Vous pouvez télécharger votre badge d'étudiant en cliquant sur le lien ci-dessous :</p>
            <p><a href="{lien}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Télécharger mon badge</a></p>
            <p>Bienvenue dans notre université !</p>
            <br>
            <p>Cordialement,<br>L'équipe administrative</p>
        </body>
        </html>
        """
        
        body_text = f"""
        Félicitations !
        
        Votre inscription à l'université a été validée avec succès.
        
        Vous pouvez télécharger votre badge d'étudiant via ce lien : {lien}
        
        Bienvenue dans notre université !
        
        Cordialement,
        L'équipe administrative
        """
        
        return self._send_email(email, subject, body_html, body_text)
    
    def envoyer_lien_rectification(self, email, lien, champs_incorrects):
        """Envoie le lien de rectification après rejet"""
        subject = "Rectification nécessaire pour votre inscription"
        
        champs_list = "<ul>" + "".join([f"<li>{champ}</li>" for champ in champs_incorrects]) + "</ul>"
        
        body_html = f"""
        <html>
        <body>
            <h2>Rectification nécessaire</h2>
            <p>Votre inscription nécessite des corrections sur les éléments suivants :</p>
            {champs_list}
            <p>Veuillez cliquer sur le lien ci-dessous pour effectuer les corrections :</p>
            <p><a href="{lien}" style="background-color: #FF9800; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Corriger mon inscription</a></p>
            <p>Une fois les corrections effectuées, votre dossier sera réexaminé.</p>
            <br>
            <p>Cordialement,<br>L'équipe administrative</p>
        </body>
        </html>
        """
        
        body_text = f"""
        Rectification nécessaire
        
        Votre inscription nécessite des corrections sur les éléments suivants :
        {', '.join(champs_incorrects)}
        
        Veuillez utiliser ce lien pour effectuer les corrections : {lien}
        
        Une fois les corrections effectuées, votre dossier sera réexaminé.
        
        Cordialement,
        L'équipe administrative
        """
        
        return self._send_email(email, subject, body_html, body_text)