import {Prevision} from "./Prevision"
import {User} from "./User"

export class Vote {

  public id: number
  public proposition: Prevision
  public dateVote: Date
  public resultatVote: number
  public users: User[]
  constructor() {}

  soumettre(user, vote): void {
    if (!this.users.includes(user)){
      if (vote){
        this.resultatVote += 1 
      }else{
        this.resultatVote -= 1
      }
    }
  }

  voirResultat(): String {
    let resultat = ""
    if (this.resultatVote<0){
      resultat = "valide"
    }
    if (this.resultatVote>0){
      resultat = "non valide"
    }
    if (this.resultatVote==0){
      resultat = "null"
    }

    return resultat
  }
}
  