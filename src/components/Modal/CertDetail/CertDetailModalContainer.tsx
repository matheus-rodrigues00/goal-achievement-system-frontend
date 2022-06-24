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
	const [certResultLoading, certResultResult, certResultInitResult] = useGetActionState(
		certificationSlice.actions.loadCert.type
	);
	const [searchParams] = useSearchParams();
	const resultHandler = (isSuccess: boolean) => {
		console.log(isSuccess);
		console.log(certResultLoading);
		if (certResultLoading) return;
		const goalId = searchParams.get('goal');
		if (!goalId) return;
		if (isSuccess) dispatch(certificationSlice.actions.pushCertSuccess({ goalId: +goalId }));
		else dispatch(certificationSlice.actions.pushCertFail({ goalId: +goalId }));
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
