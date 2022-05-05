using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Persistence.Seed
{
	public class DataSeed
	{
		public static async Task Seed(AppDbContext context)
		{
			if (!context.DishStatuses.Any())
			{
				var dishStatuses = new List<DishStatus>()
				{
					new DishStatus()
					{
						DishStatusName = "Uncookable",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishStatus()
					{
						DishStatusName = "Cookable",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.DishStatuses.AddRange(dishStatuses);
				context.SaveChanges();
			}

			if (!context.DishCategories.Any())
			{
				var dishCategories = new List<DishCategory>()
				{
					new DishCategory()
					{
						DishCategoryName = "Snacks",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishCategory()
					{
						DishCategoryName = "Hot Drinks",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishCategory()
					{
						DishCategoryName = "Cocktails",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishCategory()
					{
						DishCategoryName = "Salats",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishCategory()
					{
						DishCategoryName = "Cold Dishes",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new DishCategory()
					{
						DishCategoryName = "Warm Dishes",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.DishCategories.AddRange(dishCategories);
				context.SaveChanges();
			}

			if (!context.IngredientStatuses.Any())
			{
				var ingredientStatuses = new List<IngredientStatus>()
				{
					new IngredientStatus()
					{
						IngredientStatusName = "Unavailable",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new IngredientStatus()
					{
						IngredientStatusName = "Available",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.IngredientStatuses.AddRange(ingredientStatuses);
				context.SaveChanges();
			}

			if (!context.OrderStatuses.Any())
			{
				var orderStatuses = new List<OrderStatus>()
				{
					new OrderStatus()
					{
						OrderStatusName = "Unrealizable",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new OrderStatus()
					{
					OrderStatusName = "Paid",
					CreatedDateTime = DateTime.Now,
					ModifiedDateTime = DateTime.Now
					},
					new OrderStatus()
					{
						OrderStatusName = "Served",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new OrderStatus()
					{
						OrderStatusName = "Prepared",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new OrderStatus()
					{
						OrderStatusName = "Preparing",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new OrderStatus()
					{
						OrderStatusName = "Ordered",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.OrderStatuses.AddRange(orderStatuses);
				context.SaveChanges();
			}

			if (!context.TableStatuses.Any())
			{
				var tableStatuses = new List<TableStatus>()
				{
					new TableStatus()
					{
						TableStatusName = "Occupied",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new TableStatus()
					{
						TableStatusName = "Available",
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.TableStatuses.AddRange(tableStatuses);
				context.SaveChanges();
			}

			/*if (!context.Tables.Any())
			{
				var tables = new List<Table>()
				{
					new Table()
					{
						TableDescription = "Masa de 2 persoane linga fereastra",
						WaiterId = 4,
						TableStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Table()
					{
						TableDescription = "Masa de 8 persoane in centrul salii",
						WaiterId = 4,
						TableStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Table()
					{
						TableDescription = "Masa de 4 persoane linga camin",
						WaiterId = 4,
						TableStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					}
				};
				context.Tables.AddRange(tables);
				context.SaveChanges();
			}

			if (!context.Ingredients.Any())
			{
				var ingredients= new List<Ingredient>()
				{
					new Ingredient()
					{
						IngredientName = "Sare",
						IngredientDescription = "Iodata",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Piper negru",
						IngredientDescription = "Macinat",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Ulei",
						IngredientDescription = "Rafinat",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Farsh de gaina",
						IngredientDescription = "Inca ieri gaina fugea prin ograda",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Fars de porc",
						IngredientDescription = "Cu continut scazut de grasime",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Rosii",
						IngredientDescription = "Cherry",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Macaroane",
						IngredientDescription = "Din faina de inalta calitate",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Ingredient()
					{
						IngredientName = "Cartofi",
						IngredientDescription = "Din Belorusia",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
				};
				context.Ingredients.AddRange(ingredients);
				context.SaveChanges();
			}

			if (!context.Dishes.Any())
			{
				var dishes = new List<Dish>()
				{
					new Dish()
					{
						DishName = "Sare",
						DishDescription = "Iodata",
						DishStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					new Dish()
					{
						IngredientName = "Piper negru",
						IngredientDescription = "Macinat",
						IngredientStatusId = 1,
						CreatedDateTime = DateTime.Now,
						ModifiedDateTime = DateTime.Now
					},
					
				};
				context.Dishes.AddRange(dishes);
				context.SaveChanges();
			}*/
		}
	}
}
