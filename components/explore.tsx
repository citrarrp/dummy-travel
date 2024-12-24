import { Button } from "@/components/ui/button";

export const Start = () => {
  return (
    <section className="bg-secondary py-20 text-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 font-bold font-display text-4xl">
          Ready to Start Your Journey?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Join our experience, and leave the good story of yours.
        </p>
        <Button
          size="lg"
          className="rounded-lg bg-primary text-lg text-white shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
        >
          Share your experience
        </Button>
      </div>
    </section>
  );
};
