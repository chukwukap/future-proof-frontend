"use client";

import React, { useState } from "react";
// import { useTheme } from "next-themes";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const faqs = [
  {
    question: "What is Futureproof?",
    answer:
      "Futureproof is an innovative blockchain-based savings app designed for the Nigerian market. It combines traditional savings concepts with cryptocurrency and blockchain technology, offering users a secure, flexible, and rewarding platform to save and grow their money.",
  },
  {
    question: "How does Futureproof ensure the security of my funds?",
    answer:
      "Futureproof uses blockchain technology to secure your funds. We also implement industry-standard security measures such as encryption and multi-factor authentication to protect your account.",
  },
  {
    question: "What cryptocurrencies does Futureproof support?",
    answer:
      "Currently, Futureproof supports USDC, EURC, and cbBTC (Bitcoin on Base blockchain). We're always looking to add more options based on user demand and market conditions.",
  },
  {
    question: "How do I earn interest on my savings?",
    answer:
      "Your savings in Futureproof automatically earn interest through various DeFi protocols. The interest rates may vary depending on market conditions and the specific cryptocurrency you're saving in.",
  },
  {
    question: "Can I withdraw my funds at any time?",
    answer:
      "Yes, you can withdraw your funds at any time. However, please note that there might be a small processing fee for withdrawals, and the time to receive your funds may vary depending on the withdrawal method and the cryptocurrency you're withdrawing.",
  },
];

const HelpPage = () => {
  //   const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-card-foreground mb-8">
        Help Center
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="text-lg font-medium text-card-foreground">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 text-primary transition-transform duration-200 ${
                        openFaq === index ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Contact Support
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 rounded-md bg-muted text-card-foreground border border-border"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
