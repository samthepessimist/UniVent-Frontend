import { MapPin, User as UserIcon, Users } from "lucide-react";

// Category -> badge colour. Matches the categories documented in the README.
const CATEGORY_STYLES = {
  Tech: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Sports: "bg-green-50 text-green-700 ring-green-600/20",
  Social: "bg-pink-50 text-pink-700 ring-pink-600/20",
  Academic: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const DEFAULT_CATEGORY_STYLE = "bg-slate-100 text-slate-700 ring-slate-500/20";

function formatDateTime(dateTime) {
  if (!dateTime) return "Date TBA";
  const date = new Date(dateTime);
  if (Number.isNaN(date.getTime())) return "Date TBA";

  const datePart = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${datePart} · ${timePart}`;
}

// venue can be a plain string, or an object like { name, campus }
// depending on how the backend DTO ends up shaping it.
function formatVenue(venue) {
  if (!venue) return "Venue TBA";
  if (typeof venue === "string") return venue;
  if (venue.name && venue.campus) return `${venue.name}, ${venue.campus}`;
  return venue.name || venue.campus || "Venue TBA";
}

export default function EventCard({ event, onBook }) {
  const {
    id,
    name,
    dateTime,
    venue,
    organizer,
    category,
    spotsRemaining,
    isBooked = false,
  } = event ?? {};

  const isFull = !isBooked && (spotsRemaining ?? 0) <= 0;
  const categoryStyle = CATEGORY_STYLES[category] ?? DEFAULT_CATEGORY_STYLE;

  const handleBook = () => {
    if (isBooked || isFull) return;
    onBook?.(id);
  };

  let buttonLabel = "Book";
  if (isBooked) buttonLabel = "Booked ✓";
  else if (isFull) buttonLabel = "Full";

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-slate-900">
          {name || "Untitled event"}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${categoryStyle}`}
        >
          {category || "General"}
        </span>
      </div>

      <p className="text-sm font-medium text-slate-700">{formatDateTime(dateTime)}</p>

      <div className="flex flex-col gap-1.5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{formatVenue(venue)}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 shrink-0 text-slate-400" />
          <span>{organizer || "Organizer TBA"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0 text-slate-400" />
          <span>
            {isFull
              ? "No spots remaining"
              : `${spotsRemaining} ${spotsRemaining === 1 ? "spot" : "spots"} remaining`}
          </span>
        </div>
      </div>

      <button
        onClick={handleBook}
        disabled={isBooked || isFull}
        className={`mt-1 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isBooked
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : isFull
            ? "cursor-not-allowed bg-slate-100 text-slate-400"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
