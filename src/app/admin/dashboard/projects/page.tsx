"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setError("");
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        setError("Failed to load projects.");
      }
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (project: Project) => {
    if (editingProject) {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        fetchProjects();
        setIsFormOpen(false);
        setEditingProject(undefined);
      }
    } else {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        fetchProjects();
        setIsFormOpen(false);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    const response = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProjects();
      setDeleteModal({ open: false });
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => setIsFormOpen(true)}>Add Project</Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <Modal
        isOpen={isFormOpen}
        title={editingProject ? "Edit Project" : "New Project"}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProject(undefined);
        }}
      >
        <ProjectForm
          project={editingProject}
          onSubmit={handleSaveProject}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProject(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={deleteModal.open}
        title="Delete Project"
        isDangerous
        onConfirm={() => deleteModal.id && handleDeleteProject(deleteModal.id)}
        onClose={() => setDeleteModal({ open: false })}
        confirmText="Delete"
      >
        <p>Are you sure you want to delete this project? This action cannot be undone.</p>
      </Modal>

      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet. Add your first one!</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditingProject(project);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteModal({ open: true, id: project.id })}
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
