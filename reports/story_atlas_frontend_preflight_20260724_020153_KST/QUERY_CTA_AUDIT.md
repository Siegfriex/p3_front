# Query and CTA audit

Current canonical serializer supports `status`, `types`, `node`, and `view=nodes`; type order is A1→A8, invalid values are reported and normalized, default state serializes to an empty query, and reset helpers remove Atlas keys.

`ChapterAnswersAtlas` already parses the Story URL and `buildAtlasHrefFromPreview` carries status and types to `/atlas`, deliberately clearing node selection. Browser evidence confirmed `/?status=active&types=A1,A7&view=nodes#answers` produces `/atlas?status=active&types=A1%2CA7&view=nodes`.

No serializer change is required for basic CTA carry. Story wiring must add actual controls and URL updates while preserving `#answers`; CTA must be derived from that live state. Node must not be carried unless a later contract explicitly authorizes it.

Explorer reload and Back/Forward restoration are CONFIRMED with DG761.
