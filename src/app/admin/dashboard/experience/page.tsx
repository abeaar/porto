"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { Experience } from "@/types";
import { formatDateShort } from "@/lib/utils";

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  const fetchExperience = async () => {
    setError("");
    try {
      const response = await fetch("/api/experience");
      if (response.ok) {
        const data = await response.json();
        setExperience(data);
      } else {
        setError("Failed to load experience.");
      }
    } catch {
      setError("Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => void fetchExperience(), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveExperience = async (exp: Experience) => {
    if (editingExp) {
      const response = await fetch(`/api/experience/${editingExp.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exp),
      });

      if (response.ok) {
        fetchExperience();
        setIsFormOpen(false);
        setEditingExp(undefined);
      }
    } else {
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exp),
      });

      if (response.ok) {
        fetchExperience();
        setIsFormOpen(false);
      }
    }
  };

  const handleDeleteExperience = async (id: string) => {
    const response = await fetch(`/api/experience/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchExperience();
      setDeleteModal({ open: false });
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading experience...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Experience</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add Experience</Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <Modal
        isOpen={isFormOpen}
        title={editingExp ? "Edit Experience" : "New Experience"}
        onClose={() => {
          setIsFormOpen(false);
          setEditingExp(undefined);
        }}
      >
        <ExperienceForm
          experience={editingExp}
          onSubmit={handleSaveExperience}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingExp(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={deleteModal.open}
        title="Delete Experience"
        isDangerous
        onConfirm={() => deleteModal.id && handleDeleteExperience(deleteModal.id)}
        onClose={() => setDeleteModal({ open: false })}
        confirmText="Delete"
      >
        <p>Are you sure you want to delete this experience entry?</p>
      </Modal>

      {experience.length === 0 ? (
        <p className="text-gray-500">No experience yet. Add your first entry!</p>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <Card key={exp.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{exp.role}</h2>
                  <p className="text-green-700 font-semibold">{exp.company}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {formatDateShort(exp.start_date)} &ndash;{" "}
                    {exp.is_current ? "Present" : formatDateShort(exp.end_date || "")}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">{exp.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingExp(exp);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteModal({ open: true, id: exp.id })}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
