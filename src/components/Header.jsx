import icons from '../ultis/icons';
import { useDispatch } from 'react-redux';
import * as action from '../store/actions';

const { IoMdMenu, FaUser } = icons;

const Header = () => {
  const dispath = useDispatch();

  const handleClickOpen = () => {
    dispath(action.isOpenSideBar);
  };
  return (
    <>
      <div className='flex h-10 items-center justify-between border border-red-200 bg-[#E0E0E0]'>
        <div className='flex w-1/3 flex-none items-center gap-2 font-bold'>
          <span onClick={() => handleClickOpen()} className='mx-[3px]'>
            <IoMdMenu size={25} />
          </span>
          <span>Danh sách</span>
        </div>
        <div className='w-1/3 flex-none items-center'>logo</div>
        <div>
          <span className='mx-[3px] w-1/3 flex-none'>
            <FaUser size={25} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
