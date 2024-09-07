import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { dateValues } from "../data";
import { Field, FieldGroup } from "./catalyst/fieldset";
import { Subheading } from "./catalyst/heading";
import { Select } from "./catalyst/select";
import MultiRange from "./multirange";
import { FilterIcon } from "./svg-icons";
const Filters = ({ handleFilters }) => {
  return (
    <>
      <FieldGroup className="basis-[48%] text-left">
        <Subheading
          className="flex items-center justify-between !text-lg !font-bold uppercase !leading-[30px] !text-black"
          level={3}
        >
          Last reading
          <span className="text-xs font-normal leading-[30px] text-primary-primary_green">
            INVERSE
          </span>
        </Subheading>
        <MultiRange handleRangeChange={handleFilters} reading="C" />
        <MultiRange
          handleRangeChange={handleFilters}
          color="red"
          reading="B1"
        />
        <MultiRange handleRangeChange={handleFilters} reading="B" />

        <Subheading
          className="!text-lg !font-bold uppercase !leading-[30px] !text-black"
          level={3}
        >
          LAST COMPRESSION CHANGE
        </Subheading>
        <Field>
          <Select
            name="start_date"
            defaultValue=""
            className="text-sm !font-medium leading-6 text-primary-gray_4"
            small={true}
          >
            <option value="">Select</option>
            {dateValues.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </Select>
        </Field>
      </FieldGroup>
      <FieldGroup className="mt-3 basis-[48%] text-left md:mt-0">
        <Subheading
          className="flex items-center justify-between !text-lg !font-bold uppercase !leading-[30px] !text-black"
          level={3}
        >
          Loss
          <span className="text-xs font-normal leading-[30px] text-primary-primary_green">
            INVERSE
          </span>
        </Subheading>

        <MultiRange handleRangeChange={handleFilters} reading="C" measure="%" />
        <MultiRange
          handleRangeChange={handleFilters}
          reading="B1"
          measure="%"
        />
        <MultiRange handleRangeChange={handleFilters} reading="B" measure="%" />
      </FieldGroup>
    </>
  );
};

const Search = ({ handleSearch, handleFilters, handleThreshold }) => {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  return (
    <div className="mt-4 flex flex-col justify-between gap-6 rounded-lg border border-solid border-primary-gray_2 px-5 py-4 md:flex-row md:gap-3">
      <div className="basis-full md:basis-1/5">
        <div className="text-primary-tai_grids mb-1 text-xs font-semibold leading-6">
          Device Search
        </div>
        <form
          action="#"
          method="GET"
          className="relative flex rounded-lg border border-solid border-primary-gray_2 pl-6 pr-1"
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-6 h-full w-5 text-gray-400"
          />
          <input
            id="search-field"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            name="search"
            type="search"
            placeholder="Search device or nick name..."
            className="block h-full border-0 py-4 pl-8 pr-5 placeholder:text-primary-tail_grids focus:border-none focus:shadow-none focus:outline-none focus:ring-0 sm:text-sm"
          />
        </form>
      </div>

      <MultiRange
        handleRangeChange={handleThreshold}
        reading="Threshold Slider (%)"
        measure="%"
        isSingleRange={true}
        color="darkRed"
      />

      <div>
        <div className="text-primary-tai_grids mb-1 text-xs font-semibold leading-6">
          Filters
        </div>
        <button className="border-primary-gray_2text-sm relative rounded-lg border border-solid">
          <div
            className="flex items-center px-5 py-3.5"
            onClick={() => setIsFilterOpened(!isFilterOpened)}
          >
            <FilterIcon className="mr-2" />
            Filter By
          </div>

          <div
            className={`${isFilterOpened ? "flex" : "hidden"} absolute right-0 top-14 z-50 w-[90vw] cursor-auto flex-col justify-between rounded-md border border-solid border-primary-gray_2 bg-white pb-9 pl-5 pr-11 pt-5 shadow-gray md:flex-row lg:w-[53rem]`}
          >
            <Filters handleFilters={handleFilters} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Search;
