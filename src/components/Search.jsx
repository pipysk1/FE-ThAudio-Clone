import { useEffect, useState } from 'react';
import icons from '../ultis/icons';
import { useDispatch } from 'react-redux';
import * as action from '../store/actions';

const { IoSearch } = icons;

const Search = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.getDataStore(1, 10, value)); // Dispatch action với các tham số page và limit
  }, [value]);

  const handleSearch = () => {
    console.log(value);
  };

  return (
    <div className='flex w-full items-center justify-center border border-black'>
      <input
        value={value}
        className='h-[30px] w-full px-2'
        type='text'
        placeholder='Tìm kiếm tên truyện'
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='cursor-pointer pr-2'>
        <IoSearch size={24} onClick={() => handleSearch()} />
      </div>
    </div>
  );
};

export default Search;
