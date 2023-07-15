import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailBanner/DetailsBanner'


function Details() {
  const { mediaType, id} = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  console.log(data?.results?.[0])

  return (
    <div>Details
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  )
}

export default Details