import icons from '../ultis/icons';

const { IoIosCheckboxOutline, FaGift, IoMdCloudDownload } = icons;

const BadgeButton = ({ icon: Icon, text }) => (
  <div className='mx-1 flex h-6 items-center border bg-[#dbc7e2]'>
    <div className='mx-1'>
      <Icon size={12} />
    </div>
    <span className='p-1 text-sm'>{text}</span>
  </div>
);

const FeatureItem = ({ children }) => (
  <p className='flex items-center text-xs'>
    <IoIosCheckboxOutline color='green' className='mr-2' />
    {children}
  </p>
);

const FEATURE_BADGES = [
  { icon: FaGift, text: 'Tham gia gói VIP' },
  { icon: IoMdCloudDownload, text: 'Gói Download' },
];

const FEATURE_LIST = [
  <>
    <strong>Download </strong> truyện <strong> không Quảng Cáo</strong> (rút gọn link)
  </>,
  <>
    <strong>3K </strong> truyện Server Fast (Tốc độ cao)
  </>,
  <>
    <strong>Hơn 12k </strong> truyện <strong> server vip</strong> (Tốc độ cao không giật)
  </>,
];

const BannerText = () => {
  return (
    <div className='my-2 flex flex-col p-1'>
      <div className='flex'>
        {FEATURE_BADGES.map((badge, index) => (
          <BadgeButton key={index} {...badge} />
        ))}
      </div>
      
      <div className='mt-2 border bg-[#dbc7e2] p-1'>
        <div className='mx-1'>
          {FEATURE_LIST.map((content, index) => (
            <FeatureItem key={index}>{content}</FeatureItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerText;
