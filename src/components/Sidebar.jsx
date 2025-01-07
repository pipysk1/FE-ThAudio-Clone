import { useDispatch } from 'react-redux';
import icons from '../ultis/icons';
import * as action from '../store/actions';
const { IoMdClose } = icons;
import { menu } from '../ultis/menusidebar';
import { useState } from 'react';

const Sidebar = () => {
  const dispath = useDispatch();
  const [isOpen] = useState(false);
  const handleCloseSidebar = () => {
    dispath(action.isCloseSideBar);
  };

  return (
    <div className='flex min-h-screen w-2/3 flex-col bg-slate-400'>
      <div className='ic mx-[6px] flex w-full justify-end'>
        <span onClick={() => handleCloseSidebar()}>
          <IoMdClose size={36} />
        </span>
      </div>
      <div className='pt-[10px]'>
        {menu.map((item, index) => {
          return (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex w-[85%] items-center gap-1 px-5 py-[10px] text-[16px] font-bold'>
                <span>
                  <item.icon />
                </span>
                <span>{item.text}</span>
              </div>
              <div className='flex justify-end'>
                <span>{item.show ? <item.show /> : ''}</span>
              </div>

              <span>
                {item.child && isOpen ? (
                  item.child.map((i, id) => {
                    return <div key={id}>{i.text}</div>;
                  })
                ) : (
                  <></>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
