function TopText(props: { title: string }) {
	return (
		<h2 className='text-gray-300 text-center flex items-center justify-center gap-1 rounded-lg px-4 py-2 w-fit mx-auto bg-slate-800'>
			{" "}
			<div className='w-3 h-3 bg-title-span block rounded-full text-sm' />
			{props.title}
		</h2>
	);
}
export default TopText;
