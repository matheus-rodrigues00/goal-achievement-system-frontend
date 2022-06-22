import useModal from 'hooks/useModal';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/slices';
import adminSlice from 'store/slices/adminSlice';
import AnnouncementsView from './AnnouncementsView';

function AnnouncementsContainer() {
	const dispatch = useDispatch();
	const [openModal, closeModal] = useModal();
	const openAnnounceMentsAddModal = () => openModal({ name: 'AnnounceMentsAddModal' });
	const announcementsList = useSelector((state: RootState) => state.admin.announcementsList);
	useEffect(() => {
		dispatch(adminSlice.actions.loadAnnouncementsList({ page: 1 }));
	}, [dispatch]);

	return (
		<AnnouncementsView openAnnounceMentsAddModal={openAnnounceMentsAddModal} announcementsList={announcementsList} />
	);
}

export default AnnouncementsContainer;
