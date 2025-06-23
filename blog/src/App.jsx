import { useState } from 'react'
import './App.css'

function App() {
  /* ───── 상태(State) ───── */
  const [titleList, setTitleList] = useState([
    '남자 코트 추천',
    '강남 우동 맛집',
    '파이썬 독학',
  ])                            // 게시글 제목 배열
  const [dateList, setDateList] = useState([
    '2025-02-17',
    '2025-02-18',
    '2025-02-19',
  ])                            // 게시글 날짜 배열
  const [likeCounts, setLikeCounts] = useState(
    Array(titleList.length).fill(0)
  )                              // 각 게시글별 좋아요 수
  const [currentIdx, setCurrentIdx] = useState(0) // 선택된 게시글 인덱스
  const [modalOpen, setModalOpen] = useState(false) // 모달 표시 여부
  const [inputTitle, setInputTitle] = useState('')  // 새 게시글 입력값

  /* ───── 이벤트 핸들러 ───── */
  const handleLikeClick = (idx, e) => {
    e.stopPropagation()                     // 부모 클릭 방지
    const updatedLikes = [...likeCounts]
    updatedLikes[idx] += 1
    setLikeCounts(updatedLikes)
  }

  const addPost = () => {
    if (!inputTitle.trim()) return          // 빈 입력 방지
    setTitleList([inputTitle.trim(), ...titleList])
    setLikeCounts([0, ...likeCounts])
    setInputTitle('')
    setCurrentIdx(0)
    setModalOpen(false)
    setDateList([new Date().toISOString().split('T')[0], ...dateList])
  }

  const deletePost = (idx, e) => {
    e.stopPropagation()
    const updatedTitles = titleList.filter((_, i) => i !== idx)
    const updatedLikes = likeCounts.filter((_, i) => i !== idx)
    setTitleList(updatedTitles)
    setLikeCounts(updatedLikes)

    // 삭제된 글이 선택 중이었는지 체크
    if (currentIdx === idx) {
      setCurrentIdx(0)
      setModalOpen(false)
    } else if (currentIdx > idx) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const updatePostTitle = (newTitle) => {
    const updated = [...titleList]
    updated[currentIdx] = newTitle
    setTitleList(updated)
  }

  /* ───── 렌더링 ───── */
  return (
    <div className="App">
      <nav className="black-nav">
        <h4>React Blog</h4>
      </nav>

      {titleList.map((title, idx) => (
        <article
          key={idx}
          className="list"
          onClick={() => {
            setCurrentIdx(idx)
            setModalOpen(true)
          }}
        >
          <h4>
            {title}
            <button
              className="like-button"
              onClick={(e) => handleLikeClick(idx, e)}
            >
              👍 {likeCounts[idx]}
            </button>
          </h4>
          <button
            className="delete-button"
            onClick={(e) => deletePost(idx, e)}
          >
            삭제
          </button>
          <time className="date">
            {dateList[idx]}
          </time>
        </article>
      ))}

      <div className="post-input">
        <input
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="새 글 제목 입력"
        />
        <button onClick={addPost}>추가</button>
      </div>

      {modalOpen && (
        <Modal
          title={titleList[currentIdx]}
          onUpdate={updatePostTitle}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

/* ───── 모달 컴포넌트 ───── */
const Modal = function ({ title, onUpdate, onClose }) {
  const [editValue, setEditValue] = useState(title)

  return (
    <div className="modal" style={{ backgroundColor: 'skyblue' }}>
      <h4>{title}</h4>
      <input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <div className="modal-actions">
        <button
          onClick={() => {
            onUpdate(editValue.trim())
            onClose()
          }}
        >
          수정
        </button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}

export default App
