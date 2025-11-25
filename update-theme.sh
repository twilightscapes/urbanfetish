#!/bin/bash
# set -euo pipefail

# # Set the URL of your central repository
# THEME_REPO_URL="https://github.com/twilightscapes/toddlambert"

# # Set the branch or tag you want to pull updates from
# BRANCH_OR_TAG="main"

# # Function to log changes
# log_change() {
#     echo "[theme-update] $1"
# }

# # Save line 7 from keystatic.config.ts before any changes (if file exists)
# if [ -f keystatic.config.ts ]; then
#     LINE_7=$(sed -n '7p' keystatic.config.ts || true)
# else
#     LINE_7=""
# fi

# # Backup user content and content config if present
# if [ -d src/content ]; then
#     rm -rf user_content_backup || true
#     cp -a src/content user_content_backup
#     log_change "Backed up user content to user_content_backup"
# else
#     log_change "No src/content to back up"
# fi

# if [ -f src/content/config.ts ]; then
#     cp -f src/content/config.ts config_backup.ts || true
#     log_change "Backed up src/content/config.ts to config_backup.ts"
# fi

# # Clone the central repository
# rm -rf tmp_theme || true
# git clone --branch "$BRANCH_OR_TAG" --depth 1 "$THEME_REPO_URL" tmp_theme
# log_change "Cloned theme repository"

# # Copy theme files into src, overwriting matching files but NOT deleting any extra files in src.
# # We exclude the content directory because user content should be preserved and restored.
# if command -v rsync >/dev/null 2>&1; then
#     rsync -a --exclude='content' tmp_theme/src/ src/
#     log_change "Copied theme files to src/ using rsync (excluding content)"
# else
#     # Fallback: copy files while excluding the content directory
#     find tmp_theme/src -type f | while read -r file; do
#         rel=${file#tmp_theme/src/}
#         case "$rel" in
#             content/*) continue ;;
#         esac
#         mkdir -p "$(dirname "src/$rel")"
#         cp -f "$file" "src/$rel"
#         log_change "Updated: src/$rel"
#     done
#     log_change "Copied theme files to src/ using fallback copy (excluding content)"
# fi

# # Restore the original content directory from backup (preserve user content)
# if [ -d user_content_backup ]; then
#     rm -rf src/content || true
#     mv user_content_backup src/content
#     log_change "Restored original src/content from backup"
# fi

# # If theme provides a new src/content/config.ts, copy it into user's content (overwriting user's config)
# if [ -f tmp_theme/src/content/config.ts ]; then
#     mkdir -p src/content
#     cp -f tmp_theme/src/content/config.ts src/content/config.ts
#     log_change "Updated src/content/config.ts from theme"
# fi

# # Replace root configuration files if they exist in the theme
# for file in astro.config.mjs keystatic.config.ts package.json README.md tsconfig.json tailwind.config.ts postcss.config.js; do
#     if [ -f "tmp_theme/$file" ]; then
#         cp -f "tmp_theme/$file" .
#         log_change "Replaced root file: $file"
#     fi
# done

# # Preserve line 7 in keystatic.config.ts if we captured it earlier
# if [ -n "$LINE_7" ] && [ -f keystatic.config.ts ]; then
#     awk -v line="$LINE_7" 'NR==7 {print line; next} {print}' keystatic.config.ts > keystatic.config.ts.tmp && mv keystatic.config.ts.tmp keystatic.config.ts
#     log_change "Preserved line 7 in keystatic.config.ts"
# fi

# # Clean up
# rm -rf tmp_theme || true
# rm -f config_backup.ts || true
# log_change "Cleaned up temporary files"

echo "Theme updated successfully!"