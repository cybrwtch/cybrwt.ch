.PHONY: build install dev clean

# Install dependencies
install:
	pip install -r requirements.txt

# Build the site
build:
	python build.py

# Development server (requires Python 3)
dev: build
	@echo "Starting development server at http://localhost:8000"
	@echo "Press Ctrl+C to stop"
	python -m http.server 8000

# Clean generated files
clean:
	rm -f index.html

# Watch for changes and rebuild (requires inotify-tools on Linux)
watch:
	@echo "Watching for changes... Press Ctrl+C to stop"
	while inotifywait -e modify -r artworks/ templates/ 2>/dev/null; do \
		echo "Changes detected, rebuilding..."; \
		python build.py; \
	done