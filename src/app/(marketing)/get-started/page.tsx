"use client";

import React from "react";

import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  IdentificationIcon,
  LinkIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import SignupButton from "@/components/onchainKit/SignupButton";
import {} from "@coinbase/onchainkit/wallet";

const GetStartedPage = () => {
  const benefits = [
    {
      icon: IdentificationIcon,
      text: "Unique digital identity on the Base blockchain",
    },
    {
      icon: LinkIcon,
      text: "Easy-to-remember alternative to long wallet addresses",
    },
    {
      icon: ShieldCheckIcon,
      text: "Seamless integration with Futureproof and other Base ecosystem apps",
    },
    {
      icon: LockClosedIcon,
      text: "Enhanced security and ownership of your digital identity",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl mb-4">
            Get Started with Futureproof
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl max-w-3xl mx-auto mb-8">
            Secure your financial future with blockchain-powered savings
          </p>
          <div className="bg-card shadow-lg rounded-lg p-6 inline-block">
            <p className="text-lg text-card-foreground mb-4">
              Connect your wallet to check for a Base name or get redirected to
              create one
            </p>
            <SignupButton />
          </div>
        </div>

        <div className="bg-card shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">
              Why You Need a Base Name
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-card-foreground">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 bg-muted">
            <Link
              href="https://docs.base.org/docs/tools/basenames-faq/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              Learn more about Base names and the Base ecosystem
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
