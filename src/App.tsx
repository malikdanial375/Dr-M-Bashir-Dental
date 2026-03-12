import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Quote
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Wait for the menu closing animation to complete before scrolling
    // to avoid layout shifts interfering with the scroll target
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Height of the fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 350);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-medical-dark">
              Dr M Bashir <span className="text-medical-blue">Dental</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-medical-blue hover:scale-105 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#book"
              className="bg-medical-blue text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-medical-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              Book Appointment
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.href)}
                  className="block px-4 py-4 text-base font-semibold text-slate-700 hover:text-medical-blue hover:bg-medical-light rounded-xl transition-all active:bg-medical-light/50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#book"
                onClick={(e) => handleMobileLinkClick(e, '#book')}
                className="block w-full text-center bg-medical-blue text-white px-6 py-4 rounded-xl text-base font-bold mt-4 shadow-lg active:scale-95 transition-all"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden mt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070"
          alt="Dr M Bashir Dental Clinic Banner"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/dental-clinic/1920/1080";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-dark/90 via-medical-dark/60 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-medical-blue/30 text-medical-blue text-xs font-bold uppercase tracking-wider mb-8">
              <Sparkles size={14} />
              Trusted Dental Care in Bedhar
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
              Your Smile is Our <span className="text-medical-blue">Priority.</span>
            </h1>
            <p className="text-xl text-slate-200 mb-12 leading-relaxed max-w-xl">
              Experience world-class dental care with Dr M Bashir. We combine advanced technology with a gentle touch to give you the perfect smile you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 bg-medical-blue text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-medical-blue transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]"
              >
                Book Appointment
                <ChevronRight size={20} />
              </a>
              <a
                href="https://wa.me/923219484065"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
            
            <div className="mt-16 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-14 h-14 rounded-full border-4 border-medical-dark/50 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-sm font-bold text-white tracking-wide">5.0 Rating (500+ Happy Patients)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Experience Badge */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-12 right-12 z-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/20 shadow-2xl">
          <div className="text-5xl font-bold text-white mb-1">10+</div>
          <div className="text-xs font-bold text-medical-blue uppercase tracking-widest">Years Experience</div>
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'Teeth Cleaning', desc: 'Professional scaling and polishing for a fresh, healthy mouth.', icon: <Sparkles /> },
    { title: 'Teeth Whitening', desc: 'Brighten your smile with our advanced whitening treatments.', icon: <Sparkles /> },
    { title: 'Dental Fillings', desc: 'High-quality aesthetic fillings to restore damaged teeth.', icon: <ShieldCheck /> },
    { title: 'Root Canal Treatment', desc: 'Painless procedures to save your natural teeth.', icon: <Stethoscope /> },
    { title: 'Braces & Aligners', desc: 'Straighten your teeth with modern orthodontic solutions.', icon: <CheckCircle2 /> },
    { title: 'Tooth Extraction', desc: 'Safe and gentle removal of problematic teeth.', icon: <X /> },
    { title: 'Dental Checkup', desc: 'Comprehensive examinations to maintain oral health.', icon: <Calendar /> },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-medical-blue font-bold uppercase tracking-widest text-sm mb-4">Our Expertise</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-medical-dark mb-6">Comprehensive Dental Services</h3>
          <p className="text-slate-600 text-lg">
            We offer a wide range of dental treatments tailored to your specific needs, ensuring the best results for your oral health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default"
            >
              <div className="w-14 h-14 bg-medical-light text-medical-blue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-medical-blue group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                {React.cloneElement(service.icon as React.ReactElement, { size: 28 })}
              </div>
              <h4 className="text-xl font-bold text-medical-dark mb-3">{service.title}</h4>
              <p className="text-slate-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { src: 'https://image2url.com/r2/default/images/1773250736183-ea25627a-e0b0-4c60-b255-d9c64b928e6c.webp', alt: 'Clinic Treatment Area' },
    { src: 'https://image2url.com/r2/default/images/1773250796515-a26ab171-a0f0-4d1e-8e32-35f1a23d3c7a.webp', alt: 'Clinic Signage' },
    { src: 'https://image2url.com/r2/default/images/1773250863807-ef12226a-2e49-4d3f-92f5-301be43b2d64.webp', alt: 'Clinic Entrance' },
    { src: 'https://image2url.com/r2/default/images/1773250888238-dcee2790-7708-4b97-ae54-b1557e22fb23.webp', alt: 'Medical Supplies' },
    { src: 'https://image2url.com/r2/default/images/1773250915844-61d4221c-7708-46c7-b01b-2cb2ca6fec38.webp', alt: 'Sterilization Process' },
    { src: 'https://image2url.com/r2/default/images/1773250941214-18cd3dc6-4933-4bf1-b683-fb2e1f0d0f42.webp', alt: 'Clinic Hallway' },
    { src: 'https://image2url.com/r2/default/images/1773250968868-21e2fa39-934d-403b-b159-92926f347e45.webp', alt: 'Dental Equipment' },
    { src: 'https://image2url.com/r2/default/images/1773251001885-0c93dd9e-f7f1-4500-b9d9-a7b52c9198ac.webp', alt: 'Waiting Area' },
    { src: 'https://user4227.na.imgto.link/public/20260311/unnamed-3.avif', alt: 'Treatment Room' },
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-medical-blue font-bold uppercase tracking-widest text-sm mb-4">Gallery</h2>
            <h3 className="text-4xl lg:text-5xl font-bold text-medical-dark">Our Clinic & Happy Smiles</h3>
          </div>
          <p className="text-slate-500 max-w-sm">
            Take a look at our modern facility and the beautiful results we've achieved for our patients in Bedhar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium text-sm">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-medical-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-medical-blue font-bold uppercase tracking-widest text-sm mb-4">About the Clinic</h2>
            <h3 className="text-4xl lg:text-5xl font-bold mb-8">Dr M Bashir Dental Clinic</h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Located in the heart of Bedhar, Pakistan, our clinic is led by Dr M Bashir, a dedicated professional committed to providing the highest quality dental care. We pride ourselves on our state-of-the-art facilities and a patient-centric approach that ensures comfort and excellence in every treatment.
            </p>
            <div className="space-y-4">
              {[
                'Modern Sterilization Standards',
                'Advanced Dental Technology',
                'Experienced Medical Staff',
                'Comfortable Patient Environment'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-medical-blue flex items-center justify-center text-white">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden border-8 border-white/10 shadow-2xl aspect-square">
              <img
                src="https://user4227.na.imgto.link/public/20260311/unnamed-2.avif"
                alt="Dr M Bashir Dental Clinic Exterior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-medical-blue p-8 rounded-3xl shadow-2xl">
              <div className="text-4xl font-bold mb-1">5.0</div>
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Patient Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmad Raza",
      rating: 5,
      text: "Excellent service and very professional staff. Dr. Bashir is highly skilled and made me feel very comfortable during my treatment.",
      date: "2 months ago"
    },
    {
      name: "Fatima Bibi",
      rating: 5,
      text: "The clinic is very clean and modern. I had a painless root canal treatment. Truly the best dental care in the region.",
      date: "1 month ago"
    },
    {
      name: "Muhammad Ali",
      rating: 5,
      text: "Best dental clinic in Bedhar. Highly recommended for any dental issues. The staff is very polite and helpful.",
      date: "3 weeks ago"
    },
    {
      name: "Zoya Khan",
      rating: 5,
      text: "Very friendly environment and affordable prices. My teeth cleaning was perfect and the results are amazing!",
      date: "1 week ago"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-medical-blue font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
          <h3 className="text-4xl lg:text-5xl font-bold text-medical-dark mb-6">What Our Patients Say</h3>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We take pride in providing exceptional dental care. Here's what some of our valued patients have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-1 text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-medical-dark">{testimonial.name}</h4>
                  <p className="text-slate-400 text-xs">{testimonial.date}</p>
                </div>
                <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center text-medical-blue">
                  <Quote size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your request...' });

    try {
      // Send to Formspree
      const formspreeResponse = await fetch('https://formspree.io/f/mvzwrpjq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      // Also keep local backup if possible
      try {
        await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (localError) {
        console.error('Local backup failed:', localError);
      }

      if (formspreeResponse.ok) {
        setStatus({ type: 'success', message: 'Your appointment request has been sent successfully.' });
        setFormData({ name: '', phone: '', service: '', date: '', time: '', message: '' });
      } else {
        const data = await formspreeResponse.json();
        throw new Error(data.error || 'Something went wrong with Formspree');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Failed to send request. Please try again later or contact us via WhatsApp.' });
    }
  };

  return (
    <section id="book" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-16 bg-medical-blue text-white">
              <h2 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</h2>
              <h3 className="text-4xl lg:text-5xl font-bold mb-8">Book Your Appointment</h3>
              <p className="text-white/70 text-lg mb-12 leading-relaxed">
                Ready to transform your smile? Fill out the form or contact us directly via WhatsApp for a quick consultation.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Our Location</h4>
                    <p className="text-white/70">V5MM+VG7, Bedhar, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Call Us</h4>
                    <p className="text-white/70">+92 321 9484065</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Working Hours</h4>
                    <p className="text-white/70">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <a
                  href="https://wa.me/923219484065"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-medical-blue px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-xl mb-8"
                >
                  <MessageCircle size={24} />
                  Connect on WhatsApp
                </a>
              </div>

              {/* Interactive Map */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-white/20 h-64 shadow-inner">
                <iframe
                  src="https://maps.google.com/maps?q=V5MM%2BVG7%2C%20Bedhar%2C%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dr M Bashir Dental Clinic Location"
                ></iframe>
              </div>
            </div>

            <div className="p-8 lg:p-16">
              {status.type === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-medical-dark">Success!</h4>
                  <p className="text-slate-600 max-w-xs mx-auto">{status.message}</p>
                  <button 
                    onClick={() => setStatus({ type: 'idle', message: '' })}
                    className="text-medical-blue font-bold hover:underline"
                  >
                    Book another appointment
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status.type === 'error' && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                      {status.message}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                        placeholder="+92 321 9484065"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Service</label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                    >
                      <option value="">Choose a treatment...</option>
                      <option value="cleaning">Teeth Cleaning</option>
                      <option value="whitening">Teeth Whitening</option>
                      <option value="fillings">Dental Fillings</option>
                      <option value="root-canal">Root Canal Treatment</option>
                      <option value="braces">Braces & Aligners</option>
                      <option value="extraction">Tooth Extraction</option>
                      <option value="checkup">Dental Checkup</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Additional Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-4 focus:ring-medical-blue/10 outline-none transition-all resize-none"
                      placeholder="Tell us about your dental concerns..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="w-full bg-medical-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-medical-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.type === 'loading' ? 'Sending...' : 'Send Appointment Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center text-white">
                <Stethoscope size={24} />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-medical-dark">
                Dr M Bashir <span className="text-medical-blue">Dental</span>
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-xs">
              Providing professional and compassionate dental care to the community of Bedhar. Your smile is our mission.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-blue hover:text-white hover:scale-110 hover:-rotate-12 transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-blue hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-blue hover:text-white hover:scale-110 hover:-rotate-12 transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-medical-dark mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-medical-blue hover:translate-x-1 transition-all inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-medical-dark mb-6">Services</h4>
            <ul className="space-y-4">
              {['Teeth Cleaning', 'Teeth Whitening', 'Root Canal', 'Braces', 'Extraction'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-slate-500 hover:text-medical-blue hover:translate-x-1 transition-all inline-block">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-medical-dark mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500">
                <MapPin size={20} className="text-medical-blue shrink-0" />
                <span>V5MM+VG7, Bedhar, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Phone size={20} className="text-medical-blue shrink-0" />
                <span>+92 321 9484065</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Mail size={20} className="text-medical-blue shrink-0" />
                <span>info@drbashirdental.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Dr M Bashir Dental Clinic. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-400 text-sm hover:text-medical-blue">Privacy Policy</a>
            <a href="#" className="text-slate-400 text-sm hover:text-medical-blue">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Created By <span className="text-medical-blue">Malik Danial</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-medical-blue/20 selection:text-medical-blue">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      
      {/* Floating WhatsApp for mobile */}
      <a
        href="https://wa.me/923219484065"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-110 md:hidden"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
