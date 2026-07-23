# Evidence Interaction Specification

Evidence is opened only when `isPublicEvidenceAvailable=true` and a representative evidence ID resolves through the shared approved EvidenceRepository.

From Story or Explorer, the evidence route uses background location and presents a Drawer on desktop or Bottom Sheet on mobile. Direct entry at `/evidence/:evidenceId` presents a full page. Both consume the same record ViewModel and preserve the semantic order: title/context, question, answer, reported status, verification status/detail, provenance, PDF/page links.

The overlay adds close controls and preserves the background map/Story state. The direct page adds a route-aware return link. Neither surface changes labels, status meanings or provenance. Drawer tabs may reorganize the same content but may not omit verification or provenance from keyboard access.

On open, focus moves to close or heading; background becomes inert. On close, focus returns to the exact invoker. Back/Forward opens/closes the overlay without losing Atlas filters or selection.

If evidence is unavailable, do not navigate to a generic not-found surface. Keep the node inspector and announce `공개 승인된 대표 증거가 없습니다`. A truly unknown evidence ID uses not-found semantics; a known but unpublished/absent detail uses EvidenceUnavailable.

Current runtime focus management passes, but repository/content parity is contradicted: a valid release ID is treated as invalid in DEV and unavailable in production.
