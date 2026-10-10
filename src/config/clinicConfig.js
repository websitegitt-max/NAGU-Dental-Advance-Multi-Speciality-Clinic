export const DEFAULT_CLINIC_CONFIG = {
  clinicName: "NAGU Dental Advance Multi Speciality Clinic",
  tagline: "Advanced Dental Care & Precision Smile Aesthetics",
  phone: "088619 32535",
  whatsapp: "918861932535",
  address: "Siddeshwara Medicals, 73/1, KTG College Rd, Hegganahalli, Bengaluru, Karnataka 560091",
  timing: "Mon - Sun: 9:00 AM - 10:00 PM",
  doctorName: "Dr. Nagendra & Specialist Team",
  doctorDesignation: "BDS, MDS - Advanced Prosthodontics & Oral Implantology",
  doctorExperience: "15+ Years Clinical Mastery",
  doctorBio: "Committed to gentle, precision dental care with zero-fear protocols. Specialized in painless single-visit root canals, computer-guided implant restorations, and microscopic aesthetics.",
  accentColor: "#0D9488",
};

export const CLINIC_GALLERY = [
  { id:1, title:"Ergonomic Operatory Suite", category:"Operatory Suite", img:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80", desc:"Computerized dental chair equipped with intraoral camera, gentle ultrasonic scaling, and ambient lighting to reduce patient anxiety." },
  { id:2, title:"Diagnostic 3D CBCT & OPG Center", category:"Diagnostic 3D CBCT", img:"https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80", desc:"Ultra-low-radiation panoramic digital imaging enabling sub-millimeter diagnostic precision for painless implant planning." },
  { id:3, title:"Class-B Autoclave Sterilization Bay", category:"Sterilization", img:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80", desc:"Hospital-grade 5-stage sterilization protocols with vacuum autoclaving and individually sealed single-use patient hygiene kits." },
  { id:4, title:"Aesthetic Treatment Lounge", category:"Consultation Lounge", img:"https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80", desc:"Spa-like, tranquil consultation rooms designed for relaxed case discussions, digital smile simulations, and family comfort." },
  { id:5, title:"Precision Micro-Surgical Dental Tools", category:"Micro-Instruments", img:"https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80", desc:"German engineered micro-endodontic rotary systems ensuring over 99% pain-free root canal completions in a single visit." },
  { id:6, title:"Cosmetic Veneers & Smile Studio", category:"Cosmetic Studio", img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", desc:"Dedicated chairside shade-matching and CAD/CAM ceramic veneer preview station for natural, glowing smile makeovers." }
];

export const TREATMENTS = [
  { id:"rct", title:"Single-Visit Painless Root Canal", category:"Endodontics", time:"45 Mins", comfort:"Painless Anesthesia", desc:"Microscopic rotary canal cleaning and bioceramic hermetic sealing to preserve natural teeth with zero discomfort.", points:["Computerized canal mapping","Preserves natural tooth structure","High-strength Zirconia crown options"] },
  { id:"implants", title:"Computer-Guided Dental Implants", category:"Implantology", time:"Single Sitting", comfort:"Gentle Sedation", desc:"Permanent titanium and zirconia roots anchored with 3D CBCT surgical guides for natural bite and lifelong stability.", points:["Lifetime manufacturer warranty","Natural appearance and chewing","Immediate load options available"] },
  { id:"aligners", title:"Invisible Clear Aligners", category:"Orthodontics", time:"6-12 Months", comfort:"Removable & Discreet", desc:"Virtually invisible, custom thermoformed aligners that align your bite smoothly without metal brackets or wires.", points:["Easy to clean & eat","No dietary restrictions","3D digital smile preview before start"] },
  { id:"whitening", title:"Laser Teeth Whitening", category:"Cosmetics", time:"40 Mins", comfort:"Instant 8 Shades", desc:"Philips Zoom medical cold-light whitening lifting years of deep tea, coffee, and age stains safely.", points:["Enamel-safe pH neutral gel","Zero enamel erosion","Includes home maintenance kit"] },
  { id:"pediatric", title:"Pediatric Gentle Dental Care", category:"Children", time:"30 Mins", comfort:"Fun & Fear-Free", desc:"Child-friendly pit & fissure sealing, fluoride varnish treatments, and gentle habit-breaking counseling for kids.", points:["Positive behavioral reinforcement","Painless cavity protection","Free bravery star badge"] },
  { id:"emergency", title:"Emergency Toothache Relief", category:"Urgent Care", time:"Priority Immediate", comfort:"Rapid Relief", desc:"Immediate relief for severe pulp inflammation, broken cusps, knocked-out teeth, or acute jaw swelling.", points:["Same-day emergency walk-ins","Immediate localized numbing","Dedicated trauma care protocol"] }
];
