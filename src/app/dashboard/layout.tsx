import NavBar from "@/components/navbar/NavBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
	console.log("enemy");
	return (
		<div className=' mx-auto h-screen bg-app-primary'>
			<NavBar />
			{children}
		</div>
	);
}
export default DashboardLayout;
