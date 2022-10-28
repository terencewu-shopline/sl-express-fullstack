import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;

export const showConfirmLeaveModal = ({t, onOk, onCancel}) => {
  confirm({
    title: t('confirm_leave_modal.title'),
    icon: <ExclamationCircleOutlined />,
    content: t('confirm_leave_modal.description'),
    cancelText: t('confirm_leave_modal.cancel'),
    okText: t('confirm_leave_modal.leave'),
    onOk: onOk,
    onCancel: onCancel,
  })
}