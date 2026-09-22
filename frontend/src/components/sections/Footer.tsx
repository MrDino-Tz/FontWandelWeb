import { Link } from 'react-router-dom';

const companyName = 'FontWandel Technologies Ltd.';
const companyDescription =
  'FontWandel Technologies Ltd. is a digital transformation and innovation company enabling organizations to embrace secure, connected technology.';

const contactDetails = {
  address: 'Arusha, Tanzania',
  phone: '+255 757 830 276',
  email: 'dbacrisskarengi@outlook.com',
};

const copyrightYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-linear-to-t from-teal-200 via-transparent to-white pb-10">
      <div className="mx-auto mt-auto w-full max-w-[85rem] px-4 pb-10 sm:px-6 lg:px-8">
        <hr className="mb-10 border-slate-200" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="col-span-full self-center xl:col-span-2">
            <Link to="/" className="flex-none text-xl font-semibold text-slate-700 uppercase">
              {companyName}
            </Link>
            <p className="mt-5 text-pretty text-slate-600 lg:w-5/12 xl:w-10/12">
              {companyDescription}
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 xl:col-span-1 xl:col-start-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-700 mb-2">Contact</p>
            <p>{contactDetails.address}</p>
            <p>{contactDetails.phone}</p>
            <p>{contactDetails.email}</p>
          </div>
          <div id="subscribe" className="col-span-2 md:col-span-3 xl:col-span-2 scroll-mt-32">
            <h3 className="font-semibold text-slate-700">More information?</h3>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-black hover:bg-gold-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <hr className="mt-10 mb-5 border-slate-200" />
        <div className="grid gap-y-2 sm:flex sm:items-center sm:justify-between sm:gap-y-0">
          <p className="text-sm font-medium text-slate-600">
            &copy; {copyrightYear} {companyName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
