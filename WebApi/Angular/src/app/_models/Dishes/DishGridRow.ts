import { DishCategoryGridRow } from "../DishCategories/DishCategoryGridRow";
import { DishStatusGridRow } from "../DishStatuses/DishStatusGridRow";

export interface DishGridRow {
  id: number;
  createdDateTime: Date;
  modfiedDateTime: Date;
  dishName: string;
  dishPrice: number;
  dishDescription: string;
  dishStatus: DishStatusGridRow; 
  dishCategory: DishCategoryGridRow;
}
