import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
// import Logo from "/cart-logo.svg";

const Navbar = () => {
  const { user, logout } = useUserStore();

  const cartCount = useCartStore((state) => state.getCartCount());

  const isAdmin = user?.role === "admin";

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold items-center space-x-2 flex text-shadow-md gap-[1px]"
          >
            {/* <img src={Logo} className="size-7" /> */}
            Shopme
          </Link>

          {/*Left Side  */}
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-black hover:border-b-2 transition duration-300
					 ease-in-out"
            >
              Home
            </Link>

            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative flex group hover:border-b-2 transition duration-300 
							ease-in-out items-center"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover: transition duration-300 
							ease-in-out"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -left-2 bg-black text-white rounded-full px-2 py-0.5 text-[0.6rem]  transition duration-300 ease-in-out">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Admin Dashboard button */}
            {isAdmin && (
              <Link
                className="bg-gray-900 hover:bg-gray-900/50 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to="/secret-dashboard"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* Auth Button */}
            {user ? (
              <button
                className="hover:border-b-2
					flex items-center transition duration-300 ease-in-out cursor-pointer"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-black hover:bg-gray-800 text-white px-3 py-1
									rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="bg-white hover:border-b-2 text-black
							 flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
