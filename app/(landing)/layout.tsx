const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
      <main className="h-full bg-[#000300] overflow-auto">
        <div >
          {children}
        </div>
      </main>
     );
}
   
export default LandingLayout;