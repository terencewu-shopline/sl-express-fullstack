import { Modal } from 'antd';

export const ConfirmLeaveModal = ({t, onOk, onCancel, isModalOpen}) => {
  return (
    <Modal 
      title={t('confirm_leave_modal.title')} 
      open={isModalOpen} 
      onOk={onOk} 
      onCancel={onCancel}
      okText={t('confirm_leave_modal.leave')}
      cancelText={t('confirm_leave_modal.cancel')}
    >
      <p>{t('confirm_leave_modal.description')}</p>
    </Modal>
  )
}