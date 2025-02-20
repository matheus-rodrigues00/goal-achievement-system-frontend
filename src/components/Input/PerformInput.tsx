import React, { useEffect, useState } from 'react';
import { isEmail } from '@teteu/utils';
import { confirmOverlapEmail } from 'api/memberAPI';
import { validatePassword } from '../../utils/common';

enum Color {
	primaryBlack100 = 'primaryBlack-100',
	primaryBlack400 = 'primaryBlack-400',
	primaryOrange100 = 'primaryOrange-100',
	primaryOrange200 = 'primaryOrange-200',
	buttonOrange200 = 'buttonOrange-200',
	buttonBlack100 = 'buttonBlack-100',
	borderGray = 'borderGray',
}

interface Props {
	type: string;
	placeholder: string;
	label?: string;
	isRequired?: boolean;
	buttonTitle?: string;
	subButtonTitle?: string;
	value?: string;
	disabled?: boolean;
	onClick?: (type: string, value: string) => void;
	onChange: (curVar: string) => void;
}

export default function PerformInput({
	type,
	placeholder,
	label,
	isRequired = false,
	buttonTitle,
	subButtonTitle,
	value,
	disabled,
	onClick,
	onChange,
}: Props) {
	const [isConfirm, setIsConfirm] = useState<boolean>(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [isOpenGuide, setIsOpenGuide] = useState<boolean>(false);

	useEffect(() => {
		if (!value || isCorrect === null) {
			setIsOpenGuide(false);
			return;
		}

		setIsOpenGuide(true);
	}, [value, isCorrect]);

	const getFocusColor = () => {
		if (isCorrect === null) return '';
		if (!value || (type !== 'email' && type !== 'password')) return 'focus:border-primaryOrange-200';

		return isCorrect === false
			? 'focus:border-buttonOrange-200 focus:text-buttonOrange-200'
			: 'focus:border-primaryOrange-200 focus:text-primaryOrange-200';
	};

	const getButtonColor = (): string => {
		return isConfirm
			? `text-${Color.primaryOrange200} bg-${Color.primaryOrange100}`
			: `text-${Color.primaryBlack400} bg-${Color.buttonBlack100}`;
	};

	const getGuideColor = () => {
		return isCorrect ? 'text-primaryOrange-200' : 'text-buttonOrange-200';
	};

	// input 타입에 따라 다른 메세지를 반환
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

	// 이메일의 경우 이메일 중복검사를 추가로 실행
	// 이메일이 아닌 경우에는 props로 전단받은 onClick(type, value) 함수를 실행
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (isCorrect === false) return;
		if (type === 'email') {
			const confirmResult = await confirmOverlapEmail(value);
			if (confirmResult) setIsConfirm(true);
		}
		// type, value 인자로 받아 함수내부의 동작을 수행한다.
		if (onClick && value) onClick(type, value);
		setIsConfirm(true);
	};

	// formState를 변경 유효성검사 진행
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e?.currentTarget.value);

		if (type === 'email') setIsCorrect(isEmail(e?.currentTarget.value));
		if (type === 'password') setIsCorrect(validatePassword(e?.currentTarget.value));

		setIsConfirm(false);
	};

	// isOpenGuid 만을 핸들링한다
	const handleFocus = () => {
		if (!value) {
			setIsOpenGuide(false);
			return;
		}
		if (type === 'email' || type === 'password') {
			setIsOpenGuide(true);
		}
	};

	const handleBlur = () => {
		setIsOpenGuide(false);
	};

	return (
		<div className="w-full email-input-wrap">
			{label && (
				<div className="flex pc:space-x-[8px] space-x-[4px] pc:mb-[10px] mb-[8px] ">
					<label htmlFor={label} className="font-semibold pc:text-[20px] text-[14px]">
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
					className={`w-full pc:p-[24px] p-[16px] pc:max-h-[95px] max-h-[46px] pc:border-[2px] border-[1px] rounded-xl focus:outline-none ${getFocusColor()}
					`}
					value={value}
					disabled={disabled}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{buttonTitle && (
					<button
						type="button"
						className={`absolute pc:min-w-[86px] pc:min-h-[42px] min-h-[30px] max-h-[30px] pc:text-[16px] text-[12px]  pc:py-[12px] pc:px-[14px] px-[8px] py-[6px] rounded-lg line-h leading-none right-[12px] top-1/2 -translate-y-1/2 ${getButtonColor()}`}
						onClick={handleClick}
					>
						{isConfirm ? `${subButtonTitle || buttonTitle}` : `${buttonTitle}`}
					</button>
				)}
			</div>
			{isOpenGuide && isCorrect !== null && <p className={`pc:pt-3 pt-2 ${getGuideColor()}`}>{renderGuideMessage()}</p>}
		</div>
	);
}
