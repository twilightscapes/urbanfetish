#!/bin/bash

# Set the URL of your central repository
THEME_REPO_URL="https://github.com/piratewebsite/pirate"

# Set the branch or tag you want to pull updates from
BRANCH_OR_TAG="main"

# Function to log changes
log_change() {
    echo "Updated: $1"
}

# Save line 7 from keystatic.config.ts before any changes
LINE_7=$(sed -n '7p' keystatic.config.ts)

# Backup user content and config
cp -r src/content user_content_backup
cp src/content/config.ts config_backup.ts
log_change "Backed up user content and config"

# Clone the central repository
git clone --branch $BRANCH_OR_TAG --depth 1 $THEME_REPO_URL tmp_theme
log_change "Cloned theme repository"

# Instead of replacing the entire src folder, update only existing files
find src -type f | while read -r file; do
    # Get the relative path from src
    relative_path=${file#src/}
    # If the file exists in the new theme, update it
    if [ -f "tmp_theme/src/$relative_path" ]; then
        cp "tmp_theme/src/$relative_path" "src/$relative_path"
        log_change "Updated: src/$relative_path"
    fi
done

# Remove the new content directory that came with the theme update
rm -rf src/content

# Restore the original content directory from backup
mv user_content_backup src/content
log_change "Restored original content"

# Update only the config.ts if there's a new version
[ -f tmp_theme/src/content/config.ts ] && cp tmp_theme/src/content/config.ts src/content/config.ts
log_change "Updated config.ts"

# Replace root configuration files if they exist
for file in astro.config.mjs keystatic.config.ts netlify.toml package.json README.md tsconfig.json tailwind.config.cjs postcss.config.cjs; do
    [ -f tmp_theme/$file ] && cp tmp_theme/$file . && log_change "$file"
done

# Preserve line 7 in keystatic.config.ts
awk -v line="$LINE_7" 'NR==7 {print line; next} {print}' keystatic.config.ts > keystatic.config.ts.tmp && mv keystatic.config.ts.tmp keystatic.config.ts
log_change "Updated keystatic.config.ts (Project settings)"

# Clean up
rm -rf tmp_theme
rm -f config_backup.ts
log_change "Cleaned up temporary files"

echo "Theme updated successfully!"