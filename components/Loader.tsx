import { Audio } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className='flex justify-center items-center w-screen h-[350px]'>
    <Audio height="50" width="50"  color="#ea580c" ariaLabel="loading"/>
    </div>
  );
};

export default Loader;