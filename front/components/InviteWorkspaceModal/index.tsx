import React, { useCallback, FC } from 'react';
import { Input, Label, Button } from '@pages/SignUp/styles';
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: userData, error, mutate } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);

  const {mutate: mutateChannel } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onInviteMember = useCallback((e) => {
    e.preventDefault();
    if (!newMember || !newMember.trim()) {
      return;
    }
    axios
      .post(
        `http://localhost:3095/api/workspaces/${workspace}/members`,
        {
          name: newMember,
        },
        {
          withCredentials: true,
        },
      )
      .then(() => {
        mutateChannel();
        setShowInviteWorkspaceModal(false);
        setNewMember('');
      })
      .catch((error) => {
        console.dir(error);
        toast.error(error.response?.data, { position: 'bottom-center' });
      });
  }, [workspace, newMember]);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
