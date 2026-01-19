import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is MiNi Online Skills, and how does it work?",
    answer:
      "MiNi is a simplified learning site designed for children. It transforms educational content into engaging lessons across various subjects. The app adapts to each child's learning style, providing a personalized and interactive learning experience. Children explore lessons through fun, making the educational journey enjoyable and effective.",
  },
  {
    question: "Is MiNi Online Skills suitable for all age groups?",
    answer:
      "MiNi Online Skills is primarily designed for children in early childhood and primary school age groups, focusing on core developmental skills through age-appropriate content.",
  },
  {
    question: "How does MiNi Online Skills ensure my child's safety while using the app?",
    answer:
      "We prioritize safety with a moderated environment, no external advertisements, and strict data privacy protocols to ensure a secure learning space for every child.",
  },
  {
    question: "Can parents track their child's progress on MiNi Online Skills?",
    answer:
      "Yes, parents have access to a dedicated dashboard that provides real-time insights into their child's learning progress, completed lessons, and areas of improvement.",
  },
  {
    question: "Are there any costs associated with using MiNi Online Skills?",
    answer:
      "We offer various subscription plans tailored to different needs. You can start with a free trial to explore our features before choosing a plan that works for you.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Side: Title */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-gray-100 last:border-0 pb-4"
                >
                  <AccordionTrigger showIcon={false} className="flex items-center justify-between py-4 text-left hover:no-underline group">
                    <span className="text-xl font-semibold text-[#1a1a1a] pr-8 leading-snug">
                      {faq.question}
                    </span>
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#b23b3b] text-white shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180">
                      <Plus className="h-6 w-6 absolute transition-opacity duration-200 group-data-[state=open]:opacity-0" />
                      <Minus className="h-6 w-6 absolute transition-opacity duration-200 opacity-0 group-data-[state=open]:opacity-100" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-6">
                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;