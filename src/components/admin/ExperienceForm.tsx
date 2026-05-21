"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Experience } from "@/types";

interface ExperienceFormProps {
  experience?: Experience;
  onSubmit: (data: Experience) => Promise<void>;
  onCancel: () => void;
}

export default function ExperienceForm({
  experience,
  onSubmit,
  onCancel,
}: ExperienceFormProps) {
  const [company, setCompany] = useState(experience?.company || "");
  const [role, setRole] = useState(experience?.role || "");
  const [description, setDescription] = useState(experience?.description || "");
  const [startDate, setStartDate] = useState(experience?.start_date || "");
  const [endDate, setEndDate] = useState(experience?.end_date || "");
  const [isCurrent, setIsCurrent] = useState(experience?.is_current || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        ...experience,
        company,
        role,
        description,
        start_date: startDate,
        end_date: isCurrent ? undefined : endDate,
        is_current: isCurrent,
      } as Experience;

      await onSubmit(formData);
    } catch {
      setError("Failed to save experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Company"
        placeholder="Enter company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <Input
        label="Role / Position"
        placeholder="Enter position title"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />

      <Textarea
        label="Description"
        placeholder="Responsibilities and accomplishments..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Input
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_current"
          checked={isCurrent}
          onChange={(e) => setIsCurrent(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="is_current" className="text-sm font-medium text-gray-700">
          I currently work here
        </label>
      </div>

      {!isCurrent && (
        <Input
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Experience"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
