"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
          <p className="text-gray-600 mb-4">Manage your portfolio projects</p>
          <Link href="/admin/dashboard/projects">
            <Button variant="primary" size="sm" className="w-full">
              Manage Projects
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
          <p className="text-gray-600 mb-4">Update your work experience</p>
          <Link href="/admin/dashboard/experience">
            <Button variant="primary" size="sm" className="w-full">
              Manage Experience
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <p className="text-gray-600 mb-4">Edit bio and skills</p>
          <Link href="/admin/dashboard/settings">
            <Button variant="primary" size="sm" className="w-full">
              Go to Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
