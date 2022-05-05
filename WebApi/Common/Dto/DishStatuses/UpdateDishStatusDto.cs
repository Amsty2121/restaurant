using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dto.DishStatuses
{
	public class UpdateDishStatusDto
	{
		[StringLength(30, MinimumLength = 3, ErrorMessage = "Invalid DishStatusName length")]
		public string DishStatusName { get; set; }
	}
}
