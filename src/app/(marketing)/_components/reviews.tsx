"use client";

import Image from "next/image";
import { useRef, useEffect, Fragment } from "react";
import TopText from "./top-text";
const topReviews = [
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "This platform revolutionized our workflow. The efficiency gains are remarkable, and our team productivity has soared!",
		name: "Alex Johnson",
		role: "Operations Director",
	},
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "The intuitive interface and powerful features have made our data management a breeze. It's a game-changer for our analytics team.",
		name: "Samantha Lee",
		role: "Data Scientist",
	},
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "Customer support is unparalleled. Any issues we've had were resolved quickly, allowing us to focus on our core business.",
		name: "Michael Chen",
		role: "IT Manager",
	},
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "The customization options are extensive. We've been able to tailor the platform to fit our unique business needs perfectly.",
		name: "Rachel Patel",
		role: "Product Owner",
	},
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "Implementing this solution has significantly reduced our operational costs. The ROI has exceeded our expectations.",
		name: "David Rodriguez",
		role: "CFO",
	},
	{
		logo: "/placeholder.svg?height=40&width=120",
		quote: "The analytics and reporting features have given us invaluable insights into our business performance. Highly recommended!",
		name: "Emma Thompson",
		role: "Business Analyst",
	},
];
interface CustomerReviewProps {
	quote: string;
	name: string;
	src: string;
	role: string;
}

interface InfiniteScrollTestimonialsProps {
	testimonials: Omit<CustomerReviewProps, "src">[];
	direction?: "left" | "right";
}

const CustomerReview: React.FC<CustomerReviewProps> = ({
	quote,
	name,
	role,
	src,
}) => (
	<article className='relative bg-gray-800 rounded-2xl p-6 mx-4 w-[22rem] h-[14rem] flex-shrink-0 testimonial-card'>
		<p className='mb-4'>{quote}</p>
		<div className='flex items-center gap-3 absolute left-6 bottom-6'>
			<span className='w-[3rem] h-[3rem] block '>
				<Image
					src={src}
					alt={src}
					width={1}
					height={1}
					sizes='100%'
					className=' rounded-full bg-gray-600 mr-3 object-cover border w-full h-full grayscale'
				/>
			</span>
			<div>
				<p className='font-semibold'>{name}</p>
				<p className='text-sm text-gray-400 italic'>{role}</p>
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
							src={`/images/review-${index + 1}.jpg`}
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
		<section className='bg-gray-900 text-white py-16 overflow-hidden'>
			<TopText title='Reviews' />
			<h1 className='text-[2.7rem] font-manrope text-center  font-semibold text-slate-300 '>
				Our Customers Love Us
			</h1>
			<p className='text-center mb-12'>
				See how our SAAS solution has boosted businesses success.
			</p>
			<div className='relative py-12'>
				<div className='gradient-inner-shadow top-0  absolute h-full left-1/2 w-[120%] -translate-x-1/2  z-10 rounded-3xl' />
				<InfiniteScrollTestimonials testimonials={topReviews} />
				<div className='my-8' />
				<InfiniteScrollTestimonials
					testimonials={topReviews.reverse()}
					direction='right'
				/>
			</div>
			<style jsx>
				{`
					.gradient-inner-shadow {
						background-image: linear-gradient(
							to right,
							#111827 0%,
							transparent 30%,
							transparent 65%,
							#111827 100%
						);
					}
				`}
			</style>
		</section>
	);
};

export default Review;
