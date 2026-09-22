import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import type { IconName } from '../ui/Icon';
import { asset } from '../../utils/base';
import { navigationLinks } from '../../data/navigation';
import {
  servicesMenu,
  productsMenu,
  supportMenu,
} from '../../data/menus';

const platformImages: Record<string, string> = {
  'net-kitonga': '/assets/images/net-kitonga.svg',
  'duka-kamili': '/assets/images/duka-kamili.svg',
  smrtevent: '/assets/images/smrtevent.svg',
  foleni: '/assets/images/foleni-kiganjani.svg',
};

const MENU_WRAPPER =
  'hs-dropdown [--adaptive:none] [--is-collapse:true] [--strategy:static] xl:[--is-collapse:false] xl:[--strategy:absolute] xl:[--trigger:hover]';
const MENU_PANEL =
  'hs-dropdown-menu hs-dropdown-open:opacity-100 relative start-0 top-full z-10 mt-2 hidden w-full max-w-(--breakpoint-md) min-w-60 opacity-0 transition-[opacity,margin] duration-150 before:absolute before:start-0 before:-top-5 before:h-5 before:w-full xl:left-1/2 xl:-translate-x-1/2 xl:duration-300';
const MENU_INNER =
  'from-teal-100 via-transparent to-white px-4 py-2 lg:mx-8 xl:mx-6 xl:rounded-lg xl:bg-white xl:bg-linear-to-t/oklch xl:px-16 xl:py-10 xl:shadow-lg xl:ring-1 xl:ring-teal-950/5';

function MenuToggle({
  id,
  label,
  active,
  labelledBy,
}: {
  id: string;
  label: string;
  active: boolean;
  labelledBy: string;
}) {
  return (
    <button
      id={id}
      type="button"
      className={`hs-dropdown-toggle flex w-full items-center rounded-lg p-2 font-medium text-slate-800 hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden ${
        active ? 'underline underline-offset-4' : ''
      }`}
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label={labelledBy}
    >
      {label} <Icon name="arrowDownRight" />
    </button>
  );
}

function MenuLinkItem({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  const inner = (
    <>
      <Icon
        name={icon as IconName}
        className="mt-1 size-5 shrink-0 text-slate-800"
      />
      <div className="grow">
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </>
  );
  const cls =
    'flex gap-x-4 rounded-lg p-3 hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden';
  if (href.startsWith('http') || href === '#') {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={href}>
      {inner}
    </Link>
  );
}

function ServicesMenu() {
  const { pathname } = useLocation();
  return (
    <div className={MENU_WRAPPER}>
      <MenuToggle
        id="mega-menu-services"
        label="Services"
        labelledBy="Mega Menu"
        active={pathname.startsWith('/services')}
      />
      <div
        className={MENU_PANEL}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mega-menu-services"
      >
        <div className={MENU_INNER}>
          <p className="text-sm text-slate-600">
            Practical, connected, and secure solutions for your operations
          </p>
          <hr className="mb-5 border border-teal-300" />
          <div className="gap-4 py-1 md:grid md:grid-cols-2 md:p-2">
            {servicesMenu.map((section) => (
              <div key={section.sectionTitle} className="flex flex-col">
                <p className="text-sm text-slate-600">{section.sectionTitle}</p>
                {section.items.map((item) => (
                  <MenuLinkItem key={item.title} {...item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsMenu() {
  const { pathname } = useLocation();
  return (
    <div className={MENU_WRAPPER}>
      <MenuToggle
        id="mega-menu-products"
        label="Products"
        labelledBy="Mega Menu"
        active={pathname.startsWith('/platform')}
      />
      <div
        className={MENU_PANEL}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mega-menu-products"
      >
        <div className={MENU_INNER}>
          <p className="text-sm text-slate-600">
            Ready-to-deploy software — sold and licensed directly to businesses
          </p>
          <hr className="mb-5 border border-teal-300" />
          <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2 xl:grid-cols-3 xl:p-2 2xl:grid-cols-2">
            {productsMenu.map((product) => (
              <div key={product.title} className="flex h-full flex-col">
                <Link
                  className="group flex h-full flex-col rounded-lg p-3 transition hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden"
                  to={product.href}
                >
                  <img
                    className="aspect-video w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                    src={asset(platformImages[product.image] ?? '/assets/images/net-kitonga.svg')}
                    alt={product.title}
                    loading="lazy"
                  />
                  <div className="mt-5 flex flex-1 flex-col">
                    <h3 className="text-sm font-medium text-slate-800">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500 xl:hidden 2xl:block">
                      {product.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportMenu() {
  const { pathname } = useLocation();
  return (
    <div className={MENU_WRAPPER}>
      <MenuToggle
        id="mega-menu-support"
        label="Support"
        labelledBy="Mega Menu"
        active={pathname.startsWith('/support')}
      />
      <div
        className={MENU_PANEL}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mega-menu-support"
      >
        <div className={MENU_INNER}>
          <div className="gap-x-8 gap-y-4 md:grid md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {supportMenu.map((section) => (
              <div key={section.sectionTitle} className="flex flex-col">
                <p className="text-sm text-slate-600">{section.sectionTitle}</p>
                <hr className="mb-5 w-3/4 border border-teal-300" />
                <div className="xl:grid xl:grid-cols-2 2xl:block">
                  {section.items.map((item) => (
                    <MenuLinkItem key={item.title} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToSubscribe = (e: MouseEvent) => {
    e.preventDefault();
    const scroll = () =>
      document
        .getElementById('subscribe')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 250);
    } else {
      scroll();
    }
  };

  useEffect(() => {
    import('preline').then(({ HSStaticMethods }) => {
      try {
        HSStaticMethods.autoInit();
      } catch {
        /* noop */
      }
    });
  }, [pathname]);

  return (
    <header className="fixed start-1/2 top-5 z-50 mx-auto flex w-full max-w-sm -translate-x-1/2 transform flex-wrap rounded-2xl border-b border-slate-100 bg-white bg-linear-to-t/oklch from-teal-100 via-transparent to-white p-4 shadow-xs sm:max-w-xl md:max-w-4xl md:flex-nowrap md:justify-start lg:max-w-5xl xl:max-w-6xl xl:shadow-none xl:ring-teal-950/5 2xl:max-w-[81rem] 2xl:via-0%">
      <nav className="relative mx-auto w-full px-4 py-2 sm:px-6 lg:px-8 xl:flex xl:max-w-7xl xl:items-center xl:justify-between xl:gap-3 2xl:max-w-[85rem]">
        <div className="flex items-center justify-between gap-x-1">
          <Link
            to="/"
            className="dm-sans flex-none text-2xl font-light text-slate-400 focus:opacity-80 focus:outline-hidden"
            aria-label="FontWandel Logo"
          >
            <span className="font-semibold text-navy-800">Font</span>Wandel
          </Link>
          <button
            type="button"
            className="hs-collapse-toggle relative flex size-9 items-center justify-center rounded-lg border border-slate-200 text-[12px] font-medium text-slate-800 hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden xl:hidden"
            id="hs-header-base-collapse"
            aria-expanded="false"
            aria-controls="hs-header-base"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-header-base"
          >
            <svg
              className="hs-collapse-open:hidden size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              className="hs-collapse-open:block hidden size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>

        <div
          id="hs-header-base"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 xl:ml-12 xl:block 2xl:ml-20"
          aria-labelledby="hs-header-base-collapse"
        >
          <div className="max-h-[75vh] overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100">
            <div className="flex flex-col gap-0.5 py-2 xl:flex-row xl:items-center xl:gap-1 xl:py-0">
              <div className="grow">
                <div className="flex flex-col gap-0.5 xl:flex-row xl:items-center xl:justify-evenly xl:gap-1">
                  <Link
                    to="/"
                    className={`flex items-center rounded-lg p-2 font-medium text-slate-800 hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden ${
                      pathname === '/' ? 'underline underline-offset-4' : ''
                    }`}
                    aria-current={pathname === '/' ? 'page' : undefined}
                  >
                    Home
                  </Link>

                  <ServicesMenu />
                  <ProductsMenu />
                  <SupportMenu />

                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center rounded-lg p-2 font-medium text-slate-800 hover:bg-slate-100 focus:bg-slate-100 focus:outline-hidden ${
                        pathname === link.href ? 'underline underline-offset-4' : ''
                      }`}
                      aria-current={pathname === link.href ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-1.5 xl:mt-0 xl:ml-6">
                <Button
                  variant="primary"
                  className="inline-flex border-none py-2! text-nowrap"
                  onClick={goToSubscribe}
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
