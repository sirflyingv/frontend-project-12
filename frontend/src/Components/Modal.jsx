import React from 'react';

const Modal = ({ children }) => {
  const kek = 1;
  // eslint-disable-next-line functional/no-expression-statements
  console.log(kek);

  return (
    <>
      <div className="fade modal-backdrop show" />
      <div
        role="dialog"
        aria-modal="true"
        className="fade modal show"
        tabIndex="-1"
        style={{ display: 'block' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// <div className="modal-header">
//   <div className="modal-title h4">Добавить канал</div>
//   <button
//     type="button"
//     aria-label="Close"
//     data-bs-dismiss="modal"
//     className="btn btn-close"
//   />
// </div>
// <div className="modal-body">
//   <form className="">
//     <div>
//       <input name="name" id="name" className="mb-2 form-control" value="" />
//       <label className="visually-hidden" htmlFor="name">Имя канала</label>
//       <div className="invalid-feedback" />
//       <div className="d-flex justify-content-end">
//         <button type="button" className="me-2 btn btn-secondary">Отменить</button>
//         <button type="submit" className="btn btn-primary">Отправить</button>
//       </div>
//     </div>
//   </form>
// </div>
