export function firstday() {
  const now = new Date();

  // --- Début de la semaine (lundi) ---
  const jourActuel = now.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const debutSemaine = new Date(now);
  const decalageLundi = jourActuel === 0 ? -6 : 1 - jourActuel;
  debutSemaine.setDate(now.getDate() + decalageLundi);
  debutSemaine.setHours(0, 0, 0, 0); // Remise à zéro de l'heure

  // --- Début du mois ---
  const debutMois = new Date(now.getFullYear(), now.getMonth(), 1);
  debutMois.setHours(0, 0, 0, 0); // Remise à zéro de l'heure

  // --- Début du semestre ---
  const mois = now.getMonth(); // 0 = janvier, 6 = juillet
  let debutSemestre: Date;
  if (mois <= 5) {
    // 1er semestre → début janvier
    debutSemestre = new Date(now.getFullYear(), 0, 1);
  } else {
    // 2e semestre → début juillet
    debutSemestre = new Date(now.getFullYear(), 6, 1);
  }
  debutSemestre.setHours(0, 0, 0, 0); // Heure à 00:00:00

  return {
    debutSemaine: debutSemaine,
    debutMois: debutMois,
    debutSemestre: debutSemestre,
  };
}
