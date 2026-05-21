"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Project } from "@/types";
import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Project) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tags, setTags] = useState(project?.tags.join(", ") || "");
  const [imageUrl, setImageUrl] = useState(project?.image_url || "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url || "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url || "");
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
      } else {
        setError("Image upload failed. Only PNG files are accepted.");
      }
    } catch {
      setError("Upload error. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        ...project,
        title,
        description,
        slug: slugify(title),
        tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        image_url: imageUrl || undefined,
        github_url: githubUrl || undefined,
        live_url: liveUrl || undefined,
      } as Project;

      await onSubmit(formData);
    } catch {
      setError("Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Project Title"
        placeholder="Enter project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        label="Description"
        placeholder="Enter project description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <Input
        label="Tags (comma separated)"
        placeholder="React, Next.js, TypeScript"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Project Image (PNG only)
        </label>
        {imageUrl && (
          <div className="mb-2">
            <img src={imageUrl} alt="Project preview" className="h-32 rounded-md" />
          </div>
        )}
        <input
          type="file"
          accept="image/png"
          onChange={handleImageUpload}
          disabled={uploadingImage}
          className="block w-full text-sm text-gray-500"
        />
        {uploadingImage && (
          <p className="text-sm text-gray-500 mt-1">Uploading...</p>
        )}
      </div>

      <Input
        label="GitHub URL (optional)"
        type="url"
        placeholder="https://github.com/..."
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <Input
        label="Live URL (optional)"
        type="url"
        placeholder="https://..."
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
      />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading || uploadingImage}>
          {loading ? "Saving..." : "Save Project"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
