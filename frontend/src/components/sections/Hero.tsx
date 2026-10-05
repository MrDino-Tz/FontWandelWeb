import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { useContent } from '../../admin/store';

export function AnnouncementBanner() {
  const { content } = useContent();
  const { bannerText: text, bannerLinkText: linkText, bannerTo } = content.hero;
  return (
    <div className="flex justify-center">
      <div className="rounded-xl bg-slate-50 shadow-md">
        <Link
          to={bannerTo}
          className="group flex h-9 w-fit items-center justify-center gap-0 rounded-xl transition duration-300"
          aria-label={`${text} - ${linkText}`}
        >
          <div className="flex h-full w-fit items-center gap-2 rounded-xl bg-linear-to-tr from-gold-600 to-gold-500 px-3">
            <span className="text-sm font-medium text-black">{text}</span>
          </div>
          <div className="hidden h-full w-fit items-center justify-center gap-2 px-3 sm:flex">
            <span className="text-sm transition duration-300 group-hover:underline">{linkText}</span>
            <Icon name="chevronRight" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export function HeroContent() {
  const { content } = useContent();
  const hero = content.hero;
  return (
    <>
      <div className="mx-auto max-w-4xl text-left select-none sm:text-center">
        <h1 className="block text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.title}
        </h1>
      </div>
      <div className="mx-auto max-w-3xl text-left sm:text-center">
        <p className="text-lg text-pretty text-slate-700">
          {hero.subtitle}
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5 sm:flex-row">
        <Button to={hero.secondaryBtn.to} variant="secondary">{hero.secondaryBtn.label}</Button>
        <Button to={hero.primaryBtn.to} variant="primary">{hero.primaryBtn.label}</Button>
      </div>
    </>
  );
}

export function HeroVideo() {
  return (
    <div className="relative m-auto w-full pt-16 sm:w-[90%]">
      <div className="via-off-white to-off-white pointer-events-none absolute inset-x-0 -top-2 z-10 hidden h-20 w-full bg-linear-to-t from-transparent sm:block" />
      <div className="via-off-white to-off-white pointer-events-none absolute inset-x-0 -bottom-2 z-10 hidden h-20 w-full bg-linear-to-b from-transparent sm:block" />

      {/* Floating notification: payment */}
      <div className="fw-float absolute top-24 -left-2 z-20 hidden items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200 sm:flex lg:left-[-3%]">
        <Icon name="checkCircle" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Payment reconciled</p>
          <p className="text-xs text-slate-500">Mobile money • just now</p>
        </div>
      </div>

      {/* Floating notification: backup */}
      <div className="fw-float-slow absolute -right-2 bottom-14 z-20 hidden items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200 sm:flex lg:right-[-3%]">
        <Icon name="dataBase" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Backup completed</p>
          <p className="text-xs text-slate-500">Cloud • daily 02:00</p>
        </div>
      </div>

      {/* Hero video — free stock (Pexels license), diverse business team at work */}
      <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-slate-200">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="https://videos.pexels.com/video-files/6561559/6561559-hd_1280_720_25fps.mp4"
          aria-label="FontWandel at work"
          className="aspect-video w-full object-cover"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-teal-200 via-transparent to-white">
      <div className="mx-auto max-w-[85rem] space-y-8 px-4 pt-48 pb-12 sm:px-6 lg:px-8">
        <AnnouncementBanner />
        <HeroContent />
        <HeroVideo />
      </div>
    </section>
  );
}
