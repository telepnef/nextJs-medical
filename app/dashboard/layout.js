import { ApplicationLayout } from "./../application-layout";
import { getEvents } from "./../data";

export default async function RootLayout({ children }) {
  let events = await getEvents();

  return <ApplicationLayout events={events}>{children}</ApplicationLayout>;
}
