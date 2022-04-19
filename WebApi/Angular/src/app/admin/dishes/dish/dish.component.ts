import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { IngredientService } from './../../../_services/ingredient.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientStatus } from 'src/app/_models/IngredientStatuses/IngredientStatus';
import { Ingredient } from 'src/app/_models/Ingredients/Ingredient';
import { IngredientStatusService } from 'src/app/_services/ingredient-status.service';
import { MatSelectModule} from '@angular/material/select'; 
import { DishCategory } from 'src/app/_models/DishCategories/DishCategory';
import { DishStatus } from 'src/app/_models/DishStatuses/DishStatus';
import { DishService } from 'src/app/_services/dish.service';
import { DishStatusService } from 'src/app/_services/dish-status.service';
import { DishCategoryService } from 'src/app/_services/dish-category.service';
import { Dish } from 'src/app/_models/Dishes/Dish';
import { IngredientService } from 'src/app/_services/ingredient.service';

@Component({
  selector: 'appdish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
})
export class DishComponent implements OnInit {
  pageTitle!: string;
  dishForm!: FormGroup;
  dishStatuses!: DishStatus[];
  dishStatus!:DishStatus;
  dishCategories!: DishCategory[];
  dishCategory!:DishCategory;
  ingredients!: Ingredient[];
  dish!:Dish;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dishService: DishService,
    private dishStatusService: DishStatusService,
    private dishCategoryService: DishCategoryService,
    private ingredientService: IngredientService

  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      this.getDish(objectId);
        this.pageTitle = 'Edit Dish:'
    });

    this.dishService.getDish(objectId)
    .subscribe((dish:Dish)=> {
      this.dish = dish;
    })

    this.ingredientService.getAllIngredients()
    .subscribe((ingredients:Ingredient[])=> {
      this.ingredients = ingredients
    });
    
    
    this.dishStatusService.getAllDishStatuses()
      .subscribe((dishStatuses:DishStatus[])=>
      this.dishStatuses = dishStatuses);

    this.dishCategoryService.getAllDishCategories()
      .subscribe((dishCategories:DishCategory[])=>
      this.dishCategories = dishCategories);

    this.dishForm = this.fb.group({
      id: [objectId],
      dishName: [
        '',
      ],
      dishPrice: [
        '',
      ],
      dishDescription: [
        '',
      ],
      dishStatusId: [
        '',
      ],
      dishCategoryId: [
        '',
      ],
      ingredientsId: [
        '',
      ],
    });
  }

  chosedStatus?:DishStatus;
  ChosedStatus(value: DishStatus):void{
        this.chosedStatus = value;
        /*console.log(this.chosedStatus.dishStatusName);*/}

  chosedCategory?:DishCategory;
  ChosedCategory(value: DishCategory):void{
        this.chosedCategory = value;
        /*console.log(this.chosedCategory.dishCategoryName);*/}

  get dishName() {
    return this.dishForm.get('dishName');
  }

  get dishPrice() {
    return this.dishForm.get('dishPrice');
  }

  get dishDescription() {
    return this.dishForm.get('dishDescription');
  }

  get ingredientsId() {
    return this.dishForm.get('ingredientsid')
  }

  get allIngredientsId(){
    return this.dishForm.get('ingredients')
  }

  getDish(id: number): void {
    this.dishService.getDish(id).subscribe((dish: Dish) => {
      this.dishForm.patchValue({ ...dish });
    });
  }

  saveDish(): void {
    if (this.dishForm.dirty && this.dishForm.valid) {
      const dishToSave: Dish = {
        ...this.dishForm.value,
      };
      this.dishService
        .saveDish(dishToSave)
        .subscribe(() => this.onSaveComplete());
      this.dishService;
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.dishForm.reset();
    this.router.navigate(['/admin/dish-list']);
  }
}
