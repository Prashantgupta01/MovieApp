import React, { useRef } from "react";
import {
    BsDiscFill,
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

function Carousel({data, loading}) {
    const carouselContainer = useRef()
    const { url } = useSelector((state)=> state.home)
    const navigate = useNavigate();

    const navigation = (dir) =>{
       console.log(dir)
    }

  return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={()=> navigation("left")}
            />
            <BsFillArrowRightCircleFill
            className="carouselRighttNav arrow"
            onClick={()=> navigation("right")}
            />

            {!loading ? (
                <div className="carouselItems">
                   {data?.map((item)=>{
                    console.log(item)
                     const posterUrl = item.poster_path
                     ? url.poster + item.poster_path
                     : PosterFallback;
                    return(
                        <div
                         key={item?.id}
                         className="carouselItem">
                           <div className="posterBlock">
                            <Img src={posterUrl} />
                           </div>
                           <div className="textBlock">
                            <span className="title">
                            {item.title || item.name}
                            </span>
                            <span className="date">
                            {dayjs(item.release_date).format("MM d, YYYY")}
                            </span>
                           </div>
                        </div>
                    )
                   })}
                </div>
            ) : (
                <span>Loading</span>
            )}

        </ContentWrapper>
    </div>
  )
}

export default Carousel