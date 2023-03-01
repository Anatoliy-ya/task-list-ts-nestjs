import { FC, useState } from 'react';
import './Modal.css';

interface ModalProps {
  active: boolean | null;
  children: React.ReactNode;
}
export const Modal: FC<ModalProps> = ({ active, children }) => {
  console.log('Modal: ', active);

  return (
    <div className={!active ? 'modal_active' : 'modal'}>
      <div className="modal_window" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
