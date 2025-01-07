import { useLocation } from 'react-router-dom';
import { MediaPlayer } from '../components';

const Player = () => {
  const location = useLocation();
  const { item } = location.state || {};

  return (
    <div className='rounded-md border p-[5px]'>
      <div className='text-center text-2xl font-bold'>{item.store_name}</div>
      <div className='mt-2 flex border border-red-400 p-5'>
        <div className='w-2/6'>
          <img
            className='h-32 w-24 rounded-sm'
            src={item.store_img_link}
            alt=''
          />
        </div>
        <div className='w-4/6'>
          <div>{`Tác giả: ${item.store_author}`}</div>
          <div>{`Thể loại: ${item.store_category}`}</div>
          <div className='line-clamp-5 text-[12px]'>{item.store_desc}</div>
        </div>
      </div>
     
      <MediaPlayer />
    </div>
  );
};

export default Player;
