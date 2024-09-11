"use client";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/app/components/catalyst/description-list";

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/app/components/catalyst/dropdown";

import Button from "@/app/components/button";
import {
  Dialog,
  DialogBody,
  DialogTitle,
} from "@/app/components/catalyst/dialog";
import { useState } from "react";
import { dateValues } from "../data";
import { Divider } from "./catalyst/divider";
import { Subheading } from "./catalyst/heading";
import Chart from "./chart";
import { Stat } from "./stat";
import { ActiveIcon, DateSelectorIcon, SelectIcon } from "./svg-icons";

const ViewScreen = ({ device }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(1);

  const { id } = device;

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        View
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        bottom={true}
        right={true}
        className="!rounded-none !rounded-tl-lg border border-solid border-primary-gray_1 px-0 pb-[125px] pt-[11px] lg:max-w-[713px]"
      >
        <Button
          className="mb-3 ml-auto mr-9 bg-primary-red_1 px-[34px] py-[5.5px] font-medium text-white"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>

        <DialogBody className="border-t border-solid border-primary-gray_1 pb-[34px]">
          <DialogTitle className="mb-4 flex items-center pl-11 pr-9 pt-7 !text-[26px] !font-bold !leading-[30px] text-primary-midnight">
            Device ID - {device.deviceId}
          </DialogTitle>
          <DescriptionList className="border-b border-solid border-primary-gray_1 pb-3 pl-11 pr-9 sm:!grid-cols-[min(42%,theme(spacing.80))_auto]">
            <DescriptionTerm>Nickname</DescriptionTerm>
            <DescriptionDetails>{device.nickName || ""}</DescriptionDetails>

            <DescriptionTerm>Last Compression Change</DescriptionTerm>
            <DescriptionDetails>
              {device.lastBandageChange || ""}&nbsp;
              <span className="font-normal">
                {" "}
                ({device.lastBandageChangeTimeStamp || ""})
              </span>
            </DescriptionDetails>

            <DescriptionTerm>Last Recorded</DescriptionTerm>
            <DescriptionDetails>
              {device.lastDateRecorded || ""}&nbsp;
              <span className="font-normal">
                ({device.lastDateRecordedTimeStamp || ""})
              </span>
            </DescriptionDetails>
          </DescriptionList>

          <div className="flex flex-col justify-between border-b border-solid border-primary-gray_1 pb-[34px] pl-11 pr-9 pt-6 sm:flex-row">
            <div className="mb-4 sm:mb-0 sm:basis-1/2">
              <Subheading
                className="mb-2 !text-[22px] !font-bold leading-[30px]"
                level={3}
              >
                Treatment
              </Subheading>

              <DescriptionList>
                <DescriptionTerm className="!text-base !leading-5 sm:!py-2">
                  Status
                </DescriptionTerm>
                <DescriptionDetails className="!text-base !leading-5 sm:!py-2">
                  {device.deviceStatus === "Active" && (
                    <div className="flex items-center text-primary-green_4">
                      Active <ActiveIcon className="ml-[14px]" />
                    </div>
                  )}
                </DescriptionDetails>

                <DescriptionTerm className="!text-base !leading-5 sm:!py-2">
                  Start date
                </DescriptionTerm>
                <DescriptionDetails className="!text-base !leading-5 sm:!py-2">
                  06/02/24?
                </DescriptionDetails>

                <DescriptionTerm className="!text-base !leading-5 sm:!py-2">
                  Duration
                </DescriptionTerm>
                <DescriptionDetails className="!text-base !leading-5 sm:!py-2">
                  33 days?
                </DescriptionDetails>
              </DescriptionList>

              <Subheading
                className="mb-2 mt-11 !text-[22px] !font-bold leading-[30px]"
                level={3}
              >
                Compression
              </Subheading>

              <DescriptionList>
                <DescriptionTerm className="!text-base !leading-5 sm:!py-2">
                  Current Bandage
                </DescriptionTerm>
                <DescriptionDetails className="!text-base !leading-5 sm:!py-2">
                  {device.currentBandage || ""}
                </DescriptionDetails>
              </DescriptionList>
            </div>
            <div>
              <Subheading
                className="mb-[14px] !text-[22px] !font-bold leading-[30px]"
                level={3}
              >
                Last Compression Reading
              </Subheading>

              <DescriptionList className="max-w-[216px] rounded border border-solid border-primary-gray_1 px-6">
                <DescriptionTerm className="!py-6">
                  <div className="text-base leading-6 text-black">C</div>
                  <div className="-mt-1 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                    Last Reading
                  </div>
                </DescriptionTerm>
                <DescriptionDetails className="!py-6">
                  <Stat
                    value={device.current?.top || 0}
                    change={`${device.percentageDifference?.top || "0%"}`}
                    className="text-primary-tail_grids"
                  />
                </DescriptionDetails>

                <Divider />
                <Divider />
                <DescriptionTerm className="!py-6">
                  <div className="text-base leading-6 text-black">B1</div>
                  <div className="-mt-1 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                    Last Reading
                  </div>
                </DescriptionTerm>
                <DescriptionDetails className="!py-6">
                  <Stat
                    value={device.current?.middle || 0}
                    change={`${device.percentageDifference?.middle || "0%"}`}
                    className="text-primary-tail_grids"
                  />
                </DescriptionDetails>

                <Divider />
                <Divider />
                <DescriptionTerm className="!py-6">
                  <div className="text-base leading-6 text-black">B</div>
                  <div className="-mt-1 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                    Last Reading
                  </div>
                </DescriptionTerm>
                <DescriptionDetails className="!py-6">
                  <Stat
                    value={device.current?.bottom || 0}
                    change={`${device.percentageDifference?.bottom || "0%"}`}
                    className="text-primary-tail_grids"
                  />
                </DescriptionDetails>
              </DescriptionList>
            </div>
          </div>

          <div className="pl-11 pr-9 pt-6">
            <Subheading
              className="mb-4 !text-[22px] !font-bold leading-[30px]"
              level={3}
            >
              Pressure
            </Subheading>

            <div className="mb-5 flex justify-end">
              <Button className="mr-4 border border-solid border-primary-primary_green bg-white !px-4 !font-medium !text-primary-green_5">
                View Live Data
              </Button>
              <Dropdown>
                <DropdownButton
                  className="flex justify-between !rounded border border-solid !border-primary-primary_green bg-white !px-4 !py-2.5 font-semibold !text-primary-green_5"
                  outline
                >
                  <DateSelectorIcon />
                  Showing:{" "}
                  {dateValues.find((date) => date.value === filterDate).label}
                  <SelectIcon className="mr-2 [&_path]:fill-primary-green_5" />
                </DropdownButton>

                <DropdownMenu className="min-w-[231px] !rounded border border-solid !border-primary-primary_green">
                  {dateValues.map((date) => (
                    <DropdownItem
                      key={date.value}
                      onClick={() => {
                        setFilterDate(date.value);
                      }}
                    >
                      {date.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <Chart reading="C" name={device.nickName} color="#4CC2CB" />
            <Chart reading="B1" name={device.nickName} color="#C21A88" />
            <Chart reading="B" name={device.nickName} color="#C69D00" />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ViewScreen;
