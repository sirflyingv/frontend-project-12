import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../state/modalSlice';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const backdropRef = useRef(null);

  useEffect(() => {
    backdropRef.current.addEventListener('click', (e) => {
      if (e.target !== backdropRef.current) return;
      dispatch(setModal({ type: '', opened: false, subjectChannel: undefined }));
    });
  }, [dispatch]);

  return (
    <>
      <div id="backdrop" className="fade modal-backdrop show" />
      <div
        ref={backdropRef}
        role="dialog"
        aria-modal="true"
        className="d-block fade modal show"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
