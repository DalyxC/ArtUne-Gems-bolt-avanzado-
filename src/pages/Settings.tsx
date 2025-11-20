import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Lock, CreditCard, Globe, Palette } from "lucide-react";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account preferences and settings</p>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="bg-[#0F1419] border border-border/50">
                <TabsTrigger value="account">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Lock className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="billing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </TabsTrigger>
              </TabsList>

              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" className="bg-[#1A1F2C] border-border/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Anderson" className="bg-[#1A1F2C] border-border/50" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sarah@artune.com" className="bg-[#1A1F2C] border-border/50" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" className="bg-[#1A1F2C] border-border/50" />
                    </div>

                    <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Language</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="bg-[#1A1F2C] border border-border/50 rounded-md px-3 py-2 text-foreground">
                        <option>English (US)</option>
                        <option>Español</option>
                        <option>Français</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Timezone</Label>
                        <p className="text-sm text-muted-foreground">Your local timezone</p>
                      </div>
                      <select className="bg-[#1A1F2C] border border-border/50 rounded-md px-3 py-2 text-foreground">
                        <option>Pacific Time (PT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Central Time (CT)</option>
                        <option>Eastern Time (ET)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Email Notifications</CardTitle>
                    <CardDescription>Manage how you receive email updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "New Booking Requests", description: "Get notified when clients send booking requests" },
                      { label: "Messages", description: "Receive email alerts for new messages" },
                      { label: "Payment Confirmations", description: "Updates about payment status and receipts" },
                      { label: "Weekly Summary", description: "Weekly digest of your activity and metrics" },
                      { label: "Marketing Emails", description: "Tips, promotions, and platform updates" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                        <div className="space-y-0.5">
                          <Label>{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked={idx < 3} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Push Notifications</CardTitle>
                    <CardDescription>Control mobile and browser notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Real-time Messages", description: "Instant alerts for new messages" },
                      { label: "Booking Updates", description: "Status changes on your bookings" },
                      { label: "Event Reminders", description: "Upcoming event notifications" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                        <div className="space-y-0.5">
                          <Label>{item.label}</Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Change Password</CardTitle>
                    <CardDescription>Update your password regularly for security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="bg-[#1A1F2C] border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="bg-[#1A1F2C] border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="bg-[#1A1F2C] border-border/50" />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                      <div className="space-y-0.5">
                        <Label>Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">Require authentication code for login</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F1419] border-border/50 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                      Deactivate Account
                    </Button>
                    <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                      Delete Account Permanently
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Settings */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Subscription Plan</CardTitle>
                    <CardDescription>Manage your ArtUne subscription</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">Pro Plan</h3>
                          <p className="text-sm text-muted-foreground">Billed monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-foreground">$29</p>
                          <p className="text-sm text-muted-foreground">/month</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-muted-foreground">✓ Unlimited bookings</p>
                        <p className="text-sm text-muted-foreground">✓ Advanced analytics</p>
                        <p className="text-sm text-muted-foreground">✓ Priority support</p>
                        <p className="text-sm text-muted-foreground">✓ Featured profile</p>
                      </div>
                      <Button variant="outline" className="w-full border-border/50">
                        Upgrade Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F1419] border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Payment History</CardTitle>
                    <CardDescription>View your billing history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
                        { date: "Oct 1, 2024", amount: "$29.00", status: "Paid" },
                        { date: "Sep 1, 2024", amount: "$29.00", status: "Paid" }
                      ].map((payment, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2C] border border-border/50">
                          <div>
                            <p className="font-semibold text-foreground">{payment.date}</p>
                            <p className="text-sm text-muted-foreground">Pro Plan Subscription</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{payment.amount}</p>
                            <p className="text-sm text-emerald-400">{payment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
