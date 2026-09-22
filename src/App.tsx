import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Navigation,
  Send,
  Share2,
} from 'lucide-react';

const asset = (name: string) => `${import.meta.env.BASE_URL}reference-assets/${name}`;

type Person = {
  shortName: string;
  fullName: string;
  family: string;
  note: string;
  image: string;
};

const wedding = {
  groom: {
    shortName: 'Akhil',
    fullName: 'Akhil Raj',
    family: 'Son of Shri Rajeev T R & Smt Priya',
    note: 'With the blessings of his family, he begins a beautiful new chapter.',
    image: asset('groom.png'),
  } satisfies Person,
  bride: {
    shortName: 'Sabitha',
    fullName: 'Sabitha Murugesan',
    family: 'Daughter of Shri Murugesan V & Smt Rajamani',
    note: 'With the blessings of her family, she begins a beautiful new chapter.',
    image: asset('bride.png'),
  } satisfies Person,
  muhurtham: {
    date: '15',
    month: 'November 2026',
    label: 'Sunday · 7:45 AM — 8:45 AM',
    name: 'Guruvayur Temple',
    address: 'Guruvayur, Kerala',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Guruvayur+Temple%2C+Guruvayur%2C+Kerala',
  },
  reception: {
    date: '16',
    month: 'November 2026',
    label: 'Monday · 4:00 PM onwards',
    name: 'Saila Auditorium',
    address: 'Karuvatta P.O., Alappuzha, Kerala – 690517',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Saila+Auditorium%2C+Karuvatta%2C+Alappuzha%2C+Kerala',
  },
};

const petals = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 37) % 101}%`,
  size: `${8 + ((index * 7) % 9)}px`,
  delay: `${(index * 0.73) % 9}s`,
  duration: `${11 + ((index * 5) % 7)}s`,
  drift: `${-70 + ((index * 29) % 150)}px`,
  rotate: `${180 + ((index * 57) % 360)}deg`,
  color: index % 2 ? 'var(--gold)' : 'var(--rose-wine)',
}));

function Petals({ count = petals.length, burst = false }: { count?: number; burst?: boolean }) {
  return (
    <div className={`petals ${burst ? 'petals-burst' : ''}`} aria-hidden="true">
      {petals.slice(0, count).map((petal, index) => (
        <span
          key={index}
          className="petal"
          style={
            {
              left: petal.left,
              width: petal.size,
              height: `calc(${petal.size} * .62)`,
              background: petal.color,
              animationDelay: burst ? `${index * 0.08}s` : petal.delay,
              animationDuration: burst ? '3.8s' : petal.duration,
              '--petal-drift': petal.drift,
              '--petal-rotate': petal.rotate,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function AmbientBackground({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="ambient" aria-hidden="true" style={{ opacity: intensity }}>
      <div className="aurora aurora-left" />
      <div className="aurora aurora-right" />
      <div className="aurora aurora-bottom" />
      <div className="dot-grid" />
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children?: string }) {
  return (
    <div className="section-label">
      <span className="gold-rule" />
      {children ? <span>{children}</span> : <span className="spark">✦</span>}
      <span className="gold-rule" />
    </div>
  );
}

function CoupleCard({ person, role, flip = false }: { person: Person; role: string; flip?: boolean }) {
  return (
    <Reveal className="couple-card">
      <div className="couple-card-texture" />
      <div className="couple-card-inner">
        <div className="portrait">
          <img src={person.image} alt={person.fullName} loading="lazy" className={flip ? 'flip-x' : ''} />
        </div>
        <span className="eyebrow gold-text">{role}</span>
        <h3>{person.fullName}</h3>
        <p className="family-line">{person.family}</p>
        <span className="small-rule" />
        <p className="person-note">{person.note}</p>
      </div>
    </Reveal>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const section = ref.current;
      if (!section) return;
      const amount = Math.min(Math.max(window.scrollY / Math.max(section.offsetHeight, 1), 0), 1);
      setScrollProgress(amount);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section ref={ref} className="hero-section">
      <AmbientBackground />
      <div className="hero-overlay" />
      <Petals count={12} />
      <img
        src={asset('garland.png')}
        alt=""
        aria-hidden="true"
        className="hero-garland"
        style={{ transform: `translate(-50%, ${scrollProgress * 38}%)` }}
      />
      <div className="hero-light" style={{ transform: `translate(-50%, ${scrollProgress * 22}%)` }} />
      <div className="hero-copy" style={{ transform: `translateY(${scrollProgress * 80}px)`, opacity: 1 - scrollProgress * 1.7 }}>
<Reveal className="hero-label">
  Together with their families
</Reveal>   
    <h1 className="hero-title">
          <span>Akhil</span>
          <em>and</em>
          <span>Sabitha</span>
        </h1>
        <div className="rule-gold hero-rule" />
        <p className="hero-date">15 · 11 · 2026</p>
        <p className="hero-place">Guruvayur, Kerala</p>
      </div>
      <img
        src={asset('couple-hero-user.png')}
        alt="Watercolour illustration of the couple"
        className="hero-couple"
        style={{ transform: `translateY(${-scrollProgress * 18}px) scale(${1 + scrollProgress * 0.12})` }}
      />
      <div className="scroll-prompt" style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}>
        <span>Scroll</span>
        <ChevronDown size={16} strokeWidth={1.3} />
      </div>
    </section>
  );
}

function CoupleSection() {
  return (
    <section className="couple-section section-with-corners">
      <img className="corner corner-left" src={asset('floral-corner.png')} alt="" aria-hidden="true" loading="lazy" />
      <img className="corner corner-right" src={asset('floral-corner.png')} alt="" aria-hidden="true" loading="lazy" />
      <div className="narrow">
        <Reveal className="section-intro">
          <SectionLabel>The Couple</SectionLabel>
          <h2>Two hearts, one thread</h2>
          <p>With the blessings of their families, Akhil and Sabitha begin a lifetime of ordinary mornings made beautiful.</p>
        </Reveal>
        <div className="couple-stack">
          <CoupleCard person={wedding.groom} role="The Groom" />
          <div className="ampersand">and</div>
          <CoupleCard person={wedding.bride} role="The Bride" flip />
        </div>
      </div>
    </section>
  );
}

function useCountdown(target: string) {
  const [value, setValue] = useState(() => getCountdown(target));
  useEffect(() => {
    const timer = window.setInterval(() => setValue(getCountdown(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  return value;
}

function getCountdown(target: string) {
  const difference = Math.max(new Date(target).getTime() - Date.now(), 0);
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownSection() {
  const countdown = useCountdown('2026-11-15T07:45:00+05:30');
  const units = [
    ['Days', countdown.days],
    ['Hours', countdown.hours],
    ['Mins', countdown.minutes],
    ['Secs', countdown.seconds],
  ];
  return (
    <section className="countdown-section">
      <div className="countdown-texture" />
      <div className="countdown-wash" />
      <div className="narrow relative">
        <Reveal className="section-intro">
          <SectionLabel>Counting down</SectionLabel>
          <h2>
            Until we say <span className="script gold-foil">forever</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="countdown-grid">
          {units.map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <div className="countdown-number">{String(value).padStart(2, '0')}</div>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.2}>
          <p className="countdown-date">Sunday, 15 November 2026 · Guruvayur, Kerala</p>
        </Reveal>
      </div>
    </section>
  );
}

function addToCalendar() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Akhil and Sabitha//Wedding Invite//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:akhil-sabitha-muhurtham-20261115@wedding',
    'DTSTAMP:20260914T000000Z',
    'DTSTART;TZID=Asia/Kolkata:20261115T074500',
    'DTEND;TZID=Asia/Kolkata:20261115T084500',
    'SUMMARY:Sacred Muhurtham — Akhil Raj & Sabitha',
    'LOCATION:Guruvayur Temple, Guruvayur, Kerala',
    'DESCRIPTION:Sacred Muhurtham of Akhil Raj and Sabitha.',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:akhil-sabitha-reception-20261116@wedding',
    'DTSTAMP:20260914T000000Z',
    'DTSTART;TZID=Asia/Kolkata:20261116T160000',
    'SUMMARY:Wedding Reception — Akhil Raj & Sabitha ',
    'LOCATION:Saila Auditorium, Karuvatta P.O., Alappuzha, Kerala 690517',
    'DESCRIPTION:Wedding reception for Akhil Raj and Sabitha.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([lines], { type: 'text/calendar' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'akhil-sabitha-wedding.ics';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

function EventCard({
  event,
  featured = false,
}: {
  event: typeof wedding.muhurtham;
  featured?: boolean;
}) {
  return (
    <Reveal delay={featured ? 0.1 : 0.16} className={`event-card ${featured ? 'event-card-featured' : ''}`}>
      <div className="event-card-top">
        <span className={`event-eyebrow ${event === wedding.reception ? 'reception-eyebrow' : ''}`}>
  {event === wedding.reception ? 'Wedding Reception' : 'Save the date'}
</span>
        <strong>{event.date}</strong>
        <span className="event-month">{event.month}</span>
      </div>
      <div className="event-card-body">
        <div className="event-row">
          <span className="event-icon"><Clock3 size={16} /></span>
          <div><span className="event-label">Time</span><strong>{event.label}</strong></div>
        </div>
        <div className="event-row">
          <span className="event-icon"><MapPin size={16} /></span>
          <div><span className="event-label">Venue</span><strong>{event.name}</strong><small>{event.address}</small></div>
        </div>
        <a className="pill-button" href={event.mapUrl} target="_blank" rel="noreferrer">
          <Navigation size={15} /> Get directions <ExternalLink size={13} />
        </a>
      </div>
    </Reveal>
  );
}

function DetailsSection() {
  return (
    <section className="details-section">
      <div className="narrow">
        <Reveal className="section-intro">
          <SectionLabel>When &amp; Where</SectionLabel>
          <h2>The Muhurtham</h2>
        </Reveal>
        <EventCard event={wedding.muhurtham} featured />
        <EventCard event={wedding.reception} />
        <Reveal delay={0.2} className="calendar-action">
          <button className="gradient-button" onClick={addToCalendar} type="button">
            <CalendarDays size={16} /> Add both dates to calendar
          </button>
        </Reveal>
      </div>
    </section>
  );
}

type RSVPData = { name: string; attendance: string; events: string[]; guests: string; message: string };
const blankRSVP: RSVPData = { name: '', attendance: '', events: [], guests: '1', message: '' };

function RSVPSection() {
  const [form, setForm] = useState(blankRSVP);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const update = (key: keyof RSVPData, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  };
  const toggle = (eventName: string) => {
    setForm((current) => ({
      ...current,
      events: current.events.includes(eventName)
        ? current.events.filter((event) => event !== eventName)
        : [...current.events, eventName],
    }));
    setErrors((current) => ({ ...current, events: '' }));
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const next: Record<string, string> = {};

  if (!form.name.trim()) next.name = 'Please share your full name.';
  if (!form.attendance) next.attendance = 'Please choose an option.';
  if (!form.events.length) next.events = 'Please select at least one celebration.';
  if (!form.guests || Number(form.guests) < 1) {
    next.guests = 'Please enter a guest count.';
  }

  setErrors(next);

  if (Object.keys(next).length) return;

  try {
    await fetch(
      'https://script.google.com/macros/s/AKfycbyvCJxyB0KhU3Trpwycg9DpwEnFGzqivEAaEk8upioeeKaUPxcFkVBaQwoPqK-9k3Lb/exec',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: form.name,
          attendance: form.attendance,
          events: form.events.join(', '),
          guests: form.guests,
          message: form.message,
        }),
      }
    );

    setSubmitted(true);
  } catch (error) {
    console.error('RSVP submission failed:', error);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="narrow">
        <Reveal className="section-intro">
          <SectionLabel>RSVP</SectionLabel>
          <h2>Come bless our beginning</h2>
          <p>We would be honoured to celebrate these sacred days with you.</p>
        </Reveal>
        {submitted ? (
          <Reveal className="rsvp-success">
            <span className="success-icon"><Check size={24} /></span>
            <h3>Thank you, {form.name.split(' ')[0]}.</h3>
            <p>Your response has been received. We look forward to celebrating with you.</p>
            <button type="button" className="pill-button" onClick={() => { setSubmitted(false); setForm(blankRSVP); }}>Send another response</button>
          </Reveal>
        ) : (
          <form className="rsvp-card" onSubmit={submit} noValidate>
            <label>
              <span>Your full name <i>*</i></span>
              <input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="How shall we address you?" aria-invalid={Boolean(errors.name)} />
              {errors.name && <small className="form-error">{errors.name}</small>}
            </label>
            <fieldset>
              <legend>Will you join us? <i>*</i></legend>
              <div className="choice-grid">
                {['Joyfully accepts', 'Regretfully declines'].map((choice) => (
                  <label className={`choice ${form.attendance === choice ? 'selected' : ''}`} key={choice}>
                    <input type="radio" name="attendance" value={choice} checked={form.attendance === choice} onChange={(event) => update('attendance', event.target.value)} />
                    {choice}
                  </label>
                ))}
              </div>
              {errors.attendance && <small className="form-error">{errors.attendance}</small>}
            </fieldset>
            <fieldset>
              <legend>Which celebrations will you attend? <i>*</i></legend>
              <div className="choice-grid">
                {['Sacred Muhurtham · 15 November', 'Wedding Reception · 16 November'].map((name) => (
                  <label className={`choice ${form.events.includes(name) ? 'selected' : ''}`} key={name}>
                    <input type="checkbox" checked={form.events.includes(name)} onChange={() => toggle(name)} />
                    {name}
                  </label>
                ))}
              </div>
              {errors.events && <small className="form-error">{errors.events}</small>}
            </fieldset>
            <label className="guest-field">
              <span>Number of guests <i>*</i></span>
              <input type="number" min="1" max="20" value={form.guests} onChange={(event) => update('guests', event.target.value)} />
              {errors.guests && <small className="form-error">{errors.guests}</small>}
            </label>
            <label>
              <span>Blessings or a message <em>(optional)</em></span>
              <textarea rows={4} value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Leave a few words for Akhil & Sabitha..." />
            </label>
            <button className="gradient-button submit-button" type="submit"><Send size={15} /> Send RSVP</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  const [shareLabel, setShareLabel] = useState('Share invitation');
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Akhil Raj & Sabitha', text: 'Come bless our beginning.', url: window.location.href });
        setShareLabel('Shared');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareLabel('Link copied');
      }
    } catch {
      setShareLabel('Share invitation');
    }
    window.setTimeout(() => setShareLabel('Share invitation'), 2400);
  };
  return (
    <footer className="site-footer">
      <div className="footer-texture" />
      <AmbientBackground intensity={0.5} />
      <img className="footer-corner footer-corner-left" src={asset('floral-corner.png')} alt="" aria-hidden="true" loading="lazy" />
      <img className="footer-corner footer-corner-right" src={asset('floral-corner.png')} alt="" aria-hidden="true" loading="lazy" />
      <div className="narrow relative">
        <Reveal className="section-intro">
          <SectionLabel>With love</SectionLabel>
          <p style={{ color: '#ffffff', opacity: 1 }}>Come bless our beginning</p>
          <p style={{ color: '#ffffff', opacity: 1 }}>
  Your presence is the only gift we ask for. Bring your laughter, your appetite and your dancing shoes — we have saved a seat, and a story, for you.
</p>
        </Reveal>
        <Reveal delay={0.12} className="footer-signoff">
          <span className="rule-gold" />
          <p>{wedding.groom.shortName} <span className="script gold-text">&amp;</span> {wedding.bride.shortName}</p>
          <p style={{ color: '#ffffff', opacity: 1 }}>15 · 11 · 2026 </p>
        </Reveal>
        <div className="footer-links">
          
          <button type="button" onClick={share}><Share2 size={13} /> {shareLabel}</button>
        </div>
        <p className="made-with"><Heart size={12} fill="currentColor" /> Made with love for our people</p>
      </div>
    </footer>
  );
}

function OpeningOverlay({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1500);
  };
  return (
    <div className={`opening-overlay ${opening ? 'opening' : ''}`}>
      {[-1, 1].map((side) => (
        <div className={`curtain ${side < 0 ? 'curtain-left' : 'curtain-right'}`} key={side}>
          <AmbientBackground intensity={0.55} />
          <div className="curtain-texture" style={{ backgroundImage: `url(${asset('mandala-texture.jpg')})` }} />
          <div className="curtain-seam" />
        </div>
      ))}
      <Petals count={10} burst={opening} />
      {!opening && (
        <div className="seal-content">
          <span className="eyebrow gold-text">A wedding invitation</span>
          <h1><span>Akhil</span><span className="script gold-text">&amp;</span><span>Sabitha</span></h1>
          <span className="rule-gold seal-rule" />
          <button className="seal-button" type="button" onClick={open} aria-label="Open the invitation">
            <span className="seal-ring" />
            <span className="seal"><span>A<span className="script">&amp;</span>S</span></span>
          </button>
          <p>Tap the seal to open</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    document.body.style.overflow = open ? '' : 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
    <audio
  ref={audioRef}
  src="/music/wedding-song.mp3"
  loop
  preload="auto"
/>

{!open && (
  <OpeningOverlay
    onOpen={() => {
      setOpen(true);
      audioRef.current?.play();
    }}
  />
)}      {open && <div className="reading-progress" />}
      <main className={`page-content ${open ? 'is-open' : ''}`}>
        <Hero />
        <CoupleSection />
        <CountdownSection />
        <DetailsSection />
        <RSVPSection />
        <Footer />
      </main>
    </>
  );
}

export default App;