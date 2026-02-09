# Changelog

All notable changes to the Lengua Spanish Learning App will be documented in this file.

## [1.2.0] - 2026-02-09

### Added
- Auto-sync Google Drive integration — link a folder once, new homework docs are automatically detected and imported on each app load
- Local vocabulary parser replaces AI-based parsing — works offline, no external API dependencies
- Credentials and imported file history saved to localStorage for persistence
- "Sync Now", "Re-import All Files", and "Disconnect" controls on Drive page
- Document format guide shown in-app for easy reference

### Removed
- Anthropic API dependency for document parsing
- Manual per-file "Import" button workflow

## [1.1.0] - 2026-02-09

### Added
- Full mobile responsiveness for phone-friendly experience
- Collapsible sidebar with hamburger menu on screens under 768px
- Fixed mobile header bar with logo and due-count badge
- Card-based dictionary layout on mobile (replaces table)
- Stacked single-column layouts for all grid sections on mobile
- Touch-friendly button sizes and full-width CTAs
- Responsive typography scaling (headings, stats, flashcard text)
- Responsive padding (32px desktop, 14px mobile)

### Changed
- Flashcard answer buttons stack vertically on mobile
- Keyboard shortcut hints hidden on mobile
- Hover effects disabled on touch devices

## [1.0.0] - 2026-02-09

### Added
- Initial release of Lengua Spanish Learning App
- 6 built-in lessons covering greetings, AR/ER/IR verbs, irregular verbs, numbers/time, questions
- Flashcard practice with spaced repetition system (confidence levels 0-5)
- Sentence builder exercises with word ordering
- Full vocabulary dictionary with search and filtering
- Progress tracking with mastery percentages and session history
- Custom word addition
- Google Drive document import (manual)
- GitHub Pages deployment via GitHub Actions
