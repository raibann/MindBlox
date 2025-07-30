# ProjectForm Component

The `ProjectForm` component has been updated to use React Hook Form with Zod validation and integrates with the Project Context.

## Features

- **React Hook Form**: Efficient form handling with built-in validation
- **Zod Validation**: Type-safe schema validation
- **Project Context Integration**: Automatically handles project creation and updates
- **Error Handling**: Displays validation errors with proper styling
- **Loading States**: Shows loading state during form submission

## Usage

### Basic Usage

```tsx
import { ProjectForm } from "./project-form";

// Create a new project
<ProjectForm mode="create" />

// Edit an existing project
<ProjectForm 
  mode="edit" 
  initial={existingProject} 
/>
```

### With Modal

```tsx
import { ProjectModal } from "./project-modal";

<ProjectModal
  open={modalOpen}
  onOpenChange={setModalOpen}
  initial={editingProject}
  mode="create" // or "edit"
  title="Create Project"
  submitLabel="Save"
/>
```

### Custom Submit Handler

```tsx
<ProjectForm
  mode="create"
  onSubmit={(data) => {
    // Additional actions after form submission
    console.log("Form submitted:", data);
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initial` | `Partial<IProject.Project>` | `{}` | Initial form values for editing |
| `onSubmit` | `(values: ProjectFormData) => void` | `undefined` | Custom submit handler |
| `submitLabel` | `string` | `"Save"` | Text for the submit button |
| `mode` | `"create" \| "edit"` | `"create"` | Form mode for create or edit |

## Form Fields

- **Project Name**: Required, max 100 characters
- **Description**: Optional
- **Status**: Required, one of: "planning", "active", "completed", "on-hold"
- **Deadline**: Optional date
- **Members**: Array of users with roles

## Validation Rules

- Project name is required and must be 1-100 characters
- Status must be one of the predefined values
- Members are automatically validated against the user schema

## Integration with Project Context

The form automatically:
- Creates new projects using `addProject` from context
- Updates existing projects using `updateProject` from context
- Resets form after successful submission
- Handles errors gracefully 