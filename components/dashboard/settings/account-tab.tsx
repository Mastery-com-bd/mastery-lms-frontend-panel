import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showLoading, showSuccess } from "@/lib/toast";
import { updateProfile } from "@/service/dashboard/settings";
import { ProfileProps } from "@/type/dashboard/settings";
import { Camera, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profilePhoto: string | null;
  address: string | null;
  bio: string;
  role: string;
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
}

const AccountTab = ({ profile }: { profile: ProfileProps }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const [userResponse, setUserResponse] = useState<UserResponse | null>(
    profile.data,
  );

  console.log("User Response : ", userResponse);

  const handleSaveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    showLoading("Updating...");

    const formData = new FormData();
    formData.append("fullName", userResponse?.fullName || "");
    formData.append("phoneNumber", userResponse?.phoneNumber || "");
    formData.append("address", userResponse?.address || "");
    formData.append("bio", userResponse?.bio || "");

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    try {
      const res = await updateProfile(formData);

      console.log("Profile Update Response :", res);

      toast.dismiss();
      if (res.success) {
        showSuccess({
          message: res?.message || "Profile updated successfully",
          duration: 3000,
        });
      } else {
        showError({
          message: res?.message || "Error updating profile",
          duration: 3000,
        });
      }
      setIsUpdating(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.dismiss();
      showError({
        message: "Error updating profile",
        duration: 3000,
      });
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Account settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="relative border border-border p-8 bg-white flex flex-col items-center justify-center space-y-6">
              {profilePhoto && (
                <Button
                  type="button"
                  onClick={() => setProfilePhoto(null)}
                  className="cursor-pointer absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              )}
              <div className="relative group w-48 h-48 border border-border overflow-hidden">
                {profilePhoto ? (
                  <>
                    <Image
                      width={500}
                      height={500}
                      src={
                        profilePhoto ? URL.createObjectURL(profilePhoto) : ""
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </>
                ) : (
                  <Image
                    width={500}
                    height={500}
                    src={
                      userResponse?.profilePhoto ||
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2574&auto=format&fit=crop"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white h-8 w-8 mb-2" />
                  <span className="text-white text-xs font-bold uppercase">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setProfilePhoto(file);
                    }}
                  />
                </label>
              </div>
              <div className="text-center space-y-2">
                <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-tighter">
                  Image size should be under 1MB <br /> and image ratio needs to
                  be 1:1
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form onSubmit={handleSaveAccount} className="space-y-6 max-w-2xl">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Full name
                  </Label>
                  <Input
                    placeholder="Full name"
                    className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
                    defaultValue={userResponse?.fullName || ""}
                    onChange={(e) =>
                      setUserResponse({
                        ...userResponse!,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Phone
                  </Label>
                  <Input
                    placeholder="Enter your phone number"
                    className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
                    defaultValue={userResponse?.phoneNumber || ""}
                    maxLength={11}
                    onChange={(e) =>
                      setUserResponse({
                        ...userResponse!,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    disabled
                    placeholder="Email address"
                    type="email"
                    className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
                    defaultValue={userResponse?.email || ""}
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Title
                  </Label>
                  <Input
                    placeholder="Your tittle, class or small biography"
                    className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
                    defaultValue={userResponse?.bio || ""}
                    maxLength={128}
                    onChange={(e) =>
                      setUserResponse({
                        ...userResponse!,
                        bio: e.target.value,
                      })
                    }
                  />
                  <span className="absolute right-3 bottom-3 text-[10px] font-mono text-muted-foreground">
                    {userResponse?.bio?.length || 0}/128
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                className="rounded-none bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 h-12 transition-all active:scale-95"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
