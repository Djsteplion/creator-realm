import logo from '../assets/Creator Realm Logo (dark) 1.png'; 

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-50 z-50">
      <div className="relative">
        <img 
          src={logo} 
          alt="Loading..." 
          className="w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse-zoom" 
        />
      </div>
    </div>
  );
};

export default LoadingScreen;