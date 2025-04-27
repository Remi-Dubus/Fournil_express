export default function BurgerButton({
	handleClickMenu,
	openMenu,
}: {
	handleClickMenu: React.MouseEventHandler<HTMLButtonElement>;
	openMenu: boolean;
}) {
	return (
		<button
			onClick={handleClickMenu}
			type="button"
			className="relative group xl:hidden"
		>
			<div className="ml-4 mt-4 relative flex overflow-hidden items-center justify-center rounded-2xl w-[50px] h-[50px] bg-light lg:h-24 lg:w-24 xl:w-[50px] xl:h-[50px]">
				<div className="flex flex-col justify-between w-[20px] h-[20px]  origin-center overflow-hidden lg:w-12 xl:w-[20px] xl:h-[20px] ">
					<div
						className={`bg-dark h-[2px] w-7 lg:w-12 xl:h-[2px] ${openMenu ? "transform transition-all duration-300 origin-left group-focus:rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:rotate[42deg]"}  `}
					/>
					<div
						className={`bg-dark h-[2px] w-7 lg:w-12 xl:h-[2px] ${openMenu ? " rounded transform transition-all duration-300 group-focus:-translate-x-10 lg:group-focus:-translate-x-20 xl:group-focus:-translate-x-20" : "transform transition-all duration-300 group-focus:-translate-x10"} `}
					/>
					<div
						className={` bg-dark h-[2px] w-7 lg:w-12 xl:h-[2px] ${openMenu ? "transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]" : "transform transition-all duration-300 origin-left group-focus:-rotate[42deg]"} `}
					/>
				</div>
			</div>
		</button>
	);
}
