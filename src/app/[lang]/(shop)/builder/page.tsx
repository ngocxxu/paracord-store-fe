import { ColorSelector } from "@/features/custom-builder/components/ColorSelector";

export default function BuilderPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Custom Paracord Builder</h1>
      <ColorSelector className="mt-6" />
    </div>
  );
}
