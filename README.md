# ClinSpark Extension

ClinSpark Extension packages three existing ClinSpark userscripts into one Chrome Manifest V3 extension. Each automation script runs only on its matching ClinSpark environment.

## Included Automators

| Automator | Runs on |
| --- | --- |
| ClinSpark Automator | `https://cenexel.clinspark.com/*` |
| ClinSpark Test Automator | `https://cenexeltest.clinspark.com/*` |
| ClinSpark Val Automator | `https://cenexel-val.clinspark.com/*` |

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

When a userscript changes, update the corresponding `.js` file in this repository, bump `manifest.json` version, package the extension, and upload the new ZIP to the existing Chrome Web Store item.

## Files

- `manifest.json`: Chrome extension manifest.
- `ClinSpark Automator.js`: Production ClinSpark content script.
- `ClinSpark Test Automator.js`: Test ClinSpark content script.
- `ClinSpark Val Automator.js`: Validation ClinSpark content script.
- `icons/icon16.png`, `icons/icon48.png`, `icons/icon128.png`: Extension icons.
- `PRIVACY_POLICY.md`: Privacy policy for publication.
- `NOTES.txt`: Chrome Web Store publication notes and permission justifications.

## Permissions

The extension requests access only to these ClinSpark hosts:

- `https://cenexel.clinspark.com/*`
- `https://cenexeltest.clinspark.com/*`
- `https://cenexel-val.clinspark.com/*`

No broad host patterns are requested.
