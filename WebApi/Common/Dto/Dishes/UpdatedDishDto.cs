namespace Common.Dto.Dishes
{
	public class UpdatedDishDto
	{
        public int Id { get; set; }
        public string DishName { get; set; }
        public int DishPrice { get; set; }
        public string DishDescription { get; set; }
        public int DishStatusId { get; set; }
        public string DishStatusName { get; set; }
        public int DishCategoryId { get; set; }
        public string DishCategoryName { get; set; }

    }
}
