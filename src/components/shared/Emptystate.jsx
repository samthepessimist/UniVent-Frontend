import { Button } from "@/components/ui/button";

/**
 * Reusable empty state block.
 *
 * @param {string | React.ComponentType} icon - Either an emoji/string
 *   (e.g. "🎫") or a component reference (e.g. a lucide-react icon like
 *   `CalendarDays`, not `<CalendarDays />`).
 * @param {string} title - Short headline, e.g. "No events yet".
 * @param {string} message - One sentence of supporting copy.
 * @param {string} [actionLabel] - Optional button label. Omit to render
 *   no action.
 * @param {() => void} [onAction] - Optional callback fired when the
 *   action button is clicked. Required if actionLabel is provided.
 */
export default function EmptyState({ icon, title, message, actionLabel, onAction }) {
  const isIconComponent = typeof icon === "function";
  const Icon = isIconComponent ? icon : null;

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16 text-center">
      {isIconComponent ? (
        <Icon className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
      ) : (
        icon && (
          <span className="text-4xl" aria-hidden="true">
            {icon}
          </span>
        )
      )}

      <div>
        <p className="font-medium">{title}</p>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>

      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
