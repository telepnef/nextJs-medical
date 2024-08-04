"use client";

import Image from "next/image";
import { Avatar } from "./components/catalyst/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./components/catalyst/dropdown";
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from "./components/catalyst/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "./components/catalyst/sidebar";
import { SidebarLayout } from "./components/catalyst/sidebar-layout";

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import LogoutButton from "./components/logout";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarIcon,
  LogoutIcon,
  NotificationsIcon,
  SubscribedIcon,
  SubscriptionsIcon,
  UnsubscribedIcon,
} from "./components/svg-icons";

function AccountDropdownMenu({ anchor }) {
  return (
    <DropdownMenu className="min-w-72" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export function ApplicationLayout({ children }) {
  const ref = useRef();
  const pathname = usePathname();
  const [activeMenu, setActive] = useState(false);
  const [user, setUser] = useState();

  const handleActiveMenuItem = () => {
    console.log("isActive", activeMenu);
    setActive(!activeMenu);
  };

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    });
  });

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/logo.png" square width={67} height={50} />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader className="items-center border-none">
            <Image src="/logo.png" width={67} height={50} />
            <SidebarLabel className="text-xs font-medium uppercase leading-6 tracking-[1px] text-primary-secondary_green">
              Tight Alright Platform
            </SidebarLabel>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <div ref={ref}>
                <Dropdown>
                  <DropdownButton
                    as={SidebarItem}
                    current={
                      pathname === "/dashboard/unallocated" ||
                      pathname === "/dashboard/allocated"
                    }
                    className={
                      activeMenu
                        ? "block bg-primary-primary_light pb-[5.5rem]"
                        : "block"
                    }
                    onClick={handleActiveMenuItem}
                  >
                    <SubscribedIcon />
                    <SidebarLabel>Subscribed</SidebarLabel>
                    <ChevronDownIcon />
                  </DropdownButton>
                  <DropdownMenu
                    className="w-full !rounded-none !border-0 !bg-transparent pl-12 !shadow-[none] ring-0 !transition-none"
                    anchor="bottom start"
                  >
                    <DropdownItem href="/dashboard/allocated">
                      <DropdownLabel
                        className={
                          pathname === "/dashboard/allocated" &&
                          "text-primary-mosque"
                        }
                      >
                        Allocated Devices
                      </DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="/dashboard/unallocated">
                      <DropdownLabel
                        className={
                          pathname === "/dashboard/unallocated" &&
                          "text-primary-mosque"
                        }
                      >
                        Unallocated Devices
                      </DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <SidebarItem
                href="/dashboard/unsubscribed"
                current={pathname.endsWith("/unsubscribed")}
              >
                <UnsubscribedIcon />
                <SidebarLabel>Unsubscribed</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/dashboard/calendar"
                className="[&>a>svg]:hover:fill-primary-primary_green [&>a>svg]:hover:!stroke-none"
                current={pathname.endsWith("/calendar")}
              >
                <CalendarIcon className="fill-primary-tail_grids !stroke-none" />
                <SidebarLabel>Compression Applications Calendar</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/dashboard/subscriptions"
                className="[&>a>svg>*]:hover:!stroke-none [&>a>svg]:hover:fill-primary-primary_green"
                current={pathname.endsWith("/subscriptions")}
              >
                <SubscriptionsIcon className="fill-primary-tail_grids" />
                <SidebarLabel>Subscriptions</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/dashboard/notifications"
                className="fill-primary-tail_grids [&>a>svg]:hover:fill-primary-primary_green [&>a>svg]:hover:!stroke-none"
                current={pathname.endsWith("/notifications")}
              >
                <NotificationsIcon className="fill-primary-tail_grids" />
                <SidebarLabel>Notifications</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
            <SidebarSpacer />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <SidebarItem href="#">
              <Cog8ToothIcon className="!fill-none" />
              <SidebarLabel>Settings</SidebarLabel>
            </SidebarItem>
            <LogoutButton>
              <SidebarItem
                href="#"
                className="[&>a>svg]:hover:fill-primary-primary_green [&>a>svg]:hover:!stroke-none"
              >
                <LogoutIcon className="fill-primary-tail_grids !stroke-none" />
                <SidebarLabel>Log out</SidebarLabel>
              </SidebarItem>
            </LogoutButton>
            <SidebarItem href="#">
              <span className="flex min-w-0 items-center gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-base font-medium dark:text-white">
                    Erica
                  </span>
                  <span className="block truncate text-sm font-normal dark:text-zinc-400">
                    erica@example.com
                  </span>
                </span>
              </span>
            </SidebarItem>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
