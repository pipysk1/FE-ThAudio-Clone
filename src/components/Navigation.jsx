import { navItems } from '../ultis/menusidebar';

const Navigation = () => {
  return (
    <div className='mt-2 flex h-full items-center justify-evenly gap-4 px-2'>
      {navItems.map((item, index) => (
        <div key={index} className='flex flex-col items-center'>
          <item.icon />
          <span className='text-center'>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
