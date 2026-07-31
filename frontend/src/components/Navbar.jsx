import Button from "./Button";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white shadow">

      <div>
        <h2 className="text-xl font-bold">
          AI Learning Assistant
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <span className="font-medium">
          Aditya
        </span>

        <Button>
          Logout
        </Button>

      </div>

    </header>
  );
};

export default Navbar;