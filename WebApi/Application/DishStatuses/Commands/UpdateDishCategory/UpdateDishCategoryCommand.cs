using System.Text.RegularExpressions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Exceptions;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.DishStatuses.Commands.UpdateDishStatus
{
    public class UpdateDishStatusCommand : IRequest<DishStatus>
    {
        public int DishStatusId { get; set; }
        public string DishStatusName { get; set; }
    }

    public class UpdateDishStatusCommandHandler : IRequestHandler<UpdateDishStatusCommand, DishStatus>
    {
        private readonly IGenericRepository<DishStatus> _dishStatusRepository;

        public UpdateDishStatusCommandHandler(IGenericRepository<DishStatus> dishStatusRepository)
        {
            _dishStatusRepository = dishStatusRepository;
        }
        public async Task<DishStatus> Handle(UpdateDishStatusCommand request, CancellationToken cancellationToken)
        {
            var updatedDishStatus = await _dishStatusRepository.FirstOrDefault(x => x.Id == request.DishStatusId);

            if (updatedDishStatus == null)
            {
                throw new EntityDoesNotExistException("The DishStatus does not exist");
            }

            if (request.DishStatusName != null && request.DishStatusName.Length > 0)
            {
                updatedDishStatus.DishStatusName = request.DishStatusName;
            }

            await _dishStatusRepository.Update(updatedDishStatus);

            return updatedDishStatus;
        }
    }
}