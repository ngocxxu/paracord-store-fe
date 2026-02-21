"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MEASURE_VIDEO_ID } from "../data";
import type { BuilderDict } from "../types";

interface MeasureGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: BuilderDict;
}

export function MeasureGuideModal({
  open,
  onOpenChange,
  dict,
}: MeasureGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-brand-border bg-brand-bg-card text-brand-text-high">
        <DialogHeader>
          <DialogTitle className="text-brand-text-high">
            {dict.measureGuideTitle}
          </DialogTitle>
        </DialogHeader>
        {MEASURE_VIDEO_ID ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-brand-border bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${MEASURE_VIDEO_ID}`}
              title={dict.measureGuideTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : null}
        {Array.isArray(dict.measureSteps) && dict.measureSteps.length > 0 && (
          <ol className="list-inside list-decimal space-y-2 text-sm text-brand-text-medium">
            {dict.measureSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        )}
      </DialogContent>
    </Dialog>
  );
}
