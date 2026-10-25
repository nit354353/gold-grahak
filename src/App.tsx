import { useState, useEffect, useRef } from 'react';

// Gold rates data
const goldRates = [
  { label: '24K Gold', rate: '₹13,061/g', change: '▲ +1.25%' },
  { label: '22K Gold', rate: '₹11,973/g', change: '▲ +1.25%' },
  { label: '18K Gold', rate: '₹9,796/g', change: '▲ +1.25%' },
  { label: '14K Gold', rate: '₹7,619/g', change: '▲ +1.25%' },
];

const rateMap: Record<string, number> = {
  '24K': 13061,
  '22K': 11973,
  '18K': 9796,
  '14K': 7619,
};

// Testimonials data
const testimonials = [
  {
    text: "I was nervous about selling my mother's gold, but Gold Grahak made the process so comfortable. The expert was professional, explained everything clearly, and paid me immediately. Best rate I could find in Bhubaneswar!",
    name: 'Ramesh Patnaik',
    initials: 'RP',
    location: 'Bhubaneswar, Odisha',
  },
  {
    text: 'Sold some old bangles and got an amazing rate — much better than my local shop quoted. The home visit was so convenient. I got paid via UPI in minutes. Highly recommend Gold Grahak to everyone!',
    name: 'Priya Mohanty',
    initials: 'PM',
    location: 'Cuttack, Odisha',
  },
  {
    text: 'Very trustworthy service. They tested my gold openly in front of me, showed me the readings, and gave me a fair price. No pressure tactics, completely honest. I sold 25 grams and got an excellent deal.',
    name: 'Suresh Das',
    initials: 'SD',
    location: 'Jajpur, Odisha',
  },
  {
    text: 'The experience was fantastic. I was hesitant at first, but their professionalism and transparency won me over. Got ₹87,000 for old jewellery — much more than I expected! Will definitely use them again.',
    name: 'Anjali Behera',
    initials: 'AB',
    location: 'Bhubaneswar, Odisha',
  },
  {
    text: 'Called them at 10 AM and by 12 PM I had cash in hand. Lightning fast service. The expert arrived on time, was very courteous, and the testing machine showed results instantly. Wonderful service Gold Grahak!',
    name: 'Bikram Sahoo',
    initials: 'BS',
    location: 'Cuttack, Odisha',
  },
];

// Steps data
const steps = [
  {
    num: 1,
    title: 'Book a Free Visit',
    checks: ['Call, WhatsApp or fill the form', 'Choose a time that suits you', 'Zero booking charge'],
    desc: 'Tell us the approximate weight & type of gold. We schedule a certified expert at your convenience.',
    phase: 'doorstep',
  },
  {
    num: 2,
    title: 'Keep Your ID Proof Ready',
    checks: ['Aadhaar Card (photo + address)', 'OR Passport for fast-track KYC', 'Any govt. photo ID works'],
    desc: 'A valid photo ID and address proof is required for a safe, compliant transaction. Your Aadhaar covers both.',
  },
  {
    num: 3,
    title: 'Our Expert Arrives',
    checks: ['Uniformed, verified professional', 'Carries certified testing kit', 'On time, every time'],
    desc: 'Prefer to visit us instead? Walk into your nearest Gold Grahak branch — same process, same rate.',
  },
  {
    num: 4,
    title: 'Gold Purity Check',
    checks: ['Tamper-proof testing', 'BIS-certified karat machine', 'Accurate, non-destructive valuation'],
    desc: "Your gold's purity is measured in front of you. Your ornaments are never harmed during testing.",
    phase: 'both',
  },
  {
    num: 5,
    title: 'Check Live Gold Rate',
    checks: ['Transparent, market-linked quote', 'Up to 97% of live rate', 'Same rate at every branch'],
    desc: "Based on the purity check we give you a clear quotation calculated on today's live gold rate.",
  },
  {
    num: 6,
    title: 'Quick KYC Verification',
    checks: ['Photo ID & address proof', 'Verification call for your safety', 'Done in minutes'],
    desc: 'A simple KYC check keeps every transaction safe and fraud-free for you and your family.',
  },
  {
    num: 7,
    title: 'Instant Payment + Bonus',
    checks: ['Cash, UPI or instant bank transfer', 'Confirm money before we leave', 'Extra bonus with original bill'],
    desc: 'Accept the offer and get paid on the spot. Carry your original purchase bill to earn a better rate.',
  },
];

// FAQ data
const faqs = [
  {
    q: 'How do you determine the value of my gold?',
    a: 'We use BIS-certified electronic gold testing equipment (karat meter) to accurately measure purity. The value is calculated based on the current live gold rate, ensuring you get a fair, market-linked price for your gold.',
  },
  {
    q: 'Is the home service really free?',
    a: 'Yes, completely free! We come to your location, test your gold, give you a quote, and if you agree, pay you instantly — all at zero charge to you. No hidden fees ever.',
  },
  {
    q: 'How long does the entire process take?',
    a: 'The entire process typically takes 30–45 minutes from when our expert arrives. Testing, weighing, valuation, and payment are all done on the spot. Most customers complete the transaction in under an hour.',
  },
  {
    q: 'What types of gold do you buy?',
    a: 'We buy all forms of gold — jewellery (necklaces, bangles, rings, earrings, chains), gold coins, gold bars, broken or damaged jewellery, and old gold items. We accept 14K, 18K, 22K, and 24K gold.',
  },
  {
    q: 'Do I need original invoices or bills?',
    a: 'No, you do not need original purchase invoices to sell. We test the gold directly using certified equipment, so purity is determined scientifically. However, carrying your original bill can earn you a better rate.',
  },
  {
    q: 'How and when do I receive payment?',
    a: 'Payment is made immediately once you accept the offer. You can choose cash, UPI (GPay, PhonePe, Paytm), or bank transfer — whichever is most convenient. No waiting periods.',
  },
];

// Branches data
const branches = [
  {
    num: '01',
    name: 'Bhubaneswar',
    state: 'Odisha, India',
    features: ['Branch + same-day home visit', 'All areas: Unit 1–9, Patia, Nayapalli', 'Mon–Sat, 9 AM – 7 PM'],
  },
  {
    num: '02',
    name: 'Cuttack',
    state: 'Odisha, India',
    features: ['Covering all major localities', 'Bidanasi, Badambadi, Choudhury Bazar', 'Mon–Sat, 9 AM – 7 PM'],
  },
  {
    num: '03',
    name: 'Jajpur',
    state: 'Odisha, India',
    features: ['Jajpur Town & Road covered', 'Advance booking recommended', 'Mon–Sat, 9 AM – 7 PM'],
  },
];

// Blog data
const blogs = [
  {
    tag: 'Selling Gold',
    read: '5 min read',
    title: '6 Things to Check Before Selling Your Gold',
    desc: 'A simple checklist to make sure you get the best value when you sell.',
  },
  {
    tag: 'Tax & Rules',
    read: '5 min read',
    title: 'Is Cash for Gold Taxable in India?',
    desc: 'Understand the income-tax rules when selling personal gold jewellery.',
  },
  {
    tag: 'KYC',
    read: '5 min read',
    title: 'What KYC Documents Do You Need to Sell Gold?',
    desc: 'The exact ID and address proofs required for a smooth transaction.',
  },
];

// WhatsApp SVG icon
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.525 5.847L.057 23.882a.5.5 0 00.612.612l6.035-1.468A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.014-1.375l-.36-.213-3.726.906.922-3.617-.234-.372A9.818 9.818 0 1112 21.818z" />
  </svg>
);

// Star SVG
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#d4a843]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [calcGrams, setCalcGrams] = useState('');
  const [calcPurity, setCalcPurity] = useState('22K');
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const trackRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCalcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const grams = parseFloat(calcGrams);
    if (grams > 0) {
      const rate = rateMap[calcPurity];
      setCalcResult(Math.round(grams * rate));
    }
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* TICKER */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...goldRates, ...goldRates, ...goldRates, ...goldRates].map((item, i) => (
            <span key={i} className="ticker-item">
              <span className="rate-label">{item.label}:</span>
              <span className="rate-val">{item.rate}</span>
              <span className="rate-change">{item.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="navbar-logo">
            Gold<span>Grahak</span>
          </a>
          <div className="navbar-links">
            <a href="#">Home</a>
            <a href="#branches">Branches</a>
            <a href="#how">How It Works</a>
            <a href="#calc">Calculator</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="navbar-actions">
            <a href="tel:+918260242477" className="btn btn-primary btn-sm">
              📞 Call Now
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-v2">
        <div className="hero-v2-bg"></div>
        <div className="container hero-v2-grid">
          <div className="hero-v2-left">
            <div className="hero-sponsors fade-up">
              <span className="hero-sponsors-label">Proudly associated with</span>
              <div className="hero-sponsors-row">
                <div className="ph-logo">Sponsor 1</div>
                <div className="ph-logo">Sponsor 2</div>
                <div className="ph-logo">Sponsor 3</div>
              </div>
            </div>
            <div className="hero-badge fade-up">
              <span className="dot"></span> Odisha's #1 Trusted Gold Buyer
            </div>
            <h1 className="fade-up">
              Turn Your Gold
              <br />
              Into <em>Instant Cash</em>
            </h1>
            <p className="hero-v2-sub fade-up">
              Sell your gold at your doorstep or at our branch — whichever you prefer. Certified testing, transparent live rates, and instant payment to your bank account. 100% safe, 100% hassle-free.
            </p>
            <div className="hero-v2-actions fade-up">
              <a
                href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Sell Gold Now
              </a>
              <a href="#branches" className="btn btn-outline btn-lg">
                Find Nearest Branch
              </a>
            </div>
            <div className="hero-v2-stats fade-up">
              <div>
                <div className="hero-stat-val">1,065+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
              <div>
                <div className="hero-stat-val">₹11Cr+</div>
                <div className="hero-stat-label">Gold Purchased</div>
              </div>
              <div>
                <div className="hero-stat-val">4.9★</div>
                <div className="hero-stat-label">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="hero-lead-card fade-up fade-up-delay-1">
            <h2 className="hero-lead-title">Looking for Gold Buyers in Odisha?</h2>
            <p className="hero-lead-sub">Get a free call back & live valuation in minutes.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! We will contact you shortly.');
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <div className="lead-phone-wrap">
                  <span className="lead-cc">+91</span>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    inputMode="numeric"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <label className="lead-consent">
                <input type="checkbox" defaultChecked />
                <span>I authorise Gold Grahak to call me on this number.</span>
              </label>
              <button type="submit" className="btn btn-primary lead-submit">
                Sell Gold
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <a href="tel:+918260242477" className="lead-call">
                or Call +91 82602 42477
              </a>
            </form>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            <div className="trust-item fade-up">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 010 7.75"></path>
                </svg>
              </div>
              <div className="trust-count">1,065+</div>
              <div className="trust-label">Happy Customers</div>
            </div>
            <div className="trust-item fade-up fade-up-delay-1">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
                </svg>
              </div>
              <div className="trust-count">₹11Cr+</div>
              <div className="trust-label">Gold Purchased</div>
            </div>
            <div className="trust-item fade-up fade-up-delay-2">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="trust-count">4.9★</div>
              <div className="trust-label">Average Rating</div>
            </div>
            <div className="trust-item fade-up fade-up-delay-3">
              <div className="trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="trust-count">3+ Cities</div>
              <div className="trust-label">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="steps-v2 section-pad" id="how">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">The Process</span>
            <h2 className="section-heading">
              Sell Gold in <span className="gold-text">7 Easy Steps</span>
            </h2>
            <p className="section-sub">
              A transparent journey from your first call to instant payment — at your doorstep or at our branch.
            </p>
          </div>

          {steps.map((step, idx) => (
            <div key={step.num}>
              {step.phase === 'doorstep' && (
                <div className="phase-label fade-up">
                  <span className="phase-dots">· · ·</span> AT YOUR DOORSTEP <span className="phase-dots">· · ·</span>
                </div>
              )}
              {step.phase === 'both' && (
                <div className="phase-label fade-up">
                  <span className="phase-dots">· · ·</span> AT YOUR DOORSTEP OR OUR BRANCH <span className="phase-dots">· · ·</span>
                </div>
              )}
              <div className={`step-v2 fade-up ${idx % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="step-v2-num">{step.num}</div>
                <div className="step-v2-body">
                  <h3 className="step-v2-title">{step.title}</h3>
                  <div className="step-v2-checks">
                    {step.checks.map((check, i) => (
                      <span key={i} className="chk">
                        <i></i> {check}
                      </span>
                    ))}
                  </div>
                  <p className="step-v2-desc">{step.desc}</p>
                </div>
                <div className="step-v2-media">
                  <div className="w-full h-full flex items-center justify-center text-[#b8922e] text-lg font-semibold bg-gradient-to-br from-[#f8f4ee] to-[#efe8d8]">
                    Step {step.num}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="steps-v2-cta fade-up">
            <a
              href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Start Now — It's Free
            </a>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-v2 section-pad">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-heading light">Why Sell Gold to Gold Grahak?</h2>
            <p className="section-sub light">Six reasons thousands across Odisha trust us with their gold.</p>
          </div>
          <div className="why-v2-grid">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                ),
                title: 'Technology Driven',
                desc: 'BIS-certified electronic machines for accurate, tamper-proof purity checks.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                ),
                title: 'Doorstep & Branches',
                desc: 'We come to your home, or visit any of our branches across Odisha — your choice.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 010 7.75"></path>
                  </svg>
                ),
                title: 'Professional Team',
                desc: 'Trained, verified, uniformed gold experts who treat you with respect.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
                  </svg>
                ),
                title: 'Transparent Live Rate',
                desc: 'Same guaranteed gold rate across every branch — no hidden deductions.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                ),
                title: 'Instant Payment',
                desc: 'Money transferred to your bank account before we leave — confirmed on the spot.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                ),
                title: 'Complaint Redressal',
                desc: 'A transparent grievance system — your trust and satisfaction come first.',
              },
            ].map((item, idx) => (
              <div key={idx} className={`why-v2-card fade-up ${idx % 3 !== 0 ? `fade-up-delay-${idx % 3}` : ''}`}>
                <div className="why-v2-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="calculator-section section-pad" id="calc">
        <div className="container">
          <div className="calc-inner">
            <div className="calc-text fade-up">
              <span className="section-label">Live Gold Rate</span>
              <h2 className="section-heading light">Estimate Your Gold Value</h2>
              <p className="section-sub light">
                Enter your gold weight and purity to get an instant estimated value based on today's live market rates. Final amount confirmed after testing.
              </p>
              <div className="rate-chips">
                <span className="rate-chip">24K — ₹13,061/g</span>
                <span className="rate-chip">22K — ₹11,973/g</span>
                <span className="rate-chip">18K — ₹9,796/g</span>
                <span className="rate-chip">14K — ₹7,619/g</span>
              </div>
            </div>
            <div className="calc-card fade-up fade-up-delay-1">
              <form onSubmit={handleCalcSubmit}>
                <label htmlFor="calcGrams">Gold Weight (in grams)</label>
                <input
                  type="number"
                  id="calcGrams"
                  placeholder="e.g. 10"
                  min="0.1"
                  step="0.1"
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(e.target.value)}
                  required
                />
                <label htmlFor="calcPurity">Gold Purity / Karat</label>
                <select id="calcPurity" value={calcPurity} onChange={(e) => setCalcPurity(e.target.value)}>
                  <option value="24K">24 Karat (99.9% Pure)</option>
                  <option value="22K">22 Karat (91.6% Pure)</option>
                  <option value="18K">18 Karat (75% Pure)</option>
                  <option value="14K">14 Karat (58.5% Pure)</option>
                </select>
                <button type="submit" className="calc-btn">
                  Calculate Estimate
                </button>
                {calcResult !== null && (
                  <div className="calc-result">
                    <div className="calc-result-label">Estimated Value</div>
                    <div className="calc-result-val">₹{calcResult.toLocaleString()}</div>
                    <p className="calc-result-note">*Final amount may vary after physical verification</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="service-areas section-pad" id="branches">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">Doorstep & Branches</span>
            <h2 className="section-heading">Find Us Across Odisha</h2>
            <p className="section-sub">
              Visit a branch or book a free home visit — currently serving 3 major cities, with more coming soon.
            </p>
          </div>
          <div className="areas-grid">
            {branches.map((branch, idx) => (
              <div key={idx} className={`area-card fade-up ${idx > 0 ? `fade-up-delay-${idx}` : ''}`}>
                <div className="area-card-top">
                  <div className="area-num">{branch.num}</div>
                  <div className="area-name">{branch.name}</div>
                  <div className="area-state">{branch.state}</div>
                </div>
                <div className="area-card-body">
                  <div className="area-features">
                    {branch.features.map((feat, i) => (
                      <div key={i} className="area-feat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {feat}
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Book Visit
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section-pad">
        <div className="container">
          <div className="testimonials-header">
            <div className="fade-up">
              <span className="section-label">Customer Reviews</span>
              <h2 className="section-heading light">Real Customers, Real Experiences</h2>
              <p className="section-sub light">
                Real stories from real people across Odisha who trusted Gold Grahak with their gold.
              </p>
            </div>
            <div className="slider-controls fade-up fade-up-delay-1">
              <button className="slider-btn" onClick={prevTestimonial} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="slider-btn" onClick={nextTestimonial} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="testimonials-track-wrap">
            <div
              ref={trackRef}
              className="testimonials-track"
              style={{ transform: `translateX(-${testimonialIndex * 404}px)` }}
            >
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-card">
                  <div className="tc-stars">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p className="tc-text">{t.text}</p>
                  <div className="tc-footer">
                    <div className="tc-avatar">{t.initials}</div>
                    <div>
                      <div className="tc-name">{t.name}</div>
                      <div className="tc-loc">📍 {t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="slider-dots">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot ${idx === testimonialIndex ? 'active' : ''}`}
                onClick={() => setTestimonialIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* REFER & EARN */}
      <section className="refer-section section-pad">
        <div className="container">
          <div className="refer-inner">
            <div className="refer-left fade-up">
              <span className="section-label">Refer & Earn</span>
              <h2 className="section-heading">Become a Gold Grahak Agent</h2>
              <p className="section-sub">
                Know someone looking to sell gold? Refer them and earn a reward when they complete a transaction with us.
              </p>
              <div className="refer-steps">
                <div className="refer-step">
                  <span className="refer-step-num">1</span>
                  <div>
                    <h4>Share Your Details</h4>
                    <p>Send us your name and phone number.</p>
                  </div>
                </div>
                <div className="refer-step">
                  <span className="refer-step-num">2</span>
                  <div>
                    <h4>Add a Referral</h4>
                    <p>Give us your referral's name and number.</p>
                  </div>
                </div>
                <div className="refer-step">
                  <span className="refer-step-num">3</span>
                  <div>
                    <h4>Earn up to ₹1,000</h4>
                    <p>Get rewarded when your referral transacts with us.</p>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20refer%20someone%20to%20Gold%20Grahak."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Refer Now
              </a>
              <p className="refer-tnc">*Terms & conditions apply</p>
            </div>
            <div className="refer-right fade-up fade-up-delay-1">
              <div className="refer-img bg-gradient-to-br from-[#f8f4ee] to-[#efe8d8] flex items-center justify-center text-[#b8922e] text-xl font-bold rounded-[20px]">
                Refer & Earn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="blogs-v2 section-pad">
        <div className="container">
          <div className="text-center fade-up">
            <span className="section-label">Learn More</span>
            <h2 className="section-heading">Want to Know More?</h2>
            <p className="section-sub">Tips and guides to help you sell your gold smartly and safely.</p>
          </div>
          <div className="blogs-v2-grid">
            {blogs.map((blog, idx) => (
              <a key={idx} className={`blog-v2-card fade-up ${idx > 0 ? `fade-up-delay-${idx}` : ''}`} href="#">
                <div className="blog-v2-img bg-gradient-to-br from-[#f0e6d3] to-[#e8dcc5] flex items-center justify-center text-[#b8922e] font-semibold">
                  {blog.tag}
                </div>
                <div className="blog-v2-body">
                  <span className="blog-v2-tag">{blog.tag}</span>
                  <span className="blog-v2-read">{blog.read}</span>
                  <h3>{blog.title}</h3>
                  <p>{blog.desc}</p>
                  <span className="blog-v2-link">Read More →</span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center fade-up" style={{ marginTop: '40px' }}>
            <a className="btn btn-outline-dark" href="#">
              Show More
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-pad" id="faq">
        <div className="container">
          <div className="faq-grid">
            <div className="fade-up">
              <span className="section-label">FAQs</span>
              <h2 className="section-heading">Common Questions</h2>
              <p className="section-sub">Can't find what you're looking for? We're always happy to help.</p>
              <a className="btn btn-primary" href="#" style={{ marginTop: '28px' }}>
                View All FAQs
              </a>
            </div>
            <div className="faq-list fade-up fade-up-delay-1">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
                  <div className="faq-q" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </div>
                  <div className="faq-a">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner fade-up">
            <span className="section-label" style={{ justifyContent: 'center' }}>
              Ready to Sell?
            </span>
            <h2 className="section-heading">
              Get the Best Price for
              <br />
              <em className="gold-shimmer">Your Gold Today</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Join 500+ happy customers across Odisha. Book a free home visit or walk into your nearest branch.
            </p>
            <div className="cta-actions">
              <a
                href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <span className="w-5 h-5 inline-flex">
                  <WhatsAppIcon />
                </span>
                Book Free Visit on WhatsApp
              </a>
              <a href="tel:+918260242477" className="btn btn-outline btn-lg">
                Call +91 82602 42477
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h4>
                Gold<span className="text-[#d4a843]">Grahak</span>
              </h4>
              <p className="text-sm leading-relaxed mb-4">
                Odisha's most trusted doorstep gold buying service. Certified experts, transparent rates, and instant payment — all at your convenience.
              </p>
              <p className="text-sm">📞 +91 82602 42477</p>
              <p className="text-sm">📧 info@goldgrahak.com</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <a href="#">Home</a>
              <a href="#how">How It Works</a>
              <a href="#branches">Branches</a>
              <a href="#calc">Gold Calculator</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h4>Services</h4>
              <a href="#">Doorstep Gold Sale</a>
              <a href="#">Branch Visit</a>
              <a href="#">Gold Valuation</a>
              <a href="#">Refer & Earn</a>
            </div>
            <div>
              <h4>Cities</h4>
              <a href="#">Bhubaneswar</a>
              <a href="#">Cuttack</a>
              <a href="#">Jajpur</a>
              <a href="#">More coming soon...</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Gold Grahak. All rights reserved. | Odisha's #1 Doorstep Gold Buyer</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
      >
        <span className="wa-tooltip">Chat with us on WhatsApp</span>
        <span className="wa-btn">
          <WhatsAppIcon />
        </span>
      </a>

      {/* MOBILE CTA BAR */}
      <div className="mobile-cta-bar">
        <div className="bar-inner">
          <a href="tel:+918260242477" className="bar-cta call">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.6 19.79 19.79 0 01.1 2.08 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"></path>
            </svg>
            Call Now
          </a>
          <a
            href="https://wa.me/918260242477?text=Hi!%20I%20want%20to%20sell%20my%20gold.%20Please%20contact%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="bar-cta whatsapp"
          >
            <span className="w-[18px] h-[18px] inline-flex">
              <WhatsAppIcon />
            </span>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
