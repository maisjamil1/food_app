import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants/routes.ts";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <NavLink
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >

            <h1 className="text-2xl font-bold ">
              <span className={"text-red-500"}>ili</span><bold className="text-2xl font-bold text-gray-800 " >Cash</bold>
            </h1>

          </NavLink>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            {ROUTES.map((route) => (
              <li>
                <NavLink
                  to={route.href}
                  className="hover:underline me-4 md:me-6"
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
