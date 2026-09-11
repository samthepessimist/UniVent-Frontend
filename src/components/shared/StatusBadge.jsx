// Status -> badge colour + display label.
// Used across My Bookings, Organizer My Events, and Admin events table.
const STATUS_CONFIG = {
  PENDING_APPROVAL: {
    label: "Pending Approval",
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-teal-50 text-teal-700 ring-teal-600/20",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 ring-red-600/20",
  },
  DISABLED: {
    label: "Disabled",
    className: "bg-red-50 text-red-700 ring-red-600/20",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-teal-50 text-teal-700 ring-teal-600/20",
  },
  ATTENDED: {
    label: "Attended",
    className: "bg-slate-100 text-slate-600 ring-slate-500/20",
  },
};

const DEFAULT_CONFIG = {
  label: "Unknown",
  className: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function StatusBadge({ status }) {
  const { label, className } = STATUS_CONFIG[status] ?? DEFAULT_CONFIG;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}
