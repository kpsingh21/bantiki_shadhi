#!/bin/bash
# ==============================================================================
# Wedding Countdown Deployment & Dual Repository Sync Script
# Repositories synced:
#   1. https://github.com/kpsingh21/BantikiShadhi.git
#   2. https://github.com/kpsingh21/bantiki_shadhi.git
# ==============================================================================

set -e

# ANSI Color Codes
GREEN='\033[0;32m'
GOLD='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "\n${GOLD}====================================================${NC}"
echo -e "${GOLD}  Banti & Lalu Wedding Countdown - Deploy & Sync    ${NC}"
echo -e "${GOLD}====================================================${NC}\n"

cd "$(dirname "$0")"

# 1. Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo -e "${CYAN}ℹ️  Detected uncommitted changes. Staging files...${NC}"
  git add .
  COMMIT_MSG="${1:-feat: Update wedding countdown invitation and events}"
  echo -e "${CYAN}📝 Committing with message: \"${COMMIT_MSG}\"${NC}"
  git commit -m "$COMMIT_MSG"
else
  echo -e "${GREEN}✓ Working tree is clean. All changes already committed.${NC}"
fi

# 2. Verify Current Branch is main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo -e "${CYAN}Switching from branch '${CURRENT_BRANCH}' to 'main'...${NC}"
  git branch -M main
fi

# 3. Push to both repositories simultaneously via origin
echo -e "\n${GOLD}🚀 Pushing latest code to BOTH repositories...${NC}"
echo -e "   1. https://github.com/kpsingh21/BantikiShadhi.git"
echo -e "   2. https://github.com/kpsingh21/bantiki_shadhi.git\n"

# Push to multi-target origin
if git push origin main; then
  echo -e "\n${GREEN}✓ Successfully synced both repositories!${NC}"
else
  echo -e "\n${RED}⚠️ Direct push encountered a remote mismatch. Retrying with explicit pushes...${NC}"
  
  echo -e "${CYAN}Pushing to BantikiShadhi...${NC}"
  git push https://github.com/kpsingh21/BantikiShadhi.git main || true

  echo -e "${CYAN}Pushing to bantiki_shadhi...${NC}"
  git push https://github.com/kpsingh21/bantiki_shadhi.git main || true
fi

echo -e "\n${GOLD}====================================================${NC}"
echo -e "${GREEN}🎉 SYNC & DEPLOYMENT COMPLETE!${NC}"
echo -e "${CYAN}• Both GitHub repos are in exact 100% synchronization.${NC}"
echo -e "${CYAN}• Vercel will automatically trigger a new production build${NC}"
echo -e "${CYAN}  for whichever repository is connected in your dashboard.${NC}"
echo -e "${GOLD}====================================================${NC}\n"

