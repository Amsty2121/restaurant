import { Ingredient } from "../Ingredients/Ingredient";

export interface Dish {
    id: number;
    dishName: string;
    dishPrice: number;
    dishDescription: string;
    dishStatusId: number;
    dishStatusName: string; 
    dishCategoryId: number;
    dishCategoryName: string;
    ingredientsId: number[];
  }
  