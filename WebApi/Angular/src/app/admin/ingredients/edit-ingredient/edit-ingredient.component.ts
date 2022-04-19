import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from './../../../_services/ingredient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientStatus } from 'src/app/_models/IngredientStatuses/IngredientStatus';
import { Ingredient } from 'src/app/_models/Ingredients/Ingredient';
import { IngredientStatusService } from 'src/app/_services/ingredient-status.service';
import {MatSelectModule} from '@angular/material/select'; 



@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css'],
})
export class EditIngredientComponent implements OnInit {
  pageTitle!: string;
  ingredientForm!: FormGroup;
  ingredientStatuses!: IngredientStatus[];
  ingredientStatus!:IngredientStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private ingredientStatusService: IngredientStatusService
  ) {}

  ngOnInit() {
    let objectId!: number;
    this.route.params.subscribe((params) => {
      objectId = +params['id'];
      if (objectId === 0) {
        this.pageTitle = 'Add Ingredient:';
      } else {
        this.getIngredient(objectId);
        this.pageTitle = 'Edit Ingredient:';
      }
    });
    

    this.ingredientStatusService.getAllIngredientStatuses()
      .subscribe((ingredientStatuses:IngredientStatus[])=> {
        this.ingredientStatuses = ingredientStatuses
      });

    this.ingredientForm = this.fb.group({
      id: [objectId],
      ingredientName: [
        '',
        [
          //Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      ingredientDescription: [
        '',
        [
          //Validators.required,
          Validators.maxLength(500),
          Validators.minLength(0),
        ],
      ],
      ingredientStatusId: [
        '',
      ],
    });
  }

  chosed?:IngredientStatus;
  Chosed(value: IngredientStatus):void{
        this.chosed = value;
        console.log(this.chosed.ingredientStatusName);}

  get ingredientName() {
    return this.ingredientForm.get('ingredientName');
  }

  get ingredientDescription() {
    return this.ingredientForm.get('ingredientDescription');
  }

  getIngredient(id: number): void {
    this.ingredientService.getIngredient(id).subscribe((ingredient: Ingredient) => {
      this.ingredientForm.patchValue({ ...ingredient });
    });
  }

  saveIngredient(): void {
    if (this.ingredientForm.dirty && this.ingredientForm.valid) {
      const ingredientToSave: Ingredient = {
        ...this.ingredientForm.value,
      };
      this.ingredientService
        .saveIngredient(ingredientToSave)
        .subscribe(() => this.onSaveComplete());
      this.ingredientService;
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.ingredientForm.reset();
    this.router.navigate(['/admin/ingredient-list']);
  }
}
