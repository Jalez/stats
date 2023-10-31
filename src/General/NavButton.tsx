/** @format */

interface NavButtonProps {
	to: string;
	isActive: boolean;
	handleClick: (to: string) => void;
	children: React.ReactNode;
}

const NavButton = ({ to, isActive, handleClick, children }: NavButtonProps) => {
	return (
		<li className='nav-item' role='presentation'>
			<button
				className={isActive ? 'nav-link active' : 'nav-link'}
				id={to + '-tab'}
				type='button'
				role='tab'
				onClick={() => handleClick(to)}
				aria-controls='testing'
				aria-selected='true'>
				{children}
			</button>
		</li>
	);
};

export default NavButton;
