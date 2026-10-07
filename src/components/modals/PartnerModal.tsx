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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#001410] text-[#D2FCE3] rounded-2xl shadow-2xl p-5 sm:p-8 border border-[#23C48E]/30 my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-[#D2FCE3]/60 hover:text-white rounded-full hover:bg-[#003734] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#23C48E] mx-auto" />
            <h3 className="text-2xl font-display font-black text-white uppercase">
              INQUIRY RECEIVED
            </h3>
            <p className="text-xs text-[#D2FCE3]/80 leading-relaxed font-mono">
              Thank you. Our partnership team will contact you via {formData.email} or you can reach us at info@ugegbegwr.com.
            </p>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2.5 bg-[#23C48E] text-[#001410] font-mono text-xs uppercase tracking-wider font-bold rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center pb-1">
              <img
                src="/UGEGBE_X_GWR_Light_Compact.png"
                alt="Ugegbe x Guinness World Records"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(35,196,142,0.3)]"
              />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#23C48E] font-bold block">
                CORPORATE & CULTURAL PARTNERSHIP
              </span>
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">
                PARTNER WITH US
              </h3>
              <p className="text-xs text-[#D2FCE3]/80 leading-relaxed">
                Associate your brand with Favour Chisimdi Nwobodo's historic Guinness World Records attempt at Landmark Centre, Lagos, Nigeria.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                  Organisation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Organisation name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organisation.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[#D2FCE3] mb-1">
                  Message *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief note on your partnership interest..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#003734]/40 border border-[#23C48E]/30 rounded-lg text-base sm:text-sm text-white placeholder:text-[#D2FCE3]/40 focus:outline-none focus:ring-2 focus:ring-[#23C48E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#23C48E] hover:bg-[#40FFBC] text-[#001410] font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-60"
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
