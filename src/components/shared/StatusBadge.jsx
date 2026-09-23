const STATUS_CONFIG = {
  PENDING_APPROVAL: {
    label: "Pending Approval",
    className: "bg-amber-100 text-amber-800 border-amber-200",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  DISABLED: {
    label: "Disabled",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  ATTENDED: {
    label: "Attended",
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

/**
 * Consistent status indicator. Always shows a text label alongside
 * color so status is never conveyed by color alone.
 */
export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status ?? "Unknown",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
