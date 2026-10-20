# Final system audit — 21 October 2026

This audit separates what the current web artifact demonstrates from what remains unverified. It is not a claim of community endorsement or measured cultural impact.

## Implemented and inspectable

- One bilingual working artifact with 82 cultural records, 67 represented relationships and 13 factual source collections.
- Five actual visualization idioms serving the same route-exploration task, even though the interface exposes only two top-level tabs:
  1. basic category distribution in **Patterns**;
  2. documented relationship network in **Patterns**;
  3. spatial map in **Map**;
  4. interactive record/source inspection in **Map**;
  5. three-rule route comparison in **Map**.
- Visible boundaries for dataset coverage, network links, approximate coordinates and route estimates.
- Record-level factual source links, image credit, image-subject status and image-rights status.
- Keyboard-focus styles, bilingual labels, alt text for substantive images, reduced-motion handling and a cached-map fallback.
- A correction route through the public repository Issues page.

## Source verification result

- The 13 factual collections are official Kunshan municipal-government pages/PDFs or the UNESCO Kunqu record.
- Eleven sources could be directly opened or matched through their authoritative indexed page on 21 October 2026.
- The traditional-village PDF is authoritative and indexed, but automated direct retrieval timed out; a local archival fallback has not yet been added.
- The UNESCO record is authoritative, but automated access can trigger anti-bot verification.
- The former Opera Hundred Plays Museum URL redirected to the government homepage. It has been replaced with an accessible official report that supports the museum and 348-genre claim.
- These checks establish provenance and access, not an open license. Government and UNESCO pages must not be treated as blanket permission to reproduce their text or media.

## Image verification result

- Tinglin Garden and Sock-Bottom Pastry now use record-specific images from identifiable publisher pages.
- Most other files are Wikimedia Commons images with a license named in the record credit, but many are search-derived or contextual rather than photographs of the exact named site/object.
- The interface now labels each image conservatively as record-specific, source-listed but not independently subject-checked, or contextual.
- Record-specific matching and permission remain incomplete for many images. See `IMAGE_AUDIT.md`; contextual images must not be used as evidence that the named item looks exactly as shown.

## Requirements still incomplete or requiring human evidence

1. **Real transport routing:** The interface now requests road geometry, distance and driving duration from OSRM instead of drawing straight lines. “Most convenient” links every leg to AMap for live public-transport planning because this static prototype does not have a licensed transit API key. Transfers, schedules, fares and accessibility remain external and require field checking before the route can be presented as complete journey guidance.
2. **Image rights and exact matching:** all 82 images still need final record-by-record subject and reuse-permission confirmation. The two newsroom images especially require permission/terms review.
3. **Accessibility verification:** keyboard affordances and reduced-motion behavior exist, but a documented screen-reader, keyboard-only, color-contrast, mobile Safari and desktop cross-browser test is still required.
4. **Fallback evidence:** cached map imagery exists, but the final team should test the exact repository at the submitted commit with the network unavailable and record the result/date.
5. **Community validation:** peer feedback does not establish visitor learning, cultural representativeness, community benefit or SDG 11.4 impact. The next test should include intended Kunshan users and relevant cultural stewards.
6. **Final release consistency:** after deployment, the artifact URL, repository commit/tag, README, screenshots, paper, poster and demo video must all identify the same version and be opened from a clean browser without login.
7. **Required report evidence:** the paper and poster still need five legible final captures in Figure 1, the actual architecture in Figure 2 and a real user walkthrough/revision in Figure 3. These are submission-package requirements, not additional website tabs.

## Defensible current claim

The artifact lets a user inspect and compare a curated set of 82 Kunshan cultural records through category, relationship, spatial, source-inspection and route-comparison views. It does not establish completeness, correct live navigation, improved learning, heritage safeguarding impact or community endorsement.
