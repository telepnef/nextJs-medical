"use client";

import Button from "@/app/components/button";
import { Badge } from "@/app/components/catalyst/badge";
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
import { Heading } from "@/app/components/catalyst/heading";
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
import Search from "@/app/components/search";
import {
  AllocateIcon,
  AllocateNewIcon,
  DownloadIcon,
  StatDown,
  StatUp,
} from "@/app/components/svg-icons";
import { getRecentDevices } from "@/app/data";
import { useState } from "react";
export function Stat({ title, value, change }) {
  return (
    <div>
      <div className="text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="text-base font-semibold">
        {value} <span className="text-xs font-light">mmHg</span>
      </div>
      <div className="mt-1 text-xs">
        <Badge
          className="!gap-0.5"
          color={change.startsWith("-") ? "pink" : "lime"}
        >
          {change.startsWith("-") ? (
            <>
              {change}
              <StatDown />
            </>
          ) : (
            <>
              +{change}
              <StatUp />
            </>
          )}
        </Badge>{" "}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const devices = getRecentDevices();
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="basis-1/3 xl:basis-[40%]">
          <Heading>Allocated Devices</Heading>
          <p className="pt-2 text-sm font-medium leading-5 text-primary-tail_grids">
            These are all of the active Tight Alright devices that are currently
            paired with a patient.
          </p>
        </div>
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
            Please follow the steps below to setup a new device
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
            onClick={() => setIsOpen(false)}
          >
            Allocate Device
          </Button>
        </DialogBody>
      </Dialog>

      <Search />

      <Table
        bleed={true}
        className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Device ID</TableHeader>
            <TableHeader>Nick Name</TableHeader>
            <TableHeader>C</TableHeader>
            <TableHeader>B1</TableHeader>
            <TableHeader>B</TableHeader>
            <TableHeader>Last Compression Change</TableHeader>
            <TableHeader>Last Reading Recorded</TableHeader>
            <TableHeader>
              <span className="sr-only">Last Reading Recorded</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow
              key={device.id}
              href={`/dashboard/allocated/${device.id}`}
              title={`Device #${device.id}`}
            >
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                <Stat
                  value={device.c_reading}
                  change={`${device.c_reading_move}%`}
                />
              </TableCell>
              <TableCell>
                <Stat
                  value={device.b1_reading}
                  change={`${device.b1_reading_move}%`}
                />
              </TableCell>
              <TableCell>
                <Stat
                  value={device.b_reading}
                  change={`${device.b_reading_move}%`}
                />
              </TableCell>
              <TableCell>
                {new Date(
                  new Date() - new Date(device.last_change),
                ).getHours() + " hrs ago"}
              </TableCell>
              <TableCell>
                {new Date(
                  new Date() - new Date(device.last_reading),
                ).getHours() + " hrs ago"}
              </TableCell>

              <TableCell>
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
