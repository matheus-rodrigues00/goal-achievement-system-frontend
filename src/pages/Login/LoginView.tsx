/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import SubmitButton, { BtnStates } from 'components/Button/SubmitButton';
import TextInput from 'components/Input/TextInput';
import { Link } from 'react-router-dom';
import Path from 'utils/path';
import { IFormState, Action } from 'pages/Login/LoginContainer';
import BaseTemplate from 'components/BaseTemplate';
import AuthLayout from 'components/AuthLayout';

interface Props {
	onSubmit: (event: React.SyntheticEvent) => void;
	formState: IFormState;
	formDispatch: React.Dispatch<Action>;
	error: string;
}

function LoginView({ error, onSubmit, formState, formDispatch }: Props) {
	const getBtnState = (): BtnStates => {
		const { email, password } = formState;
		if (!email.trim() || !password.trim()) return 'inactive';

		return 'active';
	};
	return (
		<BaseTemplate>
			<AuthLayout>
				<form onSubmit={onSubmit} className="pc:w-[585px] pc:h-full flex flex-col items-start justify-end">
					<h1 className="text-[20px] font-[800] pc:text-[36px]  pc:my-[76px]">로그인</h1>

					<TextInput
						label="이메일"
						isRequired={false}
						placeholder="이메일 주소"
						value={formState.email}
						onChange={(curVar: string) => formDispatch({ type: 'email', payload: curVar })}
					/>

					<TextInput
						isPassword
						label="비밀번호"
						isRequired={false}
						placeholder="비밀번호"
						value={formState.password}
						onChange={(curVar: string) => formDispatch({ type: 'password', payload: curVar })}
					/>
					<div className="w-0 h-0 invisible pc:visible pc:w-full  pc:mt-[100px] pc:flex pc:justify-between ">
						<span className="text-[20px] font-semibold text-primaryGray-200">비밀번호를 잊으셨나요?</span>
						<span className="text-[20px] font-semibold text-primaryOrange-200">
							회원이 아직 아니신가요? <Link to={Path.signUp}>회원가입</Link>
						</span>
					</div>
					<div className="mt-[17px]">
						<span className={` ${error ? 'text-red-400' : 'text-white'}`}>{error || 'errorZone'}</span>
					</div>

					<SubmitButton label="로그인" btnState={getBtnState()} />
					<div className="visible w-full space-y-[16px] items-center  mt-[60px] flex flex-col pc:mt-0 pc:w-0 pc:h-0 pc:invisible  ">
						<span className="text-[12px]  text-primaryOrange-200">
							회원이 아직 아니신가요? <Link to={Path.signUp}>회원가입</Link>
						</span>
						<span className="text-[12px]  text-primaryGray-200">비밀번호를 잊으셨나요?</span>
					</div>
				</form>
			</AuthLayout>
		</BaseTemplate>
	);
}

export default LoginView;
