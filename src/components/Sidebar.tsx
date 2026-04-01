import Logo from '../assets/Creator Realm Logo (dark) 1.png';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, LucideLayoutDashboard} from 'lucide-react';


const Sidebar = () => {

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: 'Finance', label: 'Finances', icon: Wallet },
    { to: 'dummyBoard', label: 'Dummy Dashboard', icon: LucideLayoutDashboard },
  ];
  
  return (
    <div className="h-screen flex flex-col gap-2 items-center md:items-start border-r  border-r-neutral-300">
      <div className='px-1 py-1 md:px-4 md:py-5 border-b border-b-neutral-300 w-full'>
        <img 
          src={Logo} 
          alt="Creator Realm Logo" 
          className="w-12 h-7  md:w-25 md:h-6 object-contain" 
        />
      </div>
      <div className='flex flex-col gap-3 mt-2  md:px-2'>
        {navItems.map((item) => (
         <NavLink
          key={item.to}
          to = {item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-1 md:px-4 py-2 rounded-sm transition-colors ${
                isActive 
                  ? 'bg-[#EEF2FF] text-[#4F39F6] font-semibold' // Active Style
                  : 'text-[#737373] hover:bg-[#EEF2FF]'        // Inactive Style
              }`
            }
          >
            <item.icon
             size={20} 
             />
            <span className='hidden md:block'>{item.label}</span>
         </NavLink>
      ))}
       
      </div>
    </div>
  )
}

export default Sidebar