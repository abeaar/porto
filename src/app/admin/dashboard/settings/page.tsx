"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Bio } from "@/types";

export default function SettingsPage() {
  const [bio, setBio] = useState<Bio>({ name: "", title: "", bio: "" });
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/bio");
        if (response.ok) {
          const data = await response.json();
          setBio(data.bio ?? data);
          setSkills((data.skills ?? []).join(", "));
        } else {
          setError("Failed to load settings.");
        }
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/bio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bio,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        setSuccess("Settings saved successfully.");
      } else {
        setError("Failed to save settings.");
      }
    } catch {
      setError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading settings...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Bio</h2>

          <Input
            label="Display Name"
            placeholder="Your Name"
            value={bio.name}
            onChange={(e) => setBio({ ...bio, name: e.target.value })}
            required
          />

          <Input
            label="Title / Role"
            placeholder="Full-Stack Engineer & ML Enthusiast"
            value={bio.title}
            onChange={(e) => setBio({ ...bio, title: e.target.value })}
            required
          />

          <Textarea
            label="Short Bio"
            placeholder="A few sentences about yourself..."
            value={bio.bio}
            onChange={(e) => setBio({ ...bio, bio: e.target.value })}
            required
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <Input
            label="Skills (comma separated)"
            placeholder="React, TypeScript, Node.js, Python"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Each skill will appear as a tag on the public portfolio page.
          </p>
        </div>

        {success && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
            {success}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
