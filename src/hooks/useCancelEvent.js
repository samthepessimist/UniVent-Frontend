import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelEvent } from "@/api/events";
// Swap this import for whichever toast utility your team already uses
// (e.g. "sonner" or a custom useToast hook) if this path doesn't match.
//import { useToast } from "@/components/ui/use-toast";
 
export function useCancelEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
 
  return useMutation({
    mutationFn: cancelEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", "organizer"] });
      toast({ title: "Event cancelled" });
    },
    onError: (error) => {
      toast({
        title: "Couldn't cancel event",
        description: error?.message,
        variant: "destructive",
      });
    },
  });
}