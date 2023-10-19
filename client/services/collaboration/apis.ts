import { Location } from "../../types/location";
import { fetchy } from "../../utils/fetchy";

export const sendMeetingRequest = async (location: Location) => {
  await fetchy("/api/meeting/requests", "POST", {
    body: { location },
  });
};

export const removeMeetingRequest = async () => {
  await fetchy("/api/meeting/requests", "DELETE");
};

export const fetchMeetingRequestMarkers = async ({ lat, lng }: Location) => {
  return (await fetchy("/api/meeting/requests", "GET", {
    query: {
      lat: `${lat}`,
      lng: `${lng}`,
    },
    alert: false,
  })) as {
    meetingRequest: {
      from: string;
    };
    location: Location;
  }[];
};

export const acceptMeetingRequest = async ({ from, location }: { from: string; location: Location }) => {
  await fetchy(`/api/meeting/accept/${from}`, "PUT", {
    body: { location },
  });
};

export const fetchMyMeeting = async () => {
  return (await fetchy("/api/meeting", "GET", {
    alert: false,
  })) as {
    host: string;
    guest: string;
    at: Location;
  };
};

export const endMyMeeting = async () => {
  await fetchy("/api/meeting", "DELETE");
};
