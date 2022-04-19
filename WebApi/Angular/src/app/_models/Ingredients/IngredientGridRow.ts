import { IngredientStatusGridRow } from "../IngredientStatuses/IngredientStatusGridRow";

export interface IngredientGridRow {
    id: number;
    createdDateTime: Date;
    modfiedDateTime: Date;
    ingredientName: string;
    ingredientDescription: string;
    ingredientStatus: IngredientStatusGridRow; 
  }
  