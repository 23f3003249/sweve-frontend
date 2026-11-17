"use client";

import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
} from "@/components/ui/custom/accordion";
import { motion, useReducedMotion } from "motion/react";

const ANIMATION_DURATION = 0.6;
const STAGGER_DELAY = 0.1;
const INITIAL_Y_OFFSET = 20;
const HOVER_SCALE = 1.01;
const TAP_SCALE = 0.99;

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqsAccordionProps = {
  faqs: FaqItem[];
  title?: string;
  description?: string;
};

export function FaqsAccordion({
  faqs,
  title,
  description,
}: FaqsAccordionProps) {
  const shouldReduceMotion = useReducedMotion();
  const firstQuestion = faqs[0]?.question;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-4xl px-6">
        {(title || description) && (
          <motion.div
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            className="mb-8 text-center"
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: INITIAL_Y_OFFSET }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: ANIMATION_DURATION }
            }
            viewport={{ once: true }}
            whileInView={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
          >
            {title && (
              <h2 className="mb-4 font-bold text-2xl text-foreground lg:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-foreground/70 text-base">
                {description}
              </p>
            )}
          </motion.div>
        )}

        <AccordionRoot
          className="space-y-4 divide-y-0 overflow-visible rounded-none border-0"
          defaultValue={firstQuestion}
        >
          {faqs.map((faq, index) => (
            <motion.div
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: INITIAL_Y_OFFSET }
              }
              key={faq.question}
              tabIndex={-1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                    delay: index * STAGGER_DELAY,
                    duration: ANIMATION_DURATION,
                  }
              }
              viewport={{ once: true }}
              whileHover={shouldReduceMotion ? {} : { scale: HOVER_SCALE }}
              whileInView={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              whileTap={shouldReduceMotion ? {} : { scale: TAP_SCALE }}
            >
              <AccordionItem
                className="overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-brand hover:shadow-lg"
                value={faq.question}
              >
                <AccordionHeader>
                  <AccordionTrigger className="p-6 text-left font-semibold text-foreground text-lg hover:bg-background/50">
                    {faq.question}
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionPanel className="text-base text-foreground/70">
                  <p className="-mx-4 -mb-4 px-6 pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionPanel>
              </AccordionItem>
            </motion.div>
          ))}
        </AccordionRoot>
      </div>
    </section>
  );
}

export default FaqsAccordion;
