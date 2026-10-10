import { useEffect, useMemo, useState } from "react";
import {
  Phone, MapPin, Clock, Calendar, Star, Menu, X, Plus, Trash2,
  MessageCircle, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, HeartPulse
} from "lucide-react";
import { DEFAULT_CLINIC_CONFIG, CLINIC_GALLERY, TREATMENTS } from "./config/clinicConfig";

const STORAGE_KEY = "nagu-dental-appointments";

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CLINIC_CONFIG);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [galleryFilter, setGalleryFilter] = useState("All");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setAppointments(JSON.parse(saved));
    } catch (e) {
      console.error("Unable to load saved appointments", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const galleryCategories = useMemo(
    () => ["All", ...Array.from(new Set(CLINIC_GALLERY.map((g) => g.category)))],
    []
  );

  const visibleGallery = useMemo(
    () => galleryFilter === "All" ? CLINIC_GALLERY : CLINIC_GALLERY.filter((g) => g.category === galleryFilter),
    [galleryFilter]
  );

  const whatsappLink = (message) =>
    `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;

  const addAppointment = (treatment) => {
    setAppointments((prev) => [
      ...prev,
      {
        id: `${treatment.id}-${Date.now()}`,
        treatmentId: treatment.id,
        title: treatment.title,
        category: treatment.category,
        time: treatment.time,
        bookedAt: new Date().toISOString()
      }
    ]);
    setDrawerOpen(true);
  };

  const cancelAppointment = (appointment) => {
    const message = `Hello ${config.clinicName}, I would like to cancel my appointment for "${appointment.title}". Booked on ${new Date(appointment.bookedAt).toLocaleString()}.`;
    window.open(whatsappLink(message), "_blank");
    setAppointments((prev) => prev.filter((item) => item.id !== appointment.id));
  };

  const navLinks = [
    ["Home", "#home"],
    ["Treatments", "#treatments"],
    ["Facilities", "#gallery"],
    ["Doctor", "#doctor"],
    ["Contact", "#contact"]
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-teal-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-600 text-white">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <p className="font-serif text-lg font-bold leading-tight text-teal-900">{config.clinicName}</p>
              <p className="text-xs text-slate-500">{config.tagline}</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-teal-700">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCustomizerOpen(true)}
              className="hidden rounded-full border border-teal-200 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 md:block"
            >
              Customize
            </button>
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative rounded-full bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              Appointments
              {appointments.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
                  {appointments.length}
                </span>
              )}
            </button>
            <button className="rounded-full p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-teal-100 bg-white px-4 py-3 lg:hidden">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2 font-semibold text-slate-700">
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">
                <ShieldCheck className="h-4 w-4" /> {config.doctorExperience}
              </span>
              <h1 className="mt-6 font-serif text-4xl font-extrabold leading-tight text-teal-900 sm:text-5xl lg:text-6xl">
                Advanced dental care with a gentle, precision-first approach
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                Painless single-visit root canals, computer-guided implants, clear aligners, and cosmetic smile transformations in Hegganahalli, Bengaluru.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#treatments" className="rounded-full bg-teal-600 px-6 py-3 font-bold text-white transition hover:bg-teal-700">
                  Explore Treatments
                </a>
                <a
                  href={whatsappLink(`Hello ${config.clinicName}, I would like to book a dental consultation.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-teal-600 px-6 py-3 font-bold text-teal-700 transition hover:bg-teal-50"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Booking
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: <Star className="h-5 w-5" />, label: "4.9 Patient Rating" },
                  { icon: <Sparkles className="h-5 w-5" />, label: "Digital Smile Design" },
                  { icon: <ShieldCheck className="h-5 w-5" />, label: "Sterile Protocols" }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-white p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-50 text-teal-700">{item.icon}</span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={CLINIC_GALLERY[0].img}
                alt="Modern dental clinic"
                className="h-full max-h-[520px] w-full rounded-[2rem] object-cover shadow-2xl"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-xl">
                <p className="font-bold text-teal-900">{config.doctorName}</p>
                <p className="text-sm text-slate-600">{config.doctorDesignation}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="treatments" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-teal-900 sm:text-4xl">Specialised Dental Treatments</h2>
            <p className="mt-4 text-slate-600">Choose a treatment to add it to your appointment bag. Our team will confirm your preferred time.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TREATMENTS.map((treatment) => (
              <article key={treatment.id} className="flex flex-col rounded-3xl border border-teal-100 bg-white p-6 shadow-sm transition hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
                    {treatment.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{treatment.time}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">{treatment.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{treatment.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {treatment.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-teal-600" />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => addAppointment(treatment)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
                >
                  <Plus className="h-4 w-4" /> Add to Appointment Bag
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="bg-teal-900 py-16 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold sm:text-4xl">Clinic Facilities</h2>
                <p className="mt-3 max-w-2xl text-teal-100">Advanced diagnostic, sterilization, and comfort infrastructure designed for safe and relaxed dental care.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {galleryCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setGalleryFilter(category)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      galleryFilter === category ? "bg-white text-teal-900" : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleGallery.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(index)}
                  className="group overflow-hidden rounded-3xl bg-white/5 text-left"
                >
                  <img src={item.img} alt={item.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-teal-200">{item.category}</p>
                    <h3 className="mt-2 font-serif text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-teal-100/80">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="doctor" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src={CLINIC_GALLERY[3].img}
              alt="Consultation lounge"
              className="h-96 w-full rounded-[2rem] object-cover shadow-xl"
            />
            <div>
              <h2 className="font-serif text-3xl font-bold text-teal-900 sm:text-4xl">Meet {config.doctorName}</h2>
              <p className="mt-3 font-semibold text-teal-700">{config.doctorDesignation}</p>
              <p className="mt-5 text-slate-600">{config.doctorBio}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-teal-100 bg-white p-5">
                  <p className="font-bold text-teal-900">Zero-Fear Dentistry</p>
                  <p className="mt-1 text-sm text-slate-600">Gentle anesthesia, clear explanations, and comfort-focused care.</p>
                </div>
                <div className="rounded-2xl border border-teal-100 bg-white p-5">
                  <p className="font-bold text-teal-900">Precision Technology</p>
                  <p className="mt-1 text-sm text-slate-600">Digital diagnostics and guided treatment planning.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-teal-100 bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3">
            {[
              { icon: <Phone className="h-6 w-6" />, title: "Call Us", value: config.phone },
              { icon: <MapPin className="h-6 w-6" />, title: "Visit Us", value: config.address },
              { icon: <Clock className="h-6 w-6" />, title: "Clinic Hours", value: config.timing }
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-teal-100 bg-teal-50/40 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-600 text-white">{item.icon}</span>
                <h3 className="mt-4 font-serif text-xl font-bold text-teal-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-teal-900 py-8 text-center text-teal-100">
        <p className="font-semibold">{config.clinicName}</p>
        <p className="mt-2 text-sm">{config.address}</p>
        <p className="mt-1 text-sm">{config.phone} • {config.timing}</p>
      </footer>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setDrawerOpen(false)}>
          <aside className="h-full w-full max-w-md overflow-y-auto bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-teal-900">Appointment Bag</h2>
              <button onClick={() => setDrawerOpen(false)} className="rounded-full p-2 hover:bg-slate-100"><X /></button>
            </div>

            {appointments.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-dashed border-teal-200 p-8 text-center">
                <Calendar className="mx-auto h-10 w-10 text-teal-600" />
                <p className="mt-4 font-bold text-teal-900">No appointments selected</p>
                <p className="mt-2 text-sm text-slate-600">Add a treatment to request a booking.</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-2xl border border-teal-100 p-4">
                    <p className="font-bold text-teal-900">{appointment.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{appointment.category} • {appointment.time}</p>
                    <p className="mt-1 text-xs text-slate-500">Added {new Date(appointment.bookedAt).toLocaleString()}</p>
                    <button
                      onClick={() => cancelAppointment(appointment)}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" /> Cancel & Notify WhatsApp
                    </button>
                  </div>
                ))}
              </div>
            )}

            <a
              href={whatsappLink(
                appointments.length
                  ? `Hello ${config.clinicName}, I would like to book these treatments: ${appointments.map((a) => a.title).join(", ")}.`
                  : `Hello ${config.clinicName}, I would like to book a dental consultation.`
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
            >
              <MessageCircle className="h-5 w-5" /> Confirm via WhatsApp
            </a>
          </aside>
        </div>
      )}

      {customizerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setCustomizerOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-teal-900">Clinic Customizer</h2>
              <button onClick={() => setCustomizerOpen(false)} className="rounded-full p-2 hover:bg-slate-100"><X /></button>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ["clinicName", "Clinic Name"],
                ["tagline", "Tagline"],
                ["phone", "Phone"],
                ["whatsapp", "WhatsApp Number"],
                ["address", "Address"],
                ["timing", "Timings"],
                ["doctorName", "Doctor Name"],
                ["doctorDesignation", "Doctor Designation"]
              ].map(([key, label]) => (
                <label key={key} className="block">
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                  <input
                    value={config[key]}
                    onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-teal-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightbox !== null && visibleGallery[lightbox] && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white" onClick={(e) => e.stopPropagation()}>
            <img src={visibleGallery[lightbox].img} alt={visibleGallery[lightbox].title} className="max-h-[65vh] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{visibleGallery[lightbox].category}</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-teal-900">{visibleGallery[lightbox].title}</h3>
              <p className="mt-2 text-slate-600">{visibleGallery[lightbox].desc}</p>
            </div>
            <button
              onClick={() => setLightbox((lightbox - 1 + visibleGallery.length) % visibleGallery.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setLightbox((lightbox + 1) % visibleGallery.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
            >
              <ChevronRight />
            </button>
            <button onClick={() => setLightbox(null)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2"><X /></button>
          </div>
        </div>
      )}
    </div>
  );
}
