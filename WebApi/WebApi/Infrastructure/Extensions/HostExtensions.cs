using Domain.Entities.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using Persistence.Seed;
using System;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;

namespace WebApi.Infrastructure.Extensions
{
	public static class HostExtensions
	{
		public static async Task SeedData(this IHost host)
		{
			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				try
				{
					var context = services.GetRequiredService<AppDbContext>();
					var userManager = services.GetRequiredService<UserManager<User>>();
					var rolesManager = services.GetRequiredService<RoleManager<Role>>();

					await context.Database.MigrateAsync();

					await RolesSeed.Seed(rolesManager);
					await UsersSeed.Seed(userManager);
					await DataSeed.Seed(context);
				}
				catch (Exception ex)
				{
					var logger = services.GetRequiredService<ILogger<Program>>();
					logger.LogError(ex, "An error occured during migration");
				}
			}
		}
	}
}
