import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Ticket } from "lucide-react";

import { useMyBookings } from "@/hooks/useMyBookings";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StatusBadge from "@/components/shared/StatusBadge";

function formatBookingDate(isoDate) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function BookingRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-9 w-28 shrink-0" />
    </div>
  );
}

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
      <Ticket className="h-10 w-10 text-muted-foreground" />
      <div>
        <p className="font-medium">No bookings yet</p>
        <p className="text-sm text-muted-foreground">
          You haven't booked any events. Find something happening on campus.
        </p>
      </div>
      <Button asChild>
        <Link to="/student">Browse Events</Link>
      </Button>
    </div>
  );
}

function BookingRow({ booking }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{booking.eventName}</p>
          <StatusBadge status={booking.status} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {formatBookingDate(booking.bookingDate)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {booking.venue}
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="shrink-0"
        onClick={() => navigate(`/student/tickets/${booking.id}`)}
      >
        View Ticket
      </Button>
    </div>
  );
}

export default function MyBookings() {
  const { data: bookings, isLoading, isError, error } = useMyBookings();

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold">My Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Events you've booked, most recent first.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <BookingRowSkeleton />
          <BookingRowSkeleton />
          <BookingRowSkeleton />
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Couldn't load your bookings{error?.message ? `: ${error.message}` : "."}
        </div>
      )}

      {!isLoading && !isError && bookings?.length === 0 && <EmptyBookings />}

      {!isLoading && !isError && bookings?.length > 0 && (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
