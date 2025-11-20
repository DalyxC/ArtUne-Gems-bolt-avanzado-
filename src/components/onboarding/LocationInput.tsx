import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface LocationInputProps {
  city: string;
  country: string;
  onCityChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  disabled?: boolean;
}

// TODO: Integrate Google Places Autocomplete API for structured location data
// This will store city, country, and coordinates for filtering

const LocationInput = ({ city, country, onCityChange, onCountryChange, disabled }: LocationInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>This helps clients find you by location</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Los Angeles"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="United States"
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Note: Google Places Autocomplete will be integrated for better location accuracy
      </p>
    </div>
  );
};

export default LocationInput;
