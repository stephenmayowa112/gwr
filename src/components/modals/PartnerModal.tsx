import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { PartnerInquirySchema, PartnerInquiryFormData } from '../../types';
import { store } from '../../services/store';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<PartnerInquiryFormData>({
    name: '',
    organization: '',
    email: '',
    tierInterest: 'Headline / Title Partner',
    message: '',
    websiteTrap: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (formData.websiteTrap && formData.websiteTrap.length > 0) return;

    const validation = PartnerInquirySchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      store.addPartnerInquiry(validation.data);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'An error occurred. Please email info@ugegbegwr.com directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-emerald-950/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
            <h3 className="text-2xl font-display font-black text-emerald-950 uppercase">
              INQUIRY RECEIVED
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              Thank you. Our partnership team will contact you via {formData.email} or you can reach us at info@ugegbegwr.com.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2.5 bg-emerald-950 text-white font-mono text-xs uppercase tracking-wider rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                PARTNER
              </span>
              <h3 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                PARTNER WITH US
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Put your organisation alongside a story about language, culture, connection and possibility.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                  Organisation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Organisation name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organisation.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                  Message *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief note on your partnership interest..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Submit Partner Inquiry'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
