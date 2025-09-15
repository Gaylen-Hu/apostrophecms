# ApostropheCMS Site

A website built with [ApostropheCMS](https://apostrophecms.org), a full-featured, open-source CMS built with Node.js.

## Features

- **In-context editing**: Edit content directly on your pages
- **Responsive design**: Mobile-friendly layout
- **User management**: Built-in authentication and user roles
- **Content management**: Create and manage articles and pages
- **SEO-friendly**: Built-in SEO optimization features

## Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd apostrophecms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **Set up MongoDB** (choose one option):

   **Option A: Using Docker Compose (Recommended)**
   ```bash
   docker-compose up
   ```

   **Option B: Local MongoDB**
   - Install and start MongoDB locally
   - Then run: `npm start`

   **Option C: MongoDB Atlas**
   - Create a MongoDB Atlas account
   - Set your connection string: `export APOS_MONGODB_URI="your-connection-string"`
   - Then run: `npm start`

4. Open your browser and navigate to `http://localhost:3000`

### Development

For development with auto-restart on file changes:

```bash
npm run dev
```

### Admin Access

1. Navigate to `http://localhost:3000/login`
2. Create an admin account on first visit
3. Use the admin bar to create and edit content

## Project Structure

```
├── app.js                 # Main application file
├── package.json          # Project dependencies and scripts
├── modules/              # Custom modules
│   ├── article/          # Article content type
│   └── article-page/     # Article page type
├── views/                # Global templates
│   └── layout.html       # Base layout template
└── public/               # Static assets
```

## Content Management

### Articles

This site includes a basic article content type with:
- Title
- Rich text body content
- Image support
- Automatic publishing dates

### Pages

Standard ApostropheCMS pages with:
- Customizable content areas
- SEO fields
- Navigation management

## Customization

### Adding New Content Types

Create new modules in the `modules/` directory. Example:

```javascript
// In app.js
modules: {
  'your-content-type': {
    extend: '@apostrophecms/piece-type',
    options: {
      label: 'Your Content Type'
    },
    fields: {
      add: {
        // Your custom fields
      }
    }
  }
}
```

### Styling

CSS can be added to:
- Individual templates (inline `<style>` tags)
- The main layout template
- External stylesheets in the `public/` directory

## Documentation

- [ApostropheCMS Documentation](https://docs.apostrophecms.org/)
- [ApostropheCMS Tutorials](https://apostrophecms.org/tutorials)
- [Community Forum](https://github.com/apostrophecms/apostrophe/discussions)

## License

This project is licensed under the MIT License.
