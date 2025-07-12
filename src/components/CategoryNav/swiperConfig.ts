import {useCallback, useEffect, useRef, useState} from 'react'
import type { Swiper as SwiperType } from 'swiper/types'
import { SwiperOptions } from 'swiper/types'

export const breakpoints = {
  360: { slidesPerView: 3.3, spaceBetween: 6 },
  480: { slidesPerView: 4.5, spaceBetween: 6 },
  640: { slidesPerView: 5.5, spaceBetween: 8 },
  768: { slidesPerView: 6.5, spaceBetween: 8 },
  1024: { slidesPerView: 8.5, spaceBetween: 10 },
  1280: { slidesPerView: 10.5, spaceBetween: 12 },
  1440: { slidesPerView: 12, spaceBetween: 12 }
} satisfies SwiperOptions['breakpoints']

export const useSwiperControls = () => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const updateNavigation = useCallback(() => {
    const swiper = swiperRef.current
    if (!swiper) return
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }, [])

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
    updateNavigation()
  }, [updateNavigation])

  useEffect(() => {
    if (swiperRef.current) {
      updateNavigation()
    }
  }, [swiperRef.current])

  return {
    isBeginning,
    isEnd,
    swiperRef,
    handleSwiper,
    updateNavigation,
    navigationProps: {
      onInit: handleSwiper,
      onSlideChange: updateNavigation,
      onReachBeginning: () => setIsBeginning(true),
      onReachEnd: () => setIsEnd(true),
      onFromEdge: updateNavigation
    }
  }
}