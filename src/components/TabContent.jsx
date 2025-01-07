import { useSelector } from 'react-redux';
import icons from '../ultis/icons';
import Pagination from './Pagination';
const { IoIosCheckboxOutline, FaHeadphones } = icons;
import { useDispatch } from 'react-redux';
import * as action from '../store/actions';

const TabContent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.app);

  const onPageChange = (item) => {
    dispatch(action.getDataStore(item, 10));
  };

  return (
    <div>
      <div className='mx-1 flex h-8'>
        {['Truyện mới', 'Tập mới', 'Random'].map((text, index) => (
          <div
            key={index}
            className='flex items-center border bg-green-400 px-2'
          >
            <IoIosCheckboxOutline />
            <p className='text-[12px]'>{text}</p>
          </div>
        ))}
      </div>
      <div className='mx-1 border border-red-400'>
        {data?.storeData?.map((item) => (
          <div
            key={item.id}
            className='border-b-1 flex items-center border p-[5px]'
          >
            <div className='py-2'>
              <img
                className='h-8 w-8'
                src={item?.store_img_link}
                alt={item?.store_name}
              />
            </div>
            <div className='mx-2 flex flex-col'>
              <div className='cursor-pointer text-[14px] hover:text-cyan-400'>
                {item?.store_name || ''}
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center text-[12px]'>
                  <FaHeadphones />
                  <p className='px-1'>911</p>
                </div>
                <div className='text-[12px]'>1</div>
                <div className='text-[12px]'>Đang ra</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-2'>
        <Pagination
          totalPages={data?.pagination?.totalPages || 10}
          currentPage={data?.pagination?.currentPage || 1}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TabContent;
