"use client";

import ViewScreen from "@/app/components/ViewScreen";
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
import { Stat } from "@/app/components/stat";
import {
  AllocateIcon,
  AllocateNewIcon,
  DownloadIcon,
} from "@/app/components/svg-icons";
import { getRecentDevices } from "@/app/data";
import { useState } from "react";

export default function Allocted() {
  const devices = getRecentDevices();
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

  return (
    <>
      <Header
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
              C
              <div className="-mt-2 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                Last Reading
              </div>
            </TableHeader>
            <TableHeader className="bg-primary-green_light_1">
              B1
              <div className="-mt-2 text-[8px] font-bold uppercase tracking-[1px] text-primary-tail_grids">
                Last Reading
              </div>
            </TableHeader>
            <TableHeader className="bg-primary-green_light_1">
              B
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
          {devices.map((device) => (
            <TableRow key={device.id} title={`Device #${device.id}`}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell className="bg-primary-green_light_1">
                <Stat
                  value={device.c_reading}
                  change={`${device.c_reading_move}%`}
                />
              </TableCell>
              <TableCell className="bg-primary-green_light_1">
                <Stat
                  value={device.b1_reading}
                  change={`${device.b1_reading_move}%`}
                />
              </TableCell>
              <TableCell className="bg-primary-green_light_1">
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
                <ViewScreen device={device} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
