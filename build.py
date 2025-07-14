#!/usr/bin/env python3
import os
import yaml
from jinja2 import Environment, FileSystemLoader
from pathlib import Path

def load_artwork_data():
    """Load all artwork data from YAML files."""
    artworks = []
    artworks_dir = Path("artworks")
    
    if not artworks_dir.exists():
        print("No artworks directory found")
        return artworks
    
    for artwork_dir in sorted(artworks_dir.iterdir()):
        if artwork_dir.is_dir():
            data_file = artwork_dir / "data.yaml"
            if data_file.exists():
                try:
                    with open(data_file, 'r') as f:
                        data = yaml.safe_load(f)
                    data['folder'] = artwork_dir.name
                    artworks.append(data)
                    print(f"Loaded artwork: {data.get('title', artwork_dir.name)}")
                except Exception as e:
                    print(f"Error loading {data_file}: {e}")
            else:
                print(f"No data.yaml found in {artwork_dir}")
    
    return artworks

def build_site():
    """Build the static site from templates."""
    # Load artwork data
    artworks = load_artwork_data()
    
    # Setup Jinja2 environment
    env = Environment(loader=FileSystemLoader('templates'))
    
    # Load template
    template = env.get_template('index.html.j2')
    
    # Render template
    output = template.render(artworks=artworks)
    
    # Write output
    with open('index.html', 'w') as f:
        f.write(output)
    
    print(f"Built site with {len(artworks)} artworks")
    print("Generated: index.html")

if __name__ == "__main__":
    build_site()