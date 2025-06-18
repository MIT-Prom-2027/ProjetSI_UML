import { StatutSession } from "./StatutSession";

export interface Session {
  statut: StatutSession;
  setStatut(s: StatutSession): void;
  getStatut(): StatutSession;
}
