import React from "react";
import styled from "styled-components";
import "../styles/BidderList.css";

const bidders = ["닉네임A", "닉네임B", "닉네임C"];

export const BidderList = () => {
    return (
        <div className="box">
            <div className="group">
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="text-wrapper">입찰자 목록</div>

                        {bidders.map((nickname, index) => (
                            <div key={index} className={`overlap-${index + 1}`}>
                                <div className="rectangle" />
                                <div className="text-wrapper-4">{nickname}</div>

                                <div className="div-wrapper">
                                    <div className="overlap-group-2">
                                        <button className="award-button">낙찰하기</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="rectangle-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
