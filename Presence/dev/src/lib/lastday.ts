export function lastday() {
  const now = new Date();

  // --- Dernier jour de la semaine (dimanche) ---
  const jourActuel = now.getDay();
  const dernierJourSemaine = new Date(now);
  // On ajoute les jours restants jusqu'à dimanche
  const joursAJouter = 7 - jourActuel;
  dernierJourSemaine.setDate(now.getDate() + joursAJouter);

  // --- Dernier jour du mois ---
  const dernierJourMois = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 0 = dernier jour du mois précédent

  // --- Dernier jour du semestre ---
  const mois = now.getMonth(); // 0 à 11
  let dernierJourSemestre: Date;
  if (mois <= 5) {
    // 1er semestre → fin juin
    dernierJourSemestre = new Date(now.getFullYear(), 6, 0); // 0 = dernier jour de juin
  } else {
    // 2e semestre → fin décembre
    dernierJourSemestre = new Date(now.getFullYear(), 12, 0); // 0 = dernier jour de décembre
  }

  return {
    finSemaine: dernierJourSemaine,
    finMois: dernierJourMois,
    finSemestre: dernierJourSemestre,
  };
}
