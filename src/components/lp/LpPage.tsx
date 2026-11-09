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

  // No review counts anywhere (they go stale). VA pages (section 6) show the Tysons office only: its
  // rating, its reviews and its Maps listing, and never mention Columbia. MD and RAID: Columbia only.
  const isVa = areaId === 'va';
  const ratingSub = isVa ? 'our Tysons office' : 'Google reviews of our Columbia lab';
  const marqueeRatings = isVa
    ? [{ label: 'Tysons office', rating: rating.rating }]
    : [{ label: 'Columbia lab', rating: lab.rating }];
  const marqueeLinks = [{ label: 'See all reviews on Google Maps', href: rating.mapsUrl }];
  const featured = reviews.featured;
  if (isVa && featured.location !== 'tysons') throw new Error(`VA page ${pageKey} features a Columbia review`);
  // The big rating next to the featured review is that review's own office rating.
  const featuredRating = locationRating(featured.location);
  const featuredOffice = featured.location === 'tysons' ? 'our Tysons office' : 'our Columbia lab';
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
            a: `${isVa ? 'We specialise' : 'Our lab specialises'} in hard drives, SSDs, RAID and servers. For phones, SD cards and USB sticks we’re usually not the right fit.`,
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
        <UrgencyBand template={template} va={isVa} />
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
      <LpFooter va={isVa} />
      <LpStickyBar tel={area.tel} phone={area.phone} callLabel={area.stickyCallLabel} topNote={area.pill} />
    </>
  );
}
