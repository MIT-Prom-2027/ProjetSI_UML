import { StatutSession } from "./StatutSession";
import jwt from 'jsonwebtoken'

export class SessionApp {
  constructor() {
    
  }

  public setStatut(s: StatutSession): string {
    const SECRET_KEY = process.env.SECRET_KEY || "dddddd"

    const payload = { statut: s };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    console.log("Session JWT:", token);
    s = s === StatutSession.Active ? StatutSession.Desactive : StatutSession.Active;
    return token;
  }
  
}

