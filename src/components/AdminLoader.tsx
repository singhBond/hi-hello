// src/components/loaders/RestaurantCatalogueLoader.tsx
import {
  Soup,
  UtensilsCrossed,
  CookingPot,
  Flame,
  Loader2,
} from "lucide-react";

export default function RestaurantCatalogueLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-2 text-center min-h-72">
      {/* Bouncing Restaurant Icons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-10 mb-8 sm:mb-10">
        <CookingPot className="w-16 h-16 sm:w-20 sm:h-20 text-orange-600 animate-bounce" />
        <Soup className="w-16 h-16 sm:w-20 sm:h-20 text-amber-600 animate-bounce [animation-delay:150ms]" />
        <UtensilsCrossed className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-700 animate-bounce [animation-delay:300ms]" />
        <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 animate-bounce [animation-delay:450ms]" />
      </div>

      {/* Main Loading Text */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 animate-spin text-orange-500" />
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-50 animate-pulse leading-tight">
          Preparing fresh dishes...
        </p>
      </div>

      {/* Subtext */}
      <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 mt-4 sm:mt-6 max-w-2xl">
        Loading our delicious restaurant menu
      </p>
    </div>
  );
}
