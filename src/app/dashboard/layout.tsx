import NavBar from "@/components/navbar/NavBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className=' mx-auto bg-app-primary'>
			<NavBar />
			{children}
		</div>
	);
}
export default DashboardLayout;
