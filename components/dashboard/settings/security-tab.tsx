import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showError, showLoading, showSuccess } from "@/lib/toast";
import { changePassword } from "@/service/settings";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SecurityTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChangePassword = async () => {
    setIsLoading(true);

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setIsLoading(false);
      showError({ message: "Please fill all the fields" });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setIsLoading(false);
      showError({ message: "New password and confirm password do not match" });
      return;
    }

    try {
      showLoading("Changing password...");
      const payload = {
        oldPassword: passwords.current.trim(),
        newPassword: passwords.new.trim(),
      }

      const result = await changePassword(payload);

      if (result.success) {
        toast.dismiss();
        showSuccess({
          message: result.message || "Password changed successfully",
        });
        // Optionally clear form
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        toast.dismiss();
        // Display backend error message
        showError({ message: result.message || "Failed to change password" });
      }
    } catch (err) {
      console.error(err);
      showError({ message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Change password</h2>
        <div className="max-w-2xl space-y-6">
          <div className="space-y-2 relative">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Current Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, current: e.target.value }))
                }
                placeholder="Password"
                className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
              />
              <button
                type="button"
                disabled={isLoading}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.current ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              New Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, new: e.target.value }))
                }
                placeholder="Password"
                className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2 relative">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                }
                placeholder="Confirm new password"
                className="rounded-none border-border focus:border-red-600 focus-visible:ring-0 h-12 px-4 bg-white"
              />
              <button
                disabled={isLoading}
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.confirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button
              disabled={isLoading}
              onClick={() => handleChangePassword()}
              className="rounded-none bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 h-12"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : ""}{" "}
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
