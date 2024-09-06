export async function getDevice(id) {
  return (await getDevices()).find((order) => order.id.toString() === id);
}

export function getRecentDevices() {
  return [
    {
      id: 112233,
      name: "Sarah B - Left Leg",
      c_reading: "80",
      c_reading_move: "-20",
      b1_reading: "40",
      b1_reading_move: "-5",
      b_reading: "23",
      b_reading_move: "10",
      last_change: "06-30-2024",
      last_reading: "07-01-2024",
    },
  ];
}

export const dateValues = [
  {
    value: 1,
    label: "Last hour",
  },
  {
    value: 4,
    label: "Last 4 hours",
  },
  {
    value: 12,
    label: "Last 12 hours",
  },
  {
    value: 24,
    label: "Last 24 hours",
  },
  {
    value: 56,
    label: "Last 7 days",
  },
  {
    value: 120,
    label: "Last 15 days",
  },
  {
    value: 240,
    label: "Last 30 days",
  },
  {
    value: 720,
    label: "Last 3 months",
  },
  {
    value: 1440,
    label: "Last 6 months",
  },
  {
    value: 2880,
    label: "Last 1 year",
  },
];

export async function getDevices(token) {
  return fetch(
    "https://feeltect.interactive.ie/api/galen/getDevicesInstancesAndData",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${decodeURIComponent(token)}`,
      },
      body: JSON.stringify({
        deviceId: "f3e87d70-1669-4cb0-bfe0-cc435db543bb",
        deviceDataModelId: "7203df8b-68c4-4360-bd93-216c6462b539",
      }),
    },
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export async function getEvent(id) {
  return (await getEvents()).find((event) => event.id.toString() === id);
}

export async function getEventOrders(id) {
  return (await getOrders()).filter(
    (order) => order.event.id.toString() === id,
  );
}

export async function getEvents() {
  return [
    {
      id: 1000,
      name: "Bear Hug: Live in Concert",
      url: "/events/1000",
      date: "May 20, 2024",
      time: "10 PM",
      location: "Harmony Theater, Winnipeg, MB",
      totalRevenue: "$102,552",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 500,
      ticketsSold: 350,
      ticketsSoldChange: "+8.1%",
      pageViews: "24,300",
      pageViewsChange: "-0.75%",
      status: "On Sale",
      imgUrl: "/events/bear-hug.jpg",
      thumbUrl: "/events/bear-hug-thumb.jpg",
    },
    {
      id: 1001,
      name: "Six Fingers — DJ Set",
      url: "/events/1001",
      date: "Jun 2, 2024",
      time: "8 PM",
      location: "Moonbeam Arena, Uxbridge, ON",
      totalRevenue: "$24,115",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 150,
      ticketsSold: 72,
      ticketsSoldChange: "+8.1%",
      pageViews: "57,544",
      pageViewsChange: "-2.5%",
      status: "On Sale",
      imgUrl: "/events/six-fingers.jpg",
      thumbUrl: "/events/six-fingers-thumb.jpg",
    },
    {
      id: 1002,
      name: "We All Look The Same",
      url: "/events/1002",
      date: "Aug 5, 2024",
      time: "4 PM",
      location: "Electric Coliseum, New York, NY",
      totalRevenue: "$40,598",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 275,
      ticketsSold: 275,
      ticketsSoldChange: "+8.1%",
      pageViews: "122,122",
      pageViewsChange: "-8.0%",
      status: "Closed",
      imgUrl: "/events/we-all-look-the-same.jpg",
      thumbUrl: "/events/we-all-look-the-same-thumb.jpg",
    },
    {
      id: 1003,
      name: "Viking People",
      url: "/events/1003",
      date: "Dec 31, 2024",
      time: "8 PM",
      location: "Tapestry Hall, Cambridge, ON",
      totalRevenue: "$3,552",
      totalRevenueChange: "+3.2%",
      ticketsAvailable: 40,
      ticketsSold: 6,
      ticketsSoldChange: "+8.1%",
      pageViews: "9,000",
      pageViewsChange: "-0.15%",
      status: "On Sale",
      imgUrl: "/events/viking-people.jpg",
      thumbUrl: "/events/viking-people-thumb.jpg",
    },
  ];
}

export function getCountries() {
  return [
    {
      name: "Canada",
      code: "CA",
      flagUrl: "/flags/ca.svg",
      regions: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
    },
    {
      name: "Mexico",
      code: "MX",
      flagUrl: "/flags/mx.svg",
      regions: [
        "Aguascalientes",
        "Baja California",
        "Baja California Sur",
        "Campeche",
        "Chiapas",
        "Chihuahua",
        "Ciudad de Mexico",
        "Coahuila",
        "Colima",
        "Durango",
        "Guanajuato",
        "Guerrero",
        "Hidalgo",
        "Jalisco",
        "Mexico State",
        "Michoacán",
        "Morelos",
        "Nayarit",
        "Nuevo León",
        "Oaxaca",
        "Puebla",
        "Querétaro",
        "Quintana Roo",
        "San Luis Potosí",
        "Sinaloa",
        "Sonora",
        "Tabasco",
        "Tamaulipas",
        "Tlaxcala",
        "Veracruz",
        "Yucatán",
        "Zacatecas",
      ],
    },
    {
      name: "United States",
      code: "US",
      flagUrl: "/flags/us.svg",
      regions: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Washington DC",
        "Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "U.S. Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
        "Armed Forces Americas",
        "Armed Forces Europe",
        "Armed Forces Pacific",
      ],
    },
  ];
}
