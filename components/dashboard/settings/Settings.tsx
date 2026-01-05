"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  Bell,
  Camera,
  Check,
  CreditCard,
  Download,
  Globe,
  Lock,
  Mail,
  Palette,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border sticky top-24">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {[
                    { id: "profile", icon: User, label: "Profile" },
                    { id: "notifications", icon: Bell, label: "Notifications" },
                    { id: "security", icon: Shield, label: "Security" },
                    { id: "billing", icon: CreditCard, label: "Billing" },
                    { id: "appearance", icon: Palette, label: "Appearance" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <>
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          JPG, GIF or PNG. Max size 2MB
                        </p>
                        <Button variant="outline" size="sm">
                          Upload Photo
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-9"
                          defaultValue="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="w-full min-h-25 px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                            <SelectItem value="est">EST (GMT-5)</SelectItem>
                            <SelectItem value="pst">PST (GMT-8)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button variant="gradient">Save Changes</Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      Email Notifications
                    </h4>
                    {[
                      {
                        id: "course-updates",
                        label: "Course Updates",
                        desc: "New lessons and course updates",
                      },
                      {
                        id: "promotions",
                        label: "Promotions",
                        desc: "Discounts and special offers",
                      },
                      {
                        id: "messages",
                        label: "Messages",
                        desc: "When someone sends you a message",
                      },
                      {
                        id: "reminders",
                        label: "Learning Reminders",
                        desc: "Reminders to continue learning",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                        <Switch defaultChecked={item.id !== "promotions"} />
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h4 className="font-medium text-foreground">
                      Push Notifications
                    </h4>
                    {[
                      {
                        id: "push-all",
                        label: "Enable Push Notifications",
                        desc: "Receive notifications on your device",
                      },
                      {
                        id: "push-sound",
                        label: "Notification Sound",
                        desc: "Play sound for notifications",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>

                  <Button variant="gradient">Save Preferences</Button>
                </CardContent>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <>
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type="password"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type="password"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="pl-9"
                        />
                      </div>
                    </div>
                    <Button variant="gradient">Update Password</Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            Authenticator App
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Use Google Authenticator or similar
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-success text-success"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Delete Account
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <>
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Current Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div>
                        <Badge className="mb-2">Pro Plan</Badge>
                        <p className="text-2xl font-bold text-foreground">
                          $29/month
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Next billing date: January 15, 2025
                        </p>
                      </div>
                      <Button variant="outline">Upgrade Plan</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            •••• •••• •••• 4242
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/26
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="w-4 h-4" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-foreground">
                      Billing History
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download All
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          date: "Dec 15, 2024",
                          amount: "$29.00",
                          status: "Paid",
                        },
                        {
                          date: "Nov 15, 2024",
                          amount: "$29.00",
                          status: "Paid",
                        },
                        {
                          date: "Oct 15, 2024",
                          amount: "$29.00",
                          status: "Paid",
                        },
                      ].map((invoice, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-3 border-b border-border last:border-0"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {invoice.date}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Pro Plan
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-foreground">
                              {invoice.amount}
                            </span>
                            <Badge
                              variant="outline"
                              className="border-success text-success"
                            >
                              {invoice.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Appearance</CardTitle>
                  <CardDescription>Customize how the app looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          id: "light",
                          label: "Light",
                          bg: "bg-white",
                          text: "text-gray-900",
                        },
                        {
                          id: "dark",
                          label: "Dark",
                          bg: "bg-gray-900",
                          text: "text-white",
                        },
                        {
                          id: "system",
                          label: "System",
                          bg: "bg-gradient-to-r from-white to-gray-900",
                          text: "text-gray-600",
                        },
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          className="p-4 rounded-lg border-2 border-border hover:border-primary transition-colors"
                        >
                          <div
                            className={`w-full h-20 rounded-md ${theme.bg} mb-2`}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Reduce Motion
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations throughout the app
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          Compact Mode
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Reduce padding and spacing
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Button variant="gradient">Save Preferences</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
