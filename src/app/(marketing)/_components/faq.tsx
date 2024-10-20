"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import TopText from "./top-text";

const faqs = [
	{
		question: "What services does Arise offer?",
		answer:
			"Arise offers a range of web design and development services, including custom website creation, e-commerce solutions, and digital marketing strategies.",
	},
	{
		question: "Do you provide hosting services?",
		answer:
			"Yes, we offer reliable hosting services to ensure your website remains fast, secure, and always accessible.",
	},
	{
		question: "How long does a typical project take?",
		answer:
			"Project timelines vary depending on complexity, but most websites are completed within 6-8 weeks from start to finish.",
	},
	{
		question: "How do you handle revisions during the process?",
		answer:
			"We offer multiple revision rounds and maintain open communication throughout the project to ensure your satisfaction with the final product.",
	},
	{
		question: "Do you offer ongoing support after the website launch?",
		answer:
			"We provide ongoing support and maintenance packages to keep your website up-to-date and running smoothly.",
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleQuestion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className='min-h-screen  text-white py-12 px-4 sm:px-6 lg:px-8 relative z-10'>
			<div className='max-w-2xl mx-auto'>
				<TopText title='FAQ' />
				<h1 className='text-[1.7rem] md:text-[2.7rem]  font-manrope text-center  font-semibold text-slate-300 '>
					Answers to common questions
				</h1>
				<div className='grid grid-cols-1  gap-6 mt-8 '>
					{faqs.map((faq, index) => (
						<div
							key={index}
							className='bg-gray-800 rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-in-out border border-[#d8d7d746]'>
							<button
								className='w-full text-left p-6 focus:outline-none flex justify-between items-center'
								onClick={() => toggleQuestion(index)}>
								<span className='text-md md:text-lg text-gray-300 font-medium'>
									{faq.question}
								</span>
								{openIndex === index ? (
									<Minus className='flex-shrink-0 bg-[#dadada39] h-8 w-8 text-blue-500 rounded-full border border-[#d8d7d746] p-1' />
								) : (
									<Plus className='flex-shrink-0 bg-[#dadada39] h-8 w-8 text-blue-500 rounded-full border border-[#d8d7d746] p-1' />
								)}
							</button>
							{openIndex === index && (
								<div className='px-6 pb-6'>
									<p className='text-gray-300'>{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className='radial--glow h-[94%] w-[90%] absolute left-1/2 -bottom-[30%] rounded-full  -translate-x-1/2 -z-10 ' />
		</div>
	);
}
