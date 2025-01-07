import { Search } from '../components';
import BannerText from '../components/BannerText';
import MainContent from '../components/MainContent';
import TabContent from '../components/TabContent';
import icons from '../ultis/icons';

const { IoMdMenu } = icons;
const Home = () => {
  return (
    <>
      <div className='my-[5px] w-full p-5'>
        <h3 className='text-center text-[24px] font-bold uppercase'>
          TH audio truyen full
        </h3>
        <div className='mt-[10px] border-t-[1px] pt-[10px]'>
          <h3 className='text-center text-[14px] font-bold uppercase text-red-500'>
            nghe truyện audio tiên hiệp, huyền huyễn...
          </h3>
          <h3 className='text-center text-[14px] font-bold uppercase text-red-500'>
            mọi lúc, mọi nơi
          </h3>
        </div>
      </div>
      <div className='flex h-10 items-center justify-end bg-black'>
        <span className='m-[5px]'>
          <IoMdMenu color='#FFF' size={25} />
        </span>
      </div>
      <div className='w-full p-[5px]'>
        <div className='w-full p-[5px]'>
          <Search />
        </div>
        <div>
          <BannerText />
        </div>
        <div className='w-full px-[5px]'>
          {/* <TabContent /> */}
        </div>
        <div className='w-full px-[5px]'>
          <MainContent />
        </div>
        <div className='mb-28 flex h-10 items-center justify-end bg-black'>
          <span className='m-[5px]'></span>
        </div>
      </div>
    </>
  );
};
export default Home;
