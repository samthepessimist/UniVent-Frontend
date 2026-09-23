import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Users, PenSquare, ClipboardList, Ban, PlusCircle } from "lucide-react";

import { useOrganizerEvents } from "@/hooks/useOrganizerEvents";
import { useCancelEvent } from "@/hooks/useCancelEvents";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function formatEventDate(isoDate) {
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

function EventRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex shrink-0 gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

function EmptyEvents() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
      <CalendarDays className="h-10 w-10 text-muted-foreground" />
      <div>
        <p className="font-medium">No events yet</p>
        <p className="text-sm text-muted-foreground">
          Create your first event to start accepting bookings.
        </p>
      </div>
      <Button asChild>
        <Link to="/organizer/events/create">Create Your First Event</Link>
      </Button>
    </div>
  );
}

function EventRow({ event, onCancel, isCancelling }) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const canCancel = event.status !== "CANCELLED";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{event.name}</p>
          <StatusBadge status={event.status} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {formatEventDate(event.eventDate)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {event.registeredCount ?? 0} registered
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
        >
          <PenSquare className="mr-1.5 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/organizer/events/${event.id}/registrations`)}
        >
          <ClipboardList className="mr-1.5 h-4 w-4" />
          View Registrations
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
          disabled={!canCancel}
          onClick={() => setConfirmOpen(true)}
        >
          <Ban className="mr-1.5 h-4 w-4" />
          Cancel
        </Button>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel "{event.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This cancels the event for every student who has booked. This
              can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Event</AlertDialogCancel>
            <AlertDialogAction
              disabled={isCancelling}
              onClick={() => {
                onCancel(event.id);
                setConfirmOpen(false);
              }}
            >
              {isCancelling ? "Cancelling..." : "Cancel Event"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function OrganizerEvents() {
  const { data: events, isLoading, isError, error } = useOrganizerEvents();
  const { mutate: cancelEvent, isPending: isCancelling } = useCancelEvent();

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">My Events</h1>
          <p className="text-sm text-muted-foreground">
            Events you're organizing.
          </p>
        </div>
        <Button asChild className="hidden sm:inline-flex">
          <Link to="/organizer/events/create">
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-3">
          <EventRowSkeleton />
          <EventRowSkeleton />
          <EventRowSkeleton />
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Couldn't load your events{error?.message ? `: ${error.message}` : "."}
        </div>
      )}

      {!isLoading && !isError && events?.length === 0 && <EmptyEvents />}

      {!isLoading && !isError && events?.length > 0 && (
        <div className="space-y-3">
          {events.map((event) => (
            <EventRow
              key={event.id}
              event={event}
              onCancel={cancelEvent}
              isCancelling={isCancelling}
            />
          ))}
        </div>
      )}
    </div>
  );
}
