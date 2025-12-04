# Mock Documents for Testing

This folder contains mock PDF files for testing the document upload feature in the Premium Browser.

## Available Files:

### 1. aadhar_card.pdf
- **Type:** Government ID
- **Size:** ~622 bytes (mock)
- **Content:** Sample Aadhar card with placeholder information
- **Purpose:** Testing ID document uploads in application forms

### 2. sample_marksheet.pdf
- **Type:** Academic Certificate
- **Size:** ~592 bytes (mock)
- **Content:** Class 10 marksheet with mock grades
- **Purpose:** Testing educational document uploads

## How to Test:

1. Open Premium Browser in the app
2. Navigate to a website with file upload (e.g., any application form)
3. Tap the "Quick Copy" floating button
4. Switch to "Documents" tab
5. Tap on "Photo ID (Aadhar)" or "Class 10 Marksheet"
6. The upload fields on the page will be highlighted in green
7. Click the highlighted field to upload

## Features:

✅ **Real PDF Files**: These are actual valid PDF files that can be opened
✅ **Mock Content**: Contains placeholder data for testing
✅ **Visual Indicators**: Documents with real files show green checkmark badge
✅ **Auto-Upload**: Clicking a document auto-highlights upload fields

## Adding More Documents:

To add more test documents:
1. Place PDF/image files in this folder
2. Update the `userDocuments` array in `PremiumBrowserScreen.tsx`
3. Add require statement with path to the file
4. The file will automatically appear in the Documents tab

## Note:

These are mock files for development and testing only. In production, users would upload their own actual documents from their device storage.
