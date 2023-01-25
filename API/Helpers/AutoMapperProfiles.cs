using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(x => x.Photos.FirstOrDefault(y => y.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(x => x.DateOfBirth.CalculateAge()));
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();
        CreateMap<RegisterDto, AppUser>();
        CreateMap<Message, MessageDto>()
            .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(x => x.Sender.Photos.FirstOrDefault(y => y.IsMain).Url))
            .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(x => x.Recipient.Photos.FirstOrDefault(y => y.IsMain).Url));
    }
}
