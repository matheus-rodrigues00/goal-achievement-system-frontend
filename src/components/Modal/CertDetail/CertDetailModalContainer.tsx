import React, { useEffect } from 'react';
import { getDday } from 'utils/common';
import SubmitButton from 'components/Button/SubmitButton';
import FilterButton from 'components/Button/FilterButton';

// import { Goal } from 'types/goal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/slices';
import { successCertGoal, failCertGoal } from 'api/goalAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function CertDetailModalContainer() {
	// const goal = useSelector((state: RootState) => state.goal.goalList[index]);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		// if (!searchParams.get('goal')) re;
	}, [searchParams]);
	const className = {
		size: 'pc:w-[890px] max-w-[90vw] pc:max-h-[80vh] w-[320px] max-h-[424px]',
		translate: '-translate-y-1/2 -translate-x-1/2',
	};

	const handleSuccessClick = () => {};

	// 실패요청 핸들러
	const handleFailClick = () => {};
	console.log(searchParams.get('goal'));
	return (
		<div
			className={`${className.size} ${className.translate} text-left pc:p-[72px] p-[24px] border-borderGray rounded-2xl relativ bg-modalGray overflow-auto`}
		>
			<div className="modal-tops pc:space-y-[72px] flex flex-col space-y-[20px]">
				<div>
					<img className="w-full" src="./image/modal/default-goal.svg" alt="default-goal-img" />
				</div>
				<div className="flex justify-between">
					<div>익명</div>
					<div>⏰ D-{123}</div>
				</div>
			</div>
			<div className="modal-middle border-b-2 border-b-borderGray pc:mt-[26px] pc:mb-[30px] my-[20px]" />
			<div className="flex flex-col modal-bottom pc:space-y-[35px] space-y-[21px]">
				<div className="flex items-center justify-between">
					<div className="line-clamp-1">
						<h2>{123}</h2>
					</div>
					<div className="min-w-[100px] flex pc:space-x-[16px] space-x-[10px] overflow-auto">
						<FilterButton label="# 123" isSelected={false} onClick={() => {}} />
						<div className="p-[4px] pc:p-[16px] bg-buttonRed-100 rounded-[4px] pc:rounded-[8px] text-buttonRed-200 flex items-center">
							0/10회
						</div>
					</div>
				</div>
				<div className="pc:max-h-[90px] overflow-auto">{123}</div>
				<div className="flex pc:space-x-[26px] space-x-[6px]">
					<SubmitButton label="실패" btnState="inactive" onClick={handleFailClick} />
					<SubmitButton label="성공" btnState="active" onClick={handleSuccessClick} />
				</div>
			</div>
		</div>
	);
}

/*

	<div
			className={`${className.size} ${className.translate} text-left pc:p-[72px] p-[24px] border-borderGray rounded-2xl relativ bg-modalGray overflow-auto`}
		>
			<div className="modal-tops pc:space-y-[72px] flex flex-col space-y-[20px]">
				<div>
					<img className="w-full" src="./image/modal/default-goal.svg" alt="default-goal-img" />
				</div>
				<div className="flex justify-between">
					<div>익명</div>
					<div>⏰ D-{123}</div>
				</div>
			</div>
			<div className="modal-middle border-b-2 border-b-borderGray pc:mt-[26px] pc:mb-[30px] my-[20px]" />
			<div className="flex flex-col modal-bottom pc:space-y-[35px] space-y-[21px]">
				<div className="flex items-center justify-between">
					<div className="line-clamp-1">
						<h2>{goal.goalName}</h2>
					</div>
					<div className="min-w-[100px] flex pc:space-x-[16px] space-x-[10px] overflow-auto">
						<FilterButton label={`# ${goal.category || -1}`} isSelected={false} onClick={() => {}} />
						<div className="p-[4px] pc:p-[16px] bg-buttonRed-100 rounded-[4px] pc:rounded-[8px] text-buttonRed-200 flex items-center">
							0/10회
						</div>
					</div>
				</div>
				<div className="pc:max-h-[90px] overflow-auto">{goal.content ||}</div>
				<div className="flex pc:space-x-[26px] space-x-[6px]">
					<SubmitButton label="실패" btnState="inactive" onClick={handleFailClick} />
					<SubmitButton label="성공" btnState="active" onClick={handleSuccessClick} />
				</div>
			</div>
		</div>

*/
