using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.DishStatuses.Commands.DeleteDishStatus
{
	public class DeleteDishStatusCommand : IRequest<bool>
	{
		public int DishStatusId { get; set; }
	}

	public class DeleteDishStatusCommandHandler : IRequestHandler<DeleteDishStatusCommand, bool>
	{
		private readonly IGenericRepository<DishStatus> _dishStatusRepository;

		public DeleteDishStatusCommandHandler(IGenericRepository<DishStatus> dishStatusRepository)
		{
			_dishStatusRepository = dishStatusRepository;
		}
		public async Task<bool> Handle(DeleteDishStatusCommand request, CancellationToken cancellationToken)
		{
            var deletedDishStatus = await _dishStatusRepository.FirstOrDefault(x => x.Id == request.DishStatusId);

			if (deletedDishStatus != null)
			{
				await _dishStatusRepository.Remove(deletedDishStatus);
				return true;
			}

			return false;
		}
	}
}
