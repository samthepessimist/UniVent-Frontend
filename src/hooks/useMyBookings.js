import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "@/api/bookings";
 
export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings", "my"],
    queryFn: getMyBookings,
    select: (bookings) =>
      [...bookings].sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      ),
  });
}
 