"use client";

import Image from "next/image";
import { useRef, useEffect, Fragment } from "react";
const topReviews = [
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	{
		logo: "logo.svg",
		quote: "I couldn't be happier with this platform. It streamlined our processes and saved us countless hours. Highly recommended!",
		name: "Emily Anderson",
		role: "Marketing Manager",
	},
	// Add more testimonials...
];

const bottomReviews = [
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	{
		logo: "logo.svg",
		quote: "I've tried other SAAS platforms, but none compare. It transformed our business operations, making us more efficient.",
		name: "Daniel Scott",
		role: "CEO",
	},
	// Add more testimonials...
];
interface CustomerReviewProps {
	logo: string;
	quote: string;
	name: string;
	role: string;
}

interface InfiniteScrollTestimonialsProps {
	testimonials: CustomerReviewProps[];
	direction?: "left" | "right";
}

const CustomerReview: React.FC<CustomerReviewProps> = ({
	logo,
	quote,
	name,
	role,
}) => (
	<article className='bg-gray-800 rounded-lg p-6 mx-4 w-80 flex-shrink-0 testimonial-card'>
		<Image
			src={logo}
			width={32}
			height={32}
			alt='Company logo'
		/>
		<p className='mb-4'>{quote}</p>
		<div className='flex items-center'>
			<div className='w-10 h-10 rounded-full bg-gray-600 mr-3'></div>
			<div>
				<p className='font-semibold'>{name}</p>
				<p className='text-sm text-gray-400'>{role}</p>
			</div>
		</div>
	</article>
);

const InfiniteScrollTestimonials: React.FC<InfiniteScrollTestimonialsProps> = ({
	testimonials,
	direction = "left",
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<Fragment>
			<div className='testimonial-slider'>
				<div
					ref={containerRef}
					className={`flex overflow-x-hidden testimonial-track`}>
					{testimonials.concat(testimonials).map((testimonial, index) => (
						<CustomerReview
							key={`${testimonial.name}-${index}`}
							{...testimonial}
						/>
					))}
				</div>
			</div>
			<style jsx>{`
				.testimonial-slider {
					overflow: hidden;
					width: 100%;
				}
				.testimonial-track {
					display: flex;
					animation: ${direction === "left" ? "slideleft" : "slideright"}
						60s linear infinite;
					width: calc(320px * ${testimonials.length * 2});
				}
				@keyframes slideleft {
					0% {
						transform: translateX(calc(-320px * ${testimonials.length}));
					}
					100% {
						transform: translateX(0);
					}
				}
				@keyframes slideright {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(calc(-320px * ${testimonials.length}));
					}
				}
			`}</style>
		</Fragment>
	);
};

const Review: React.FC = () => {
	return (
		<section className='bg-gray-900 text-white py-16'>
			<h2 className='text-blue-400 text-center mb-2'>Testimonials</h2>
			<h1 className='text-4xl font-bold text-center mb-4'>
				Real user experiences.
			</h1>
			<p className='text-center mb-12'>
				See how our SAAS solution has boosted businesses success.
			</p>
			<div className='relative py-12'>
				<div className='gradient-inner-shadow top-0  absolute h-full left-[0%] w-full  z-10' />
				<InfiniteScrollTestimonials testimonials={topReviews} />
				<div className='my-8' />
				<InfiniteScrollTestimonials
					testimonials={bottomReviews}
					direction='right'
				/>
			</div>
			<style jsx>
				{`
					.gradient-inner-shadow {
						background-image: linear-gradient(
							to right,
							rgba(0, 0, 0, 0.7) 0%,
							transparent 10%,
							transparent 87%,
							rgba(0, 0, 0, 0.7) 100%
						);
					}
				`}
			</style>
		</section>
	);
};

export default Review;
