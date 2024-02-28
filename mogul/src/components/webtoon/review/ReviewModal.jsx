// ReviewModal.js
import React from "react";
import ReviewCard from "./ReviewCard";
import Image from "next/image";
import moguri_face_img from "@/assets/moguri_face_img.png";

function ReviewModal({ review, clickModal }) {
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          height: "500px",
          width: "500px",
        }}
      >
        <div className="flex mb-4 items-center h-8 justify-between">
          <div>
            <div
              className="h-full  flex justify-end items-center mr-2"
              style={{
                borderRadius: "50%",
                border: "1px solid lightgrey",
                overflow: "hidden",
                width: "30.4px",
              }}
            >
              <Image width={300} height={300} className="h-full" src={moguri_face_img} alt="" />
            </div>

            <div>{review.nickname}</div>
          </div>
          <div>{review.registeredDate.substr(0, 10)}</div>
        </div>
        <hr className="mb-5" />
        <div className="text-2xl mb-5">{review.title}</div>
        <div className="mt-10">
          <div>
            작화 평점 : {"★".repeat(review.drawingScore)}
            {"☆".repeat(5 - review.drawingScore)}
          </div>
          <div>
            연출 평점 : {"★".repeat(review.directingScore)}
            {"☆".repeat(5 - review.directingScore)}
          </div>
          <div>
            스토리 평점 : {"★".repeat(review.storyScore)}
            {"☆".repeat(5 - review.storyScore)}
          </div>
        </div>
        <div className="mt-10">
          <div>{review.content}</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
