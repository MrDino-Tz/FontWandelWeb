import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon';

const contactDetails = {
  addressLine1: 'Arusha',
  addressLine2: 'Tanzania',
  phone: '+255 757 830 276',
  email: 'dbacrisskarengi@outlook.com',
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-[85rem] px-4 pt-48 pb-28 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl lg:mb-14">
        <h2 className="text-4xl text-balance text-slate-800 sm:text-5xl md:text-6xl lg:text-7xl">
          Contact us
        </h2>
        <p className="mt-1 ml-1 text-slate-600">Questions, Comments or Feedback.</p>
      </div>
      <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:gap-x-16">
        <div className="mb-10 h-fit rounded-xl bg-teal-400 p-8 md:order-2 md:mb-0">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input required placeholder="Name" className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm" />
            <input required type="email" placeholder="Email" className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm" />
            <textarea id="input-message" required placeholder="Message" rows={5} className="w-full rounded-lg border border-white/40 bg-white px-3 py-2.5 text-sm" />
            <button type="submit" className="w-full rounded-lg bg-gold-500 px-6 py-2.5 font-medium text-black hover:bg-gold-600">
              Send message
            </button>
          </form>
        </div>
        <div className="space-y-14">
          <div className="flex gap-x-5">
            <Icon name="mapPin" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Our address:</h4>
              <address className="mt-1 text-sm text-slate-500 not-italic">
                {contactDetails.addressLine1}
                <br />
                {contactDetails.addressLine2}
              </address>
            </div>
          </div>
          <div className="flex gap-x-5">
            <Icon name="email" className="size-6 shrink-0 text-slate-600" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Contact us by email:</h4>
              <a className="mt-1 text-sm text-slate-500 hover:text-slate-400" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </div>
          </div>
          <div className="flex gap-x-5">
            <Icon name="info" className="size-6 shrink-0 text-slate-600" />
            <div className="grow">
              <h4 className="font-semibold text-slate-600">Support center</h4>
              <p className="mt-1 text-sm text-slate-500">Raise a case, reach our helpdesk, or browse guides.</p>
              <p className="mt-2">
                <Link to="/support/knowledge-base" className="group inline-flex items-center gap-x-2 text-sm font-medium text-slate-600 hover:underline">
                  Visit the support center <Icon name="chevronRight" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
