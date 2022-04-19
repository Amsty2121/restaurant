import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/_models/Ingredients/Ingredient';
import { DishCategory } from 'src/app/_models/DishCategories/DishCategory';
import { DishStatus } from 'src/app/_models/DishStatuses/DishStatus';
import { DishService } from 'src/app/_services/dish.service';
import { Dish } from 'src/app/_models/Dishes/Dish';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css'],
})
export class EditDishComponent implements OnInit {
  pageTitle!: string;
  dishForm!: FormGroup;
  ingredients!:Ingredient[];
  ingredient!:Ingredient;
  dishCategory!:DishCategory;
  dishStatus!:DishStatus;
  dishCategories!:DishCategory[];
  dishStatuses!:DishStatus[];
  currentDish!:Dish;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dishService: DishService
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Dish:';
      } else {
        this.getDish(objectId);
        this.pageTitle = 'Edit Dish:';
      }
    });

    this.dishService
    .getDish(objectId)
    .subscribe((dish:Dish) => {
      this.currentDish = dish;
    })

    this.dishService
      .getAllIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });

      this.dishService
      .getAllDishStatuses()
      .subscribe((dishStatuses: DishStatus[]) => {
        this.dishStatuses = dishStatuses;
      });

      this.dishService
      .getAllDishCategories()
      .subscribe((dishCategories: DishCategory[]) => {
        this.dishCategories = dishCategories;
      });

    this.dishForm = this.fb.group({
      id: [objectId],
      dishName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      dishPrice: [
        '',
        [
          Validators.required,
        ],
      ],
      dishDescription: [
        '',
        [
          Validators.maxLength(500),
        ],
      ],
      dishStatusId: [
        '',
        [
        ],
      ],
      dishCategoryId: [
        '',
        [
        ],
      ],
      ingredientsId: [
        '',
        [
          
        ],],
      
    });
  }

  get dishName() {
    return this.dishForm.get('dishName');
  }

  get dishDescription() {
    return this.dishForm.get('dishDescription');
  }

  get dishPrice() {
    return this.dishForm.get('dishPrice');
  }

  get dishStatusId() {
    return this.dishForm.get('dishStatusId');
  }

  get dishCategoryId() {
    return this.dishForm.get('dishCategoryId');
  }

  get ingredientsId() {
    return this.dishForm.get('ingredientsId');
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
    this.router.navigate(['/kitchener/dish-list']);
  }
}