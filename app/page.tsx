import { LeaseForm } from "@/components/leaseform";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="px-8">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">
        Lease Calculator
      </h1>
      <LeaseForm />
    </main>
  );
}
