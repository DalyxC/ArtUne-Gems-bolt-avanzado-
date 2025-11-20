import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface LocationData {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

interface LocationPickerProps {
  value: LocationData;
  onChange: (location: LocationData) => void;
}

const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
  // Note: For production, integrate Google Places Autocomplete API
  // This is a simplified version that accepts manual input
  
  const [city, setCity] = useState(value.city || '');
  const [country, setCountry] = useState(value.country || '');

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    onChange({ ...value, city: newCity });
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    onChange({ ...value, country: newCountry });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <MapPin className="w-4 h-4" />
        <p className="text-sm">
          Enter your location to help clients find you
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="New York"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="United States"
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        💡 Tip: In production, this will use Google Places Autocomplete for accurate location data
      </p>
    </div>
  );
};

export default LocationPicker;
