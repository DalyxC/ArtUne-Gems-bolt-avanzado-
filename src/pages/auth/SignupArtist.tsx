import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Music2, ArrowRight, ArrowLeft, Upload } from "lucide-react";
import LocationInput from "@/components/onboarding/LocationInput";

const CATEGORIES = [
  "Musician",
  "Singer",
  "DJ",
  "Band",
  "Painter",
  "Photographer",
  "Dancer",
  "Actor",
  "Other"
];

export default function SignupArtist() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Auth data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: Identidad Básica
  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Step 2: Tu Gancho
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [tagline, setTagline] = useState("");

  // Step 3: ¿Qué buscas?
  const [lookingForWork, setLookingForWork] = useState(true);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async () => {
    if (step === 1) {
      // Validate auth fields
      if (!email || !password) {
        toast.error("Please enter email and password");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      // Validate basic identity
      if (!fullName || !category || !city || !country) {
        toast.error("Please complete all required fields");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      // Validate tagline
      if (!tagline || tagline.length > 140) {
        toast.error("Please enter a tagline (max 140 characters)");
        return;
      }
      setStep(4);
      return;
    }

    // Final step - create account
    setLoading(true);

    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user data returned");

      // 2. Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          email,
          full_name: fullName,
          bio: tagline,
          onboarding_completed: true
        });

      if (profileError) throw profileError;

      // 3. Upload avatar if provided
      let avatarUrl = null;
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('artist-portfolio')
          .upload(`avatars/${fileName}`, avatarFile);

        if (uploadError) {
          console.error("Avatar upload error:", uploadError);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from('artist-portfolio')
            .getPublicUrl(`avatars/${fileName}`);
          avatarUrl = publicUrl;

          // Update profile with avatar
          await supabase
            .from("profiles")
            .update({ avatar_url: avatarUrl })
            .eq("id", authData.user.id);
        }
      }

      // 4. Create artist profile
      const { error: artistError } = await supabase
        .from("artist_profiles")
        .insert({
          user_id: authData.user.id,
          stage_name: stageName || fullName,
          primary_category: category,
          location_city: city,
          location_country: country,
          availability: lookingForWork ? "available" : "not_available",
          accepts_one_time: true, // Default to accepting one-time gigs
          profile_completion: 30, // Starting at 30%
          setup_step_completed: 1
        });

      if (artistError) throw artistError;

      // 5. Set user role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: authData.user.id,
          role: "artist"
        });

      if (roleError) throw roleError;

      toast.success("Account created! Welcome to ArtUne 🎉");
      navigate("/artist/dashboard");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Music2 className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Join as Artist</CardTitle>
          <CardDescription>
            {step === 1 && "Create your account"}
            {step === 2 && "Tell us about yourself"}
            {step === 3 && "Show your personality"}
            {step === 4 && "What are you looking for?"}
          </CardDescription>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Auth */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Identidad Básica */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stageName">Artist Name (Optional)</Label>
                <Input
                  id="stageName"
                  placeholder="DJ JohnnyD"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Leave blank to use your full name</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Base Location *</Label>
                <LocationInput
                  city={city}
                  country={country}
                  onCityChange={setCity}
                  onCountryChange={setCountry}
                />
              </div>
            </div>
          )}

          {/* Step 3: Tu Gancho */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    {avatarPreview ? (
                      <AvatarImage src={avatarPreview} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview("");
                      }}
                    >
                      Skip for now
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline / Short Bio *</Label>
                <Input
                  id="tagline"
                  placeholder="Jazz guitarist specializing in weddings and events"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  maxLength={140}
                />
                <p className="text-xs text-muted-foreground">{tagline.length}/140 characters</p>
              </div>
            </div>
          )}

          {/* Step 4: ¿Qué buscas? */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-1">
                  <Label htmlFor="lookingForWork" className="text-base">
                    Are you actively looking for work?
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your profile will be visible to clients searching for artists
                  </p>
                </div>
                <Switch
                  id="lookingForWork"
                  checked={lookingForWork}
                  onCheckedChange={setLookingForWork}
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">What's next?</p>
                <p className="text-sm text-muted-foreground">
                  After creating your account, you can complete your profile with:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Portfolio photos and videos</li>
                  <li>• Service packages and pricing</li>
                  <li>• Payment setup (Stripe Connect)</li>
                  <li>• Advanced booking options</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleSignup}
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                "Creating account..."
              ) : step === 4 ? (
                "Create Account"
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
