/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Header from 'components/Header/Header';
import ModalSection from 'components/Modal/ModalSection';

interface TemplateProps {
	children: React.ReactNode;
}

export default function BaseTemplate({ children }: TemplateProps) {
	// const { isOpenModal } = useSelector((state: RootState) => state.modal);

	return (
		<div className="main pc:max-w-[1200px] mx-auto px-[20px] pb-[20px] pc:px-[0]">
			<Header />
			{children}
			<ModalSection />
		</div>
	);
}
