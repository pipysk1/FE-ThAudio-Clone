import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const data = useSelector((state) => state.app);
  const navigate = useNavigate();
  const handleClickItem = (item) => {
    navigate(`/${item.id}`, { state: { item } });
  };

  return (
    <div className='mx-1'>
      {data.storeData.map((item) => {
        return (
          <div
            key={item.id}
            className='mb-2 flex rounded border border-red-500 p-[5px]'
          >
            <div className='flex h-full w-1/6 items-center'>
              <img className='rounded' src={item.store_img_link} alt='' />
            </div>
            <div
              onClick={() => handleClickItem(item)}
              className='flex w-5/6 flex-col justify-evenly px-2'
            >
              <div className='cursor-pointer text-[14px] font-bold hover:text-cyan-400'>
                {item.store_name}
              </div>
              <div className='text-[13px]'>đánh giá</div>
              <div className='text-[13px]'>tập | lượt nghe</div>
              <div className='line-clamp-2 text-[12px]'>{item.store_desc}</div>
            </div>
          </div>
        );
      })}
      <Pagination />
    </div>
  );
};

export default MainContent;
