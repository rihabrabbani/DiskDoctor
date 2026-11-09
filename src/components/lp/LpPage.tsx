import { AREAS, type AreaId } from '@/lp/config/areas';
import { TEMPLATES, type TemplateId } from '@/lp/config/templates';
import { HOW_IT_WORKS_PHOTOS, LP_PHOTOS } from '@/lp/config/photos';
import { locationRating, pageReviews } from '@/lp/reviews';
import LpForm from './LpForm';
import ReviewMarquee from './ReviewMarquee';
import StatsBand from './StatsBand';
import LpStickyBar from './LpStickyBar';
import {
  FeaturedReview,
  FinalCta,
  HowItWorks,
  LabGrid,
  LabPhotos,
  LpFaq,
  LpFooter,
  LpHeader,
  LpHero,
  OfficeBlock,
  RaidFirstHour,
  SymptomGrid,
  UrgencyBand,
  WhatHappenedTiles,
} from './LpSections';

/** dd_lp_variant and the lp_form_start param, e.g. "md/hard-drive" or "all/raid". */
export const lpVariant = (area: AreaId, template: TemplateId) => `${area}/${template}`;

export default function LpPage({ areaId, templateId }: { areaId: AreaId; templateId: TemplateId }) {
  const area = AREAS[areaId];
  const template = TEMPLATES[templateId];
  const pageKey = templateId === 'raid' ? 'raid' : `${areaId}/${templateId}`;
  const reviews = pageReviews(pageKey);
  const photos = LP_PHOTOS[pageKey];
  const rating = locationRating(area.location);
  const lab = locationRating('columbia');

  // No review counts anywhere (they go stale). Each rating sits only next to its own office's reviews:
  // VA pages show Tysons and Columbia separately, MD and RAID pages show Columbia only.
  const isVa = areaId === 'va';
  const ratingSub = isVa
    ? `Google reviews of our Tysons office · ${lab.rating} at our Columbia lab`
    : 'Google reviews of our Columbia lab';
  const tysons = locationRating('tysons');
  const marqueeRatings = isVa
    ? [
        { label: 'Tysons office', rating: tysons.rating },
        { label: 'Columbia, MD', rating: lab.rating },
      ]
    : [{ label: 'Columbia lab', rating: lab.rating }];
  const marqueeLinks = isVa
    ? [
        { label: 'See all Tysons reviews on Google Maps', href: tysons.mapsUrl },
        { label: 'See all Columbia reviews on Google Maps', href: lab.mapsUrl },
      ]
    : [{ label: 'See all reviews on Google Maps', href: lab.mapsUrl }];
  const featured = reviews.featured;
  // The big rating next to the featured review is that review's own office rating.
  const featuredRating = locationRating(featured.location);
  // VA pages call the Columbia reviews "Columbia, MD", not "Columbia lab".
  const featuredOffice =
    featured.location === 'tysons' ? 'our Tysons office' : isVa ? 'Columbia, MD' : 'our Columbia lab';
  const ratingBig = `Google rating of ${featuredOffice}`;
  const featuredMeta = isVa ? `Google review of ${featuredOffice} · ${featured.date}` : `Google review · ${featured.date}`;

  const faq = [
    {
      q: 'How much does it cost?',
      a: 'The diagnosis is free. After it, you get a fixed quote before any paid work, and nothing is charged unless you approve it. The return drive for your data is included in the quote. If we can’t recover your data, you don’t pay.',
    },
    {
      q: 'How long does it take?',
      a: 'Logical recoveries, like deleted files or a formatted drive, usually take 24–48 hours. Physical failures, like clicking drives, usually take 3–7 days. For emergencies, call the 24/7 line.',
    },
    { q: `Do I have to bring ${templateId === 'raid' ? 'the drives' : 'the drive'} in?`, a: area.faqBring },
    template.faqFirstAid,
    ...(templateId === 'raid'
      ? []
      : [
          {
            q: 'Do you recover phones or SD cards?',
            a: 'Our lab specialises in hard drives, SSDs, RAID and servers. For phones, SD cards and USB sticks we’re usually not the right fit.',
          },
        ]),
  ];
  // The SSD page opens with SSD symptoms instead of the area's "Clicking, not detected…" question.
  const heroSub = template.heroQuestion ? area.heroSub.replace(/^[^?]*\?/, template.heroQuestion) : area.heroSub;

  return (
    <>
      <LpHeader area={area} />
      <main>
        <LpHero
          area={area}
          heroSub={heroSub}
          h1={template.h1(areaId, area.place)}
          rating={rating}
          ratingSub={ratingSub}
          heroStack={reviews.heroStack}
          form={
            <LpForm
              variant={lpVariant(areaId, templateId)}
              phone={area.phone}
              tel={area.tel}
              talkSuffix={area.talkSuffix}
              soonerSuffix={area.soonerSuffix}
              stateDefault={area.stateDefault}
              presetDevice={template.device}
            />
          }
        />
        <WhatHappenedTiles />
        <ReviewMarquee reviews={reviews.strip} links={marqueeLinks} ratings={marqueeRatings} showOffice={isVa} />
        <UrgencyBand template={template} />
        {templateId === 'raid' && <RaidFirstHour photo={photos.firstHour} />}
        <StatsBand />
        <SymptomGrid template={template} photos={photos.failures} va={isVa} />
        <HowItWorks area={area} photos={HOW_IT_WORKS_PHOTOS} va={isVa} />
        {isVa && <LabPhotos photos={photos.lab} mobile={photos.labMobile} />}
        <FeaturedReview rating={featuredRating} ratingBig={ratingBig} review={featured} meta={featuredMeta} />
        <OfficeBlock
          area={area}
          mapsUrl={rating.mapsUrl}
          photos={isVa ? undefined : <LabGrid photos={photos.lab} mobile={photos.labMobile} />}
        />
        <LpFaq items={faq} />
        <FinalCta area={area} heading={templateId === 'raid' ? 'Don’t give up on those drives yet' : 'Don’t give up on the drive yet'} />
      </main>
      <LpFooter />
      <LpStickyBar tel={area.tel} phone={area.phone} callLabel={area.stickyCallLabel} topNote={area.pill} />
    </>
  );
}
