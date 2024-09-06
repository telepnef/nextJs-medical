"use client";

import Button from "@/app/components/button";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/app/components/catalyst/dialog";
import {
  Description,
  Field,
  FieldGroup,
  Label,
} from "@/app/components/catalyst/fieldset";
import { Input } from "@/app/components/catalyst/input";
import { Select } from "@/app/components/catalyst/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/catalyst/table";
import Header from "@/app/components/header";
import Loader from "@/app/components/loader";
import { Stat } from "@/app/components/stat";
import {
  AllocateIcon,
  AllocateNewIcon,
  DownloadIcon,
} from "@/app/components/svg-icons";
import ViewScreen from "@/app/components/view-screen";
import { getDevices } from "@/app/data";
import { useEffect, useState } from "react";

export default function Allocted() {
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [readingFilters, setReadingFilters] = useState(null);

  useEffect(() => {
    async function fetchDevices() {
      const token = await cookieStore.get("currentUser");
      let res = await getDevices(token.value);
      setDevices(res);
      setFiltered(res);
      console.log(res);
    }

    fetchDevices();
  }, []);

  const filterData = () => {
    if (searchString.trim() === "" && readingFilters === null) {
      setFiltered(devices);
      return;
    }

    // filter by search
    let filteredDevices = devices.filter((device) => {
      if (
        device.deviceId.includes(searchString) ||
        device.nickName.includes(searchString)
      ) {
        return device;
      }

      return;
    });

    filteredDevices = filteredDevices.filter((device) => {
      let isInTheRange = true;

      for (let readingName in readingFilters) {
        for (let measureName in readingFilters[readingName]) {
          let measureType = "current";

          if (measureName === "%") {
            measureType = "percentageDifference";
          }

          if (!device[measureType]) {
            return;
          }

          const isInverted =
            readingFilters[readingName][measureName].isInverted;
          const deviceCurrentReading = Math.abs(
            parseInt(
              device[measureType][readingName].toString().replaceAll("%", ""),
            ),
          );
          const filterReading = readingFilters[readingName][measureName];

          if (!isInverted) {
            if (
              deviceCurrentReading < filterReading.minValue ||
              deviceCurrentReading > filterReading.maxValue
            ) {
              return;
            }
          } else if (
            deviceCurrentReading > filterReading.minValue &&
            deviceCurrentReading < filterReading.maxValue
          ) {
            return;
          }
        }
      }

      if (isInTheRange) {
        return device;
      }

      return;
    });

    setFiltered(filteredDevices);
  };

  useEffect(() => {
    console.log(readingFilters, "readingFilters");
    console.log(searchString, "searchString");
    filterData();
  }, [readingFilters, searchString]);

  const handleSearch = (searchText) => {
    setSearchString(searchText.trim());
  };

  const handleFilters = (reading, measure, minValue, maxValue, isInverted) => {
    setReadingFilters((prev) => {
      let prevMeasure = "mmHg";
      let prevMeasureObject = null;

      if (measure === "mmHg") {
        prevMeasure = "%";
      }

      if (prev && prev[reading] && prev[reading][prevMeasure]) {
        prevMeasureObject = {
          [prevMeasure]: {
            ...prev[reading][prevMeasure],
          },
        };
      }

      return {
        ...prev,
        [reading]: {
          [measure]: {
            minValue: minValue,
            maxValue: maxValue,
            isInverted: isInverted,
          },
          ...prevMeasureObject,
        },
      };
    });
  };

  return devices.length ? (
    <>
      <Header
        devices
        handleSearch={handleSearch}
        handleFilters={handleFilters}
        title="Allocated Devices"
        description="These are all of the active Tight Alright devices that are currently paired with a patient."
      >
        <div className="flex flex-col justify-between xl:flex-row">
          <Button className="mb-4 bg-primary-primary_green xl:mb-0 xl:mr-4">
            <DownloadIcon className="mr-2.5" />
            Download Data
          </Button>
          <Button
            className="bg-primary-primary_green"
            onClick={() => {
              setIsAllocateOpen(true);
            }}
          >
            <AllocateIcon className="mr-2.5" />
            Allocate New Device
          </Button>
        </div>
        <Dialog
          open={isAllocateOpen}
          onClose={() => {
            setIsAllocateOpen(false);
          }}
          bottom={true}
          right={true}
          className="!rounded-none !rounded-tl-lg border border-solid border-primary-gray_1 px-0 pb-[125px] pt-[11px] lg:max-w-[612px]"
        >
          <Button
            className="mb-3 ml-auto mr-9 bg-primary-red_1 px-[34px] py-[5.5px] font-medium text-white"
            onClick={() => setIsAllocateOpen(false)}
          >
            Close
          </Button>

          <DialogBody className="border-t border-solid border-primary-gray_1 pl-11 pr-9">
            <DialogTitle className="flex items-center pt-7 !text-[26px] font-bold !leading-[30px] text-primary-midnight">
              <AllocateNewIcon className="mr-1.5" />
              Allocate New Device
            </DialogTitle>
            <DialogDescription className="mb-9 mt-3.5 !text-lg font-medium !leading-5">
              <div>
                <span></span>
              </div>
            </DialogDescription>
            <FieldGroup>
              <Field>
                <Label>Select Tight Alright Device</Label>
                <Description>
                  Select from this list of existing unallocated devices
                </Description>
                <Select name="id" defaultValue="">
                  <option value="" disabled>
                    -please select-
                  </option>
                  <option value="666888">#666888</option>
                </Select>
              </Field>
              <Field>
                <Label>Nick Name</Label>
                <Description>Enter a nick name for this device</Description>
                <Input
                  name="name"
                  defaultValue=""
                  placeholder="e.g John Doe - Right Leg"
                  autoFocus
                />
              </Field>
              <Field>
                <Label>Device Start Date</Label>
                <Description>Start date for device</Description>
                <Select name="start_date" defaultValue="today">
                  <option value="today">Today</option>
                </Select>
              </Field>
            </FieldGroup>
            <Button
              className="mt-14 w-full justify-center"
              onClick={() => setIsAllocateOpen(false)}
            >
              Allocate Device
            </Button>
          </DialogBody>
        </Dialog>
      </Header>

      <Table
        bleed={true}
        className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Device ID</TableHeader>
            <TableHeader>Nick Name</TableHeader>
            <TableHeader className="bg-primary-green_light_1">
              C{" "}
              <i className="text-[8px] font-semibold uppercase text-primary-tail_grids">
                (Top)
              </i>
              <div className="-mt-2 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                Last Reading
              </div>
            </TableHeader>
            <TableHeader className="bg-primary-green_light_1">
              B1{" "}
              <i className="text-[8px] font-semibold uppercase text-primary-tail_grids">
                (Middle)
              </i>
              <div className="-mt-2 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                Last Reading
              </div>
            </TableHeader>
            <TableHeader className="bg-primary-green_light_1">
              B{" "}
              <i className="text-[8px] font-semibold uppercase text-primary-tail_grids">
                (Bottom)
              </i>
              <div className="-mt-2 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                Last Reading
              </div>
            </TableHeader>
            <TableHeader>Last Compression Change</TableHeader>
            <TableHeader>Last Reading Recorded</TableHeader>
            <TableHeader>
              <span className="sr-only">Last Reading Recorded</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered?.map((device) => (
            <TableRow
              className="whitespace-break-spaces"
              key={device.deviceId}
              title={`Device #${device.deviceId}`}
            >
              <TableCell>{device.deviceId || ""}</TableCell>
              <TableCell className="whitespace-break-spaces">
                {device.nickName || ""}
              </TableCell>
              <TableCell className="bg-primary-green_light_1">
                <Stat
                  value={device.current?.top || 0}
                  change={`${device.percentageDifference?.top || "0%"}`}
                />
              </TableCell>
              <TableCell className="bg-primary-green_light_1">
                <Stat
                  value={device.current?.middle || 0}
                  change={`${device.percentageDifference?.middle || "0%"}`}
                />
              </TableCell>
              <TableCell className="bg-primary-green_light_1">
                <Stat
                  value={device.current?.bottom || 0}
                  change={`${device.percentageDifference?.bottom || "0%"}`}
                />
              </TableCell>
              <TableCell className="whitespace-break-spaces">
                {device.lastBandageChange || ""}
              </TableCell>
              <TableCell>{device.lastDateRecorded || ""}</TableCell>

              <TableCell>
                <ViewScreen device={device} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  ) : (
    <Loader />
  );
}
