import React, { useEffect } from 'react';
import Template from '../components/tamplates/Template.jsx';
import useShoesLoader from '../hooks/useShoesLoader.jsx';
import { useDispatch } from 'react-redux';
import { reduxSetShoes } from '../../../store.js';

export default function Home() {
  const {
    shoes,
    setShoes,
    handleLoadMore,
    isLoading,
    btnDisabled,
  } = useShoesLoader();

  const dispatch = useDispatch();

  // shoes가 로드되면 redux store에 저장
  useEffect(() => {
    if (shoes.length > 0) {
      dispatch(reduxSetShoes(shoes));
    }
  }, [shoes, dispatch]);

  return (
    <Template
      shoes={shoes}
      setShoes={setShoes}
      handleLoadMore={handleLoadMore}
      isLoading={isLoading}
      btnDisabled={btnDisabled}
    />
  );
}
