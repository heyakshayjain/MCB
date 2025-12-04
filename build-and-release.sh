#!/bin/bash

# MCB Desktop App - Build and Release Script
# This script builds desktop apps for macOS and Windows, then guides you through creating a GitHub release

set -e  # Exit on error

echo "🚀 MCB Desktop App - Build and Release"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get version from package.json
cd mcb-desktop
VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}📦 Building version: ${VERSION}${NC}"
echo ""

# Step 1: Build macOS app
echo -e "${YELLOW}Step 1/3: Building macOS app...${NC}"
npm run electron:build:mac
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ macOS app built successfully!${NC}"
    echo -e "   📁 Location: mcb-desktop/dist/MCB Cloud Browser-${VERSION}.dmg"
else
    echo -e "${RED}❌ macOS build failed${NC}"
    exit 1
fi
echo ""

# Step 2: Build Windows app
echo -e "${YELLOW}Step 2/3: Building Windows app...${NC}"
npm run electron:build:win
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Windows app built successfully!${NC}"
    echo -e "   📁 Location: mcb-desktop/dist/MCB Cloud Browser Setup ${VERSION}.exe"
else
    echo -e "${RED}❌ Windows build failed${NC}"
    exit 1
fi
echo ""

# Step 3: List built files
echo -e "${YELLOW}Step 3/3: Build summary${NC}"
echo -e "${GREEN}Built files:${NC}"
ls -lh dist/*.dmg dist/*.exe 2>/dev/null || echo "No installers found in dist/"
echo ""

# Instructions for GitHub Release
echo -e "${BLUE}📝 Next Steps - Create GitHub Release${NC}"
echo "======================================"
echo ""
echo "1. Create a new git tag:"
echo -e "   ${GREEN}git tag v${VERSION}${NC}"
echo -e "   ${GREEN}git push origin v${VERSION}${NC}"
echo ""
echo "2. Go to GitHub and create a new release:"
echo -e "   ${BLUE}https://github.com/heyakshayjain/MCB/releases/new${NC}"
echo ""
echo "3. Fill in the release information:"
echo "   - Tag: v${VERSION}"
echo "   - Title: MCB Desktop v${VERSION}"
echo "   - Description: (Add your release notes)"
echo ""
echo "4. Upload these files:"
echo -e "   ${GREEN}✓${NC} mcb-desktop/dist/MCB Cloud Browser-${VERSION}.dmg"
echo -e "   ${GREEN}✓${NC} mcb-desktop/dist/MCB Cloud Browser Setup ${VERSION}.exe"
echo ""
echo "5. After publishing, your download URLs will be:"
echo -e "   ${BLUE}macOS:${NC}"
echo "   https://github.com/heyakshayjain/MCB/releases/download/v${VERSION}/MCB.Cloud.Browser-${VERSION}.dmg"
echo ""
echo -e "   ${BLUE}Windows:${NC}"
echo "   https://github.com/heyakshayjain/MCB/releases/download/v${VERSION}/MCB.Cloud.Browser.Setup.${VERSION}.exe"
echo ""
echo "6. Update your website download links with these URLs"
echo ""
echo -e "${GREEN}🎉 Build complete! Follow the steps above to publish your release.${NC}"
