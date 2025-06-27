import { useState, useEffect, useCallback } from 'react'
import { fetchShoes } from '../../../api/fetchShoes'

/**
 * useShoesLoader
 * ------------------------------------------------------------
 * - 초기 3개 로드 → 나머지는 버퍼에 저장
 * - '더 보기' 클릭 시 3개씩 추가 노출
 * - 남은 데이터 없으면 버튼 비활성화
 */
export default function useShoesLoader() {
  /* 상수 -------------------------------------------------- */
  const BATCH = 3

  /* 상태 -------------------------------------------------- */
  const [shoes, setShoes] = useState([])
  const [buffer, setBuffer] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(false)

  /* 최초 로드 ------------------------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const data = await fetchShoes()
        setShoes(data.slice(0, BATCH))
        setBuffer(data.slice(BATCH))
        if (data.length <= BATCH) setBtnDisabled(true)
      } catch {
        setBtnDisabled(true)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  /* 3개씩 추가 ------------------------------------------- */
  const handleLoadMore = useCallback(() => {
    setIsLoading(true); // 로딩 시작 표시
    setTimeout(() => {
      setShoes(prev => [...prev, ...buffer.slice(0, BATCH)])
      setBuffer(prev => {
        const next = prev.slice(BATCH)
        if (!next.length) setBtnDisabled(true)
        return next
      })
      setIsLoading(false) // 로딩 종료 표시
    }, 1000) // 딜레이
  }, [buffer])


  /* 반환 -------------------------------------------------- */
  return { shoes, setShoes, handleLoadMore, isLoading, btnDisabled }
}
