import { Outlet } from 'react-router-dom';
import { Header, Sidebar, Navigation } from '../components';
import { useSelector } from 'react-redux';

const Public = () => {
  const { isOpen } = useSelector((state) => state.app);
  return (
    <>
      {isOpen && (
        <div className='pointer-events-none fixed inset-0 z-10 bg-gray-800 opacity-50'></div>
      )}
      <div className={`relative ${isOpen ? 'pointer-events-none' : ''}`}>
        <div className='fixed left-0 top-0 z-30 w-full shadow-md'>
          {/* Thêm lớp fixed để header cố định */}
          <Header />
        </div>
        <div className='my-2 mt-16 border-t-0 shadow-md'>
          {/* Thêm margin-top để tránh chồng lấn */}
          <Outlet />
        </div>
      </div>
      {isOpen && (
        <div className='z-9999 fixed top-0 min-h-screen w-full'>
          <Sidebar />
        </div>
      )}
      <div className='z50 fixed bottom-0 h-[95px] w-full bg-slate-300'>
        <Navigation />
      </div>
    </>
  );
};

export default Public;
