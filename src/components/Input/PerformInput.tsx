import React, { useState, Dispatch, SetStateAction } from 'react';
import { validateEmail, validatePassword } from '../../utils/common';

interface Props {
	type: string;
	placeholder: string;
	label?: string;
	isRequired?: boolean;
	buttonTitle?: string;
	subButtonTitle?: string;
	value?: string;
	onClick?: () => void;
	// onChange: Dispatch<SetStateAction<string>>;
	onChange: (curVar: string) => void;
}

enum Color {
	primaryBlack100 = 'primaryBlack-100',
	primaryBlack400 = 'primaryBlack-400',
	primaryOrange100 = 'primaryOrange-100',
	primaryOrange200 = 'primaryOrange-200',
	buttonOrange200 = 'buttonOrange-200',
	buttonBlack100 = 'buttonBlack-100',
	borderGray = 'borderGray',
}

export default function PerformInput({
	type,
	placeholder,
	label,
	isRequired = false,
	buttonTitle,
	subButtonTitle,
	value,
	onClick,
	onChange,
}: Props) {
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [isOpenGuide, setIsOpenGuide] = useState<boolean>(false);

	const getFocusColor = () => {
		if (type !== 'email' && type !== 'password') {
			return 'focus:border-primaryOrange-200';
		}
		return isCorrect === null || isCorrect
			? 'focus:border-primaryOrange-200 focus:text-primaryOrange-200'
			: 'focus:border-buttonOrange-200 focus:text-buttonOrange-200';
	};

	const getButtonColor = (): string => {
		return isConfirm
			? `text-${Color.primaryOrange200} bg-${Color.primaryOrange100}`
			: `text-${Color.primaryBlack400} bg-${Color.buttonBlack100}`;
	};

	const getGuideColor = () => {
		return isCorrect ? 'text-primaryOrange-200' : 'text-buttonOrange-200';
	};

	const renderGuideMessage = () => {
		if (isCorrect === null) return '';
		if (type === 'email') {
			if (isCorrect) return '사용 가능한 이메일입니다.';
			return '잘못된 형식의 이메일입니다.';
		}
		if (type === 'password') {
			if (isCorrect) return '사용 가능한 비밀번호 입니다.';
			return '사용 불가능한 비밀번호 입니다.';
		}
		return '';
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (isConfirm || !isCorrect) return;
		setIsConfirm(!isConfirm);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e?.currentTarget.value);

		if (type === 'email') {
			setIsCorrect(validateEmail(e?.currentTarget.value));
		}
		if (type === 'password') {
			setIsCorrect(validatePassword(e?.currentTarget.value));
		}

		setIsConfirm(false);
	};

	const handleFocus = () => {
		if (type !== 'email' && type !== 'password') return;
		setIsOpenGuide(true);
	};

	const handleBlur = () => {
		setIsOpenGuide(false);
	};

	return (
		<div className="w-full email-input-wrap">
			{label && (
				<div className="flex pc:space-x-[8px] space-x-[4px] pc:mb-[10px] mb-[8px] ">
					<label htmlFor={label} className="font-semibold text-[20px]">
						{label}
					</label>
					{isRequired && <span className="font-semibold text-primaryOrange-200 ">*</span>}
				</div>
			)}
			<div className="relative w-full">
				<input
					id={label}
					type={type}
					placeholder={placeholder}
					className={`w-full p-[24px] border-2 rounded-xl focus:outline-none ${getFocusColor()}
					`}
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{buttonTitle && (
					<button
						type="button"
						className={`absolute pc:min-w-[86px] pc:min-h-[42px] py-[12px] px-[14px] rounded-xl right-[12px] top-1/2 -translate-y-1/2 ${getButtonColor()}`}
						onClick={handleClick}
					>
						{isConfirm ? `${subButtonTitle || buttonTitle}` : `${buttonTitle}`}
					</button>
				)}
			</div>
			{isOpenGuide && <p className={`p-3 ${getGuideColor()}`}>{renderGuideMessage()}</p>}
		</div>
	);
}
