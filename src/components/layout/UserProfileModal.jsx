import React, { useState } from "react";
import { useStore } from "../../store";
import { X, User, Mail, Briefcase, Camera } from "lucide-react";
import { cn } from "../../lib/utils";

export const UserProfileModal = ({ onClose }) => {
  const { user, setUser, role } = useStore();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    title: user.title || ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-border bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-xl font-bold text-text">User Profile</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-500 to-blue-500 border-4 border-white dark:border-gray-800 shadow-md flex items-center justify-center text-white text-3xl font-bold uppercase transition-transform group-hover:scale-105">
                {formData.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            {!isEditing ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-text">{user.name}</h3>
                <p className="text-primary-500 font-medium mb-1">{user.title}</p>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 capitalize border border-border mt-2">
                  Role: {role}
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                required
                className={cn(
                  "w-full p-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-primary-500 transition-colors",
                  isEditing ? "border-border bg-white dark:bg-gray-800 text-text" : "border-transparent bg-gray-50 dark:bg-gray-800/30 text-text-muted"
                )}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Job Title
              </label>
              <input
                type="text"
                disabled={!isEditing}
                required
                className={cn(
                  "w-full p-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-primary-500 transition-colors",
                  isEditing ? "border-border bg-white dark:bg-gray-800 text-text" : "border-transparent bg-gray-50 dark:bg-gray-800/30 text-text-muted"
                )}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                required
                className={cn(
                  "w-full p-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-primary-500 transition-colors",
                  isEditing ? "border-border bg-white dark:bg-gray-800 text-text" : "border-transparent bg-gray-50 dark:bg-gray-800/30 text-text-muted"
                )}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="pt-6 flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium border border-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-500 transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, title: user.title, email: user.email });
                    }}
                    className="flex-[0.5] px-4 py-2.5 rounded-xl font-medium border border-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl font-medium bg-green-600 text-white hover:bg-green-500 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
