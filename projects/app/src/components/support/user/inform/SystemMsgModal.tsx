import React, { useCallback } from 'react';
import MyModal from '@fastgpt/web/components/common/MyModal';
import { useUserStore } from '@/web/support/user/useUserStore';
import { Button, Dialog, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { LOGO_ICON } from '@fastgpt/global/common/system/constants';
import { getSystemMsgModalData } from '@/web/support/user/inform/api';
import dynamic from 'next/dynamic';
import { useRequest2 } from '@fastgpt/web/hooks/useRequest';
const Markdown = dynamic(() => import('@/components/Markdown'), { ssr: false });

const SystemMsgModal = ({}: {}) => {
  const { t } = useTranslation();
  const { systemMsgReadId, setSysMsgReadId } = useUserStore();

  const { open, onOpen, onClose } = useDisclosure();

  const { data } = useRequest2(getSystemMsgModalData, {
    refreshDeps: [systemMsgReadId],
    manual: false,
    onSuccess(res) {
      if (res?.content && (!systemMsgReadId || res.id !== systemMsgReadId)) {
        onOpen();
      }
    }
  });

  const onclickRead = useCallback(() => {
    if (!data) return;
    setSysMsgReadId(data.id);
    onClose();
  }, [data, onClose, setSysMsgReadId]);

  return (
    <MyModal
      isOpen={open}
      iconSrc={LOGO_ICON}
      title={t('common:support.user.inform.System message')}
    >
      <Dialog.Body overflow={'auto'}>
        <Markdown source={data?.content} />
      </Dialog.Body>
      <Dialog.Footer>
        <Button onClick={onclickRead}>{t('common:support.inform.Read')}</Button>
      </Dialog.Footer>
    </MyModal>
  );
};

export default React.memo(SystemMsgModal);
