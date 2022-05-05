using System.Collections.Generic;
using Domain.Entities.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence.Seed
{
	public static class UsersSeed
	{
		public static async Task Seed(UserManager<User> userManager)
		{
			if (!userManager.Users.Any())
			{
				var users = new List<User>()
				{
					new User()
					{
						UserName = "admin",
					},
					new User()
					{
						UserName = "notAssigned",
					},
					new User()
					{
						UserName = "kitchener1",
					},
					new User()
					{
						UserName = "waiter1",
					},


				};

				foreach (var user in users)
				{
					var userInsertion = await userManager.CreateAsync(user, "Qwerty1!");

					if (userInsertion.Succeeded)
					{
						await userManager.AddToRoleAsync(user, "admin");
					}
				}
				
			}
		}
	}
}
