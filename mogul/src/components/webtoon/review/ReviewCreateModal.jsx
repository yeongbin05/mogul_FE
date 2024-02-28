// ReviewModal.js
import React from 'react';
import ReviewCard from './ReviewCard';
import ReviewCreateForm from './ReviewCreateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function ReviewCreateModal({ clickModal }) {
  return (
    <div className="modal-overlay cursor-pointer">
      <div className="modal-content" style={{
        position:'relative',
        backgroundColor: "#FDF7E4",
        }}>
        <div >
        <button
          onClick={clickModal}
          style={{position:'absolute',right:'-20px',top:'-20px'}}
        >
          <FontAwesomeIcon style={{color:'lightgrey',fontSize: '24px'}} icon={faXmark} />
        </button>
        </div>
        <div>
          <ReviewCreateForm clickModal={clickModal} />
        </div>
      </div>
    </div>
  );
}

export default ReviewCreateModal;
