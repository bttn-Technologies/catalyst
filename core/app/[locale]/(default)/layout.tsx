import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { LocaleType } from '~/i18n/routing';

import { Subscribe } from '@/vibes/soul/components/subscribe';

interface Props extends PropsWithChildren {
  params: { locale: LocaleType };
}

export default function DefaultLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale);

  const t = useTranslations('Home');

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>

      <main>{children}</main>

      <Subscribe
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
        title={t('Subscribe.title')}
      />

      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
