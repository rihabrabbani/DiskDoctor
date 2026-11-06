import { AREAS, type AreaId } from '@/lp/config/areas';
import { TEMPLATES, type TemplateId } from '@/lp/config/templates';
import { locationRating, pageReviews } from '@/lp/reviews';
import LpForm from './LpForm';
import ReviewMarquee from './ReviewMarquee';
import StatsBand from './StatsBand';
import LpStickyBar from './LpStickyBar';
import {
  FeaturedReview,
  FinalCta,
  HowItWorks,
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
  const reviews = pageReviews(templateId === 'raid' ? 'raid' : `${areaId}/${templateId}`);
  const rating = locationRating(area.location);
  const lab = locationRating('columbia');

  // VA pages show the Tysons rating and also mention the Columbia lab's.
  const isVa = areaId === 'va';
  // VA pages show no review counts (they go out of date); the strip links to all Google reviews.
  const ratingSub = isVa
    ? `Google reviews of our Tysons office · ${lab.rating} at our Columbia lab`
    : `from ${rating.count} reviews of our Columbia lab`;
  const ratingBig = isVa
    ? `Google rating of our Tysons office (our Columbia lab: ${lab.rating})`
    : `Average of ${rating.count} Google reviews of our Columbia lab`;
  const reviewsLinkLabel = isVa ? 'See all Google reviews' : `See all ${rating.count} on Google Maps`;
  const marqueeTitle = isVa
    ? 'Selected Google reviews of our Tysons office and Columbia lab'
    : 'Selected Google reviews of our Columbia lab';
  const featured = reviews.featured;
  const featuredMeta = isVa
    ? `Google review of our ${featured.location === 'tysons' ? 'Tysons office' : 'Columbia lab'} · ${featured.date}`
    : `Google review · ${featured.date}`;

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
        <ReviewMarquee title={marqueeTitle} reviews={reviews.strip} linkLabel={reviewsLinkLabel} mapsUrl={rating.mapsUrl} />
        <UrgencyBand template={template} />
        {templateId === 'raid' && <RaidFirstHour />}
        <StatsBand />
        <SymptomGrid template={template} />
        <HowItWorks area={area} />
        <FeaturedReview rating={rating} ratingBig={ratingBig} review={featured} meta={featuredMeta} />
        <OfficeBlock area={area} mapsUrl={rating.mapsUrl} showPhotoSlots={process.env.VERCEL_ENV !== 'production'} />
        <LpFaq items={faq} />
        <FinalCta area={area} heading={templateId === 'raid' ? 'Don’t give up on those drives yet' : 'Don’t give up on the drive yet'} />
      </main>
      <LpFooter />
      <LpStickyBar tel={area.tel} phone={area.phone} callLabel={area.stickyCallLabel} topNote={area.pill} />
    </>
  );
}
