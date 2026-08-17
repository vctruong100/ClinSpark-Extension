# ClinSpark Extension

ClinSpark Extension packages the ClinSpark production, test, and validation automators into one Chrome Manifest V3 extension. Each content script runs only on its matching ClinSpark environment.

## Included Automators

| Automator | Runs on |
| --- | --- |
| ClinSpark Automator | `https://cenexel.clinspark.com/*` |
| ClinSpark Test Automator | `https://cenexeltest.clinspark.com/*` |
| ClinSpark Val Automator | `https://cenexel-val.clinspark.com/*` |

## Major Features

### CRF Design and Library

- **PLAP Builder**: Full-screen procedure log activity plan builder with drag-and-drop rows, existing-form editing, clearer Existing visibility filtering, auto-population, reference activity support, time offsets, example-time recalculation, and Apply Time Calculation.
- **Import From Library**: Side-by-side import tool with cached library scans, duplicate import copies for the same source form, per-copy form names, item group/item renames, item inclusion settings, lock-on-save, confirmation warnings, progress tracking, and cancel/resume cleanup.
- **Form Preview**: Production-only Study Library preview tool that renders selected unlocked library forms in a read-only collection-style modal so builders can inspect layout, item groups, prompts, data types, decoded codelist values, formats, role restrictions, file-upload controls, and help text before locking or mapping.
- **Activity Plan Removal**: Scheduled activity removal workflow with filtered Select All, archive indicators, disabled selection for already archived rows, delete fallback to archive, and reason-for-change automation.
- **Archive/Update Forms**: Batch archive and rename support for study library forms.
- **Edit Forms**: Production-only batch form editor for form name, description, usage flags, barcode verification, ICF requirement, lock state, and form usage. Includes full-screen mode, resizable panels, reset controls, and safe edit/lock sequencing.
- **Import I/E and Clear Mapping**: Maps inclusion/exclusion items to activity plan forms/items, shows expected eligibility defaults, and supports selective mapping cleanup.
- **Set Visibility Condition**: Auto-populates and saves visibility conditions with refresh handling and animated loading states.
- **Copy Activity Forms**, **Search Methods**, **Item Method Forms**, **Parse Study Event**, **Parse Forms**, **Edit Study Events List**, and **Edit Item Reference** support common builder review and maintenance tasks.

### Study Setup, Subjects, and Testing

Test and validation automators include setup and data collection helpers such as Lock Activity Plans, Lock Sample Paths, Update Study Status, Run Study Setup, Add Cohort Subjects, Import Cohort Subjects, Add Existing Subject, Run ICF Consent, Run Form, and Collect All.

### Data Collection and Navigation

The automators include barcode helpers, form/event navigation, adverse event navigation where available, DTS report download, Print Barcodes, Auto-Resaver, cohort eligibility checks, and subject eligibility checks.

### Panel Controls

The production and test automator panels now open as professional docked panels that reserve page space and move the page over. Users can switch persistently between a right sidebar and a compact bottom dock with four-row button columns and a dedicated log rail, configure button visibility/order, save named button loadouts, choose Black-theme button colors, and retain preferences across refreshes and navigation. The panels also retain the black theme, purple glassmorphism theme, configurable hide/unhide hotkey, searchable Help Guide, Pause, Clear Logs, and Hide Logs.

## Local Installation

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.
5. Visit one of the supported ClinSpark environments. The matching automator content script will run at `document_idle`.

## Publishing Updates

Chrome Web Store users receive extension updates automatically after a new package is approved and published, as long as:

1. The extension is uploaded to the same Chrome Web Store listing.
2. The `version` in `manifest.json` is increased before upload.
3. The extension is distributed through Chrome Web Store, not only by manually loading an unpacked folder.

When a userscript changes, update the corresponding `.js` file, bump `manifest.json`, package the extension, and upload the new ZIP to the existing Chrome Web Store item.

## Files

- `manifest.json`: Chrome extension manifest.
- `ClinSpark Automator.js`: Production ClinSpark content script.
- `ClinSpark Test Automator.js`: Test ClinSpark content script.
- `ClinSpark Val Automator.js`: Validation ClinSpark content script.
- `icons/icon16.png`, `icons/icon48.png`, `icons/icon128.png`: Extension icons.
- `PRIVACY_POLICY.md`: Privacy policy for publication.
- `NOTES.txt`: Chrome Web Store publication notes and permission justifications.
- `FEATURE_IDEAS.md`: Future automation ideas for eSource builders.

## Permissions

The extension requests access only to these ClinSpark hosts:

- `https://cenexel.clinspark.com/*`
- `https://cenexeltest.clinspark.com/*`
- `https://cenexel-val.clinspark.com/*`

No broad host patterns are requested.
