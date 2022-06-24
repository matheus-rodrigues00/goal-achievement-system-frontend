import React, { useEffect } from 'react';
import useGetActionState from 'hooks/useGetActionState';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store';
import { RootState } from 'store/slices';
import { useSearchParams } from 'react-router-dom';
import goalSlice from 'store/slices/goalSlice';
import certificationSlice from 'store/slices/certificationSlice';
import CertDetailModalView from './CertDetailModalView';

export default function CertDetailModalContainer() {
	const { goal } = useSelector((state: RootState) => state.goal);
	const { certGoal } = useSelector((state: RootState) => state.certification);
	const dispatch: AppDispatch = useDispatch();
	const [goalLoading, goalResult, goalInitResult] = useGetActionState(goalSlice.actions.loadGoal.type);
	const [certLoading, certResult, certInitResult] = useGetActionState(certificationSlice.actions.loadCert.type);
	const [pushCertResultLoading, pushCertResultResult, pushCertResultInitResult] = useGetActionState(
		certificationSlice.actions.pushCertResult.type
	);

	const [searchParams] = useSearchParams();
	const resultHandler = (isSuccess: boolean) => {
		if (pushCertResultLoading) return;
		const goalId = searchParams.get('goal');
		if (!goalId) return;
		dispatch(certificationSlice.actions.pushCertResult({ goalId: +goalId, result: isSuccess }));
	};

	useEffect(() => {
		const goalId = searchParams.get('goal');
		if (!goalId) return;
		if (goalLoading || certLoading) return;
		dispatch(goalSlice.actions.loadGoal({ goalId: +goalId }));
		dispatch(certificationSlice.actions.loadCert({ goalId: +goalId }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);
	useEffect(() => {
		certInitResult();
		goalInitResult();
	}, [certInitResult, goalInitResult, goal, certGoal]);
	useEffect(() => {
		if (!pushCertResultResult) return;
		if (pushCertResultResult.isSuccess) {
			alert('인증 감사합니다.');
		} else {
			alert('이미 인증을 해주셨군요!');
		}
		pushCertResultInitResult();
	}, [pushCertResultInitResult, pushCertResultResult]);
	return (
		<CertDetailModalView
			goalLoading={goalLoading}
			certLoading={certLoading}
			goal={goal}
			certGoal={certGoal}
			resultHandler={resultHandler}
		/>
	);
}
