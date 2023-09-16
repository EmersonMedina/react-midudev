import { WINNING_COMBINATIONS } from "../constants"

export const checkWinner = (boardToCheck) => {
    //Revisar todas las combinaciones ganadoras para ver si X o U ganó 
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a] 
      } 
    }
    //Si no hay ganador
    return null
}


export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every(square => square != null)
}