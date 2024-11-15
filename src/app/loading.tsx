import { Card } from "@/components/ui/card";

const Loading = () => {
 return (
  <div className="grid grid-cols-2 min-[500px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 min-[1400px]:grid-cols-8 gap-4">
   {Array.from({ length: 24 }).map((_, i) => (
    <Card key={i} className="overflow-hidden transition-all [animation-duration:3000ms] ease-in-out border-2 bg-secondary animate-pulse">
     <div className="relative overflow-hidden aspect-square w-full h-full" />
     <div className="px-2 py-8" />
    </Card>
   ))}
  </div>
 );
};
export default Loading;
