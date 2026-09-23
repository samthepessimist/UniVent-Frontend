import { useQuery } from "@tanstack/react-query";
import { getOrganizerEvents } from "@/api/events";
 
export function useOrganizerEvents() {
  return useQuery({
    queryKey: ["events", "organizer"],
    queryFn: getOrganizerEvents,
  });
}
 