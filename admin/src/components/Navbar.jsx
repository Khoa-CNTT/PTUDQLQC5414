import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center p-4 justify-between'>
      <Link className='flex items-center' to='/'>
        <FontAwesomeIcon className='text-3xl text-amber-800 pr-2' icon={faMugHot} />
        <p className='w-36 text-amber-800  text-2xl font-bold'>5VIBES
        </p>
      </Link>
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar