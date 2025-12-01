# University Landing Page

A modern, responsive landing page for the university website.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KinglyShade/University-landing-page.git
   cd University-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## 🛠️ Tech Stack
- [Astro](https://astro.build/) - Web framework
- [React](https://reactjs.org/) - UI library
- [Vue.js](https://vuejs.org/) - UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📂 Project Structure

```
src/
├── components/       # Reusable components
│   └── vue/         # Vue components
│       └── AlumnosCRUD.vue  # CRUD interface for students
├── layouts/         # Page layouts
│   └── UniversityLayout.astro  # Main layout for university pages
├── pages/           # Page components
│   ├── university.astro  # Main university page
│   └── api/        # API endpoints
│       └── alumnos.ts  # Students API endpoints
└── models/         # Data models
    └── Alumno.ts  # Student data model
```

## 🎓 CRUD Functionality

The application includes a complete CRUD (Create, Read, Update, Delete) interface for managing student records.

### Accessing the CRUD Interface
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:4321/university
   ```

### Features
- **View Students**: See a list of all registered students with their details
- **Add New Student**: Use the form to add a new student record
- **Update Student**: Click the edit button to modify student information
- **Delete Student**: Remove a student record with the delete button

### API Endpoints
- `GET /api/alumnos` - Get all students
- `POST /api/alumnos` - Create a new student
- `PUT /api/alumnos/:id` - Update a student
- `DELETE /api/alumnos/:id` - Delete a student

## 📝 Commit & Push Changes

1. Make your changes
2. Stage your changes:
   ```bash
   git add .
   ```
3. Commit with a descriptive message:
   ```bash
   git commit -m "Your commit message here"
   ```
4. Push to the repository:
   ```bash
   git push origin main
   ```

## 📞 Support
For any questions or issues, please open an issue on GitHub.