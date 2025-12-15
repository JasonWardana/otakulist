import Link from 'next/link';
import InputSearch from './InputSearch';
import UserActionButton from './UserActionButton';

const Navbar = () => {
  return (
    <header className="bg-amber-500 px-4 py-4">
      <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-3">
        <Link
          href="/"
          className="font-bold text-3xl"
        >
          OtakuList
        </Link>
        <InputSearch />
        <UserActionButton />
      </div>
    </header>
  );
};

export default Navbar;
