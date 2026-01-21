import { Mail, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BranchCard = ({ image, title, address, isMain }: { image: string; title: string; address: string; isMain?: boolean }) => (
  <div className="relative group overflow-hidden aspect-4/5">
    <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
    <div className="absolute bottom-6 left-6 right-6 bg-white p-6 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      {isMain && <span className="text-[#CC0000] text-[10px] font-bold uppercase tracking-widest mb-1 block">Main Branche</span>}
      <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{title}</h3>
      <p className="text-gray-500 text-xs leading-relaxed">{address}</p>
    </div>
  </div>
);

const ContactPage = () => {
  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-20 lg:pt-32 overflow-hidden bg-[#fdf2f2]/30">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[60vh]">
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <span className="inline-block text-[#CC0000] text-sm font-bold uppercase tracking-widest">
                  Start the Conversation
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
                  Let’s build something <span className="text-[#CC0000]">amazing</span> together.
                </h1>
              </div>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Whether you have a question, a bold idea, or just want to say hi—our team is ready to listen. Reach out and we’ll get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="bg-[#CC0000] hover:bg-[#B30000] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-100">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  Drop us a line
                </Button>
                {/* <Button variant="outline" className="border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold flex items-center gap-2 transition-all active:scale-95">
                  Schedule a call
                </Button> */}
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5 h-full">
              <div className="relative w-full aspect-square">
                <Image 
                  src="/contact/contact-image.png" 
                  alt="Two people collaborating over a laptop" 
                  fill
                  className="object-cover"
                  priority
                />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Branches Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Our branches all over the country.
            </h2>
            <p className="text-gray-500 text-lg">
              Is the conventional education system really able to help your child build his career in a great way? – You know that very well, Right?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <BranchCard 
              isMain
              image="https://picsum.photos/600/800?city&random=1"
              title="Gulshan 2, Dhaka"
              address="1702 Gulshan Avenue, Dhaka"
            />
            <BranchCard 
              image="https://picsum.photos/600/800?city&random=2"
              title="Jashore, Khulna"
              address="501 Jashore sadar, Jashore"
            />
            <BranchCard 
              image="https://picsum.photos/600/800?city&random=3"
              title="Oxygen, Chittagong"
              address="472H Oxygen Road, Chittagong"
            />
            <BranchCard 
              image="https://picsum.photos/600/800?city&random=7"
              title="Newtown, Sylhet"
              address="35 East Newtown avenue, Sylhet"
            />
          </div>
        </div>
      </section>

      {/* 3. Contact Form & Details Section */}
      <section className="py-24 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-4xl font-bold text-[#1a1a1a] text-center mb-20">Contact Us</h2>
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left Details */}
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1a1a1a] leading-tight">
                  Will you be in Dhaka or any other branches any time soon? Stop by the office! We&apos;d love to meet.
                </h3>
              </div>

              <div className="space-y-10">
                <div className="flex gap-12">
                  <span className="text-[#CC0000] font-bold text-xs uppercase tracking-widest w-32 shrink-0">Address</span>
                  <p className="text-gray-600 font-medium">1702 Gulshan Avenue, Dhaka</p>
                </div>
                <div className="flex gap-12">
                  <span className="text-[#CC0000] font-bold text-xs uppercase tracking-widest w-32 shrink-0">Phone Number</span>
                  <div className="text-gray-600 font-medium space-y-1">
                    <p>(+88) 01961214040</p>
                    <p>01961214040</p>
                  </div>
                </div>
                <div className="flex gap-12">
                  <span className="text-[#CC0000] font-bold text-xs uppercase tracking-widest w-32 shrink-0">Email Address</span>
                  <div className="text-gray-600 font-medium space-y-1">
                    <p>minionlineskills@gmail.com</p>
                    <p>career.minionlineskills@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-10 shadow-2xl shadow-gray-100 space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-[#1a1a1a]">Get In touch</h4>
                  <p className="text-gray-400 text-sm">Feel free contact with us, we love to make new partners & friends</p>
                </div>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1a1a]">Full Name</label>
                    <Input placeholder="Full name..." className="h-14 bg-gray-50 border-none rounded-xl px-6 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1a1a]">Email</label>
                    <Input placeholder="Email Address" className="h-14 bg-gray-50 border-none rounded-xl px-6 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1a1a]">Subject</label>
                    <Input placeholder="Message Subject" className="h-14 bg-gray-50 border-none rounded-xl px-6 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1a1a1a]">Message</label>
                    <Textarea placeholder="Message Subject" className="min-h-37.5 bg-gray-50 border-none rounded-xl p-6 focus-visible:ring-1 focus-visible:ring-red-100" />
                  </div>
                  <Button className="w-full sm:w-auto bg-[#CC0000] hover:bg-[#B30000] text-white px-10 py-7 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-red-100">
                    Send Message
                    <Send className="w-5 h-5 rotate-45" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Google Map Section */}
      <section className="w-full h-125  ">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.58233450047!2d90.406048275895!3d23.79788288731551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70669c5853d%3A0x67139a03503f56e9!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1705750000000!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;