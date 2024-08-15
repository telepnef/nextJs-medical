"use client";

import ViewScreen from "@/app/components/ViewScreen";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/catalyst/table";
import Header from "@/app/components/header";
import { getRecentDevices } from "@/app/data";

export default function Unsubscribed() {
  const devices = getRecentDevices();

  return (
    <>
      <Header
        title="Unsubscribed Devices"
        description="These are all of the inactive Tight Alright devices that are currently not paired with a patient."
      />

      <Table
        bleed={true}
        className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>Device ID</TableHeader>
            <TableHeader>Nick Name</TableHeader>

            <TableHeader>Unsubscribed</TableHeader>
            <TableHeader></TableHeader>

            <TableHeader>
              <span className="sr-only">View</span>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id} title={`Device #${device.id}`}>
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.name}</TableCell>
              <TableCell>
                {new Date(
                  new Date() - new Date(device.last_change),
                ).getHours() + " hrs ago"}
              </TableCell>
              <TableCell className="w-1/2"></TableCell>

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
