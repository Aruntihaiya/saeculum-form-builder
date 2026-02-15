# Saeculum Machine Test - Dynamic Form Builder

A powerful, intuitive form builder application built with React and Vite. Create complex forms with drag-and-drop functionality, nested sections, and multiple question types.

## 🚀 Features

### Core Functionality
- **Drag-and-Drop Interface**: Rearrange questions and sections with smooth drag-and-drop interactions
- **Multi-Page Forms**: Organize your forms across multiple pages
- **Nested Sections**: Create hierarchical form structures with collapsible sections
- **Persistent State**: All form data is automatically saved to IndexedDB


### Advanced Features
- **Conditional Dragging**: Sections can only be dragged when collapsed, preventing accidental reordering
- **Real-time Updates**: Changes are instantly saved and persisted
- **Responsive Design**: Clean, modern UI that works across different screen sizes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Saeculum Machine_test"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🛠️ Tech Stack

- **React 19.2.0** - UI framework
- **Vite 7.3.1** - Build tool and dev server
- **@dnd-kit** - Drag-and-drop functionality
  - `@dnd-kit/core` - Core drag-and-drop logic
  - `@dnd-kit/sortable` - Sortable lists
  - `@dnd-kit/utilities` - Helper utilities
- **idb-keyval** - IndexedDB wrapper for data persistence
- **lucide-react** - Icon library
- **uuid** - Unique ID generation

## 📖 Usage

### Creating a Form

1. **Add Questions**: Click the "Question" button to add a new text or checkbox question
2. **Add Sections**: Click the "Section" button to create collapsible sections
3. **Add Pages**: Click "Add Page" to create multi-page forms

### Organizing Content

- **Drag Questions**: Use the grip handle (⋮⋮) on the left to drag questions
- **Drag Sections**: Collapse a section first (click the chevron), then use the grip handle to drag
- **Nest Items**: Add questions or sections inside other sections using the buttons within each section

### Question Configuration

- **Question Text**: Click on the question field to edit
- **Question Type**: Use the dropdown to switch between "Text answer" and "Checkbox"
- **Delete**: Click the trash icon to remove questions or sections

### Sections

- **Collapse/Expand**: Click the chevron icon to toggle section visibility
- **Dragging**: Sections can only be dragged when collapsed (this prevents accidental moves)
- **Nesting**: Sections can contain questions and other sections

## 🏗️ Project Structure

```
src/
├── component/
│   ├── dynamic form/
│   │   ├── dynamicForm.jsx      # Main form container with DnD context
│   │   ├── SortableElement.jsx  # Individual question/section component
│   │   └── pageHeader.jsx       # Page header with title and actions
│   └── Mainlayout/              # Layout components
├── context/
│   └── FormContext.jsx          # React context for form state
├── hooks/
│   └── useDynamicform.jsx       # Custom hook for form logic
├── indexdb/
│   └── db.js                    # IndexedDB persistence layer
├── assets/                      # Images and icons
├── App.jsx                      # Root component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

