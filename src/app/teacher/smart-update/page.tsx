// src/app/teacher/smart-update/page.tsx
import { UpdateGenerator } from "@/components/smart-update/update-generator";

export default function SmartUpdatePage() {
  return (
    <div>
      {/* The h1 and description are within the UpdateGenerator component */}
      <UpdateGenerator />
    </div>
  );
}
