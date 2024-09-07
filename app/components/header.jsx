"use client";
import { Heading } from "./catalyst/heading";
import Search from "./search";

const Header = ({
  children,
  title,
  description,
  devices,
  handleSearch,
  handleFilters,
  handleThreshold,
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="basis-1/3 xl:basis-[40%]">
          <Heading>{title}</Heading>
          <p className="pt-2 text-sm font-medium leading-5 text-primary-tail_grids">
            {description}
          </p>
        </div>
        {children}
      </div>

      <Search
        devices={devices}
        handleSearch={handleSearch}
        handleFilters={handleFilters}
        handleThreshold={handleThreshold}
      />
    </>
  );
};

export default Header;
