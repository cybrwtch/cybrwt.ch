# cybrwt.ch Portfolio

A minimal black and white portfolio website for digital artist cybrwt.ch.

## Project Structure

```
├── artworks/                 # Artwork data and images
│   ├── artwork-name/
│   │   ├── data.yaml        # Artwork metadata
│   │   └── images/          # Artwork images
├── templates/               # Jinja2 templates
│   └── index.html.j2       # Main template
├── build.py                # Build script
├── style.css              # Styles (not templated)
├── script.js              # JavaScript (not templated)
└── index.html             # Generated output
```

## Setup

1. Install dependencies:
   ```bash
   make install
   # or: pip install -r requirements.txt
   ```

2. Build the site:
   ```bash
   make build
   # or: python build.py
   ```

3. Start development server:
   ```bash
   make dev
   # or: python -m http.server 8000
   ```

## Adding New Artwork

1. Create a new directory in `artworks/`:
   ```bash
   mkdir artworks/my-new-artwork
   mkdir artworks/my-new-artwork/images
   ```

2. Create `artworks/my-new-artwork/data.yaml`:
   ```yaml
   id: 4  # Unique numeric ID
   title: "my new artwork"
   description: "description of the artwork"
   process: "detailed process description"
   
   thumbnail: "images/thumbnail.jpg"
   
   series_images:
     - "images/piece-01.jpg"
     - "images/piece-02.jpg"
   
   process_images:
     - "images/process-sketch.jpg"
     - "images/process-final.jpg"
   
   links:
     instagram: "https://www.instagram.com/p/example/"
   
   date: "2024-12"
   medium: "digital art"
   tags: ["tag1", "tag2"]
   ```

3. Add your images to `artworks/my-new-artwork/images/`

4. Rebuild the site:
   ```bash
   make build
   ```

## YAML Schema

### Required Fields
- `id`: Unique numeric identifier
- `title`: Artwork title (lowercase)
- `description`: Brief description
- `process`: Detailed process description
- `thumbnail`: Path to thumbnail image
- `series_images`: List of main artwork images
- `process_images`: List of process/behind-the-scenes images

### Optional Fields
- `links`: External links (instagram, etc.)
- `date`: Creation date
- `medium`: Art medium
- `tags`: List of tags

## Development Commands

- `make build` - Build the site
- `make dev` - Start development server
- `make clean` - Remove generated files
- `make watch` - Watch for changes and rebuild (Linux only)